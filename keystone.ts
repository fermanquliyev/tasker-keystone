import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { permissionsList } from './schemas/fields';
import { Role } from './schemas/Role';
import { Listing } from './schemas/Listing';
import { User } from './schemas/User';
import {ProviderWorkSchedule} from './schemas/ProviderWorkSchedule';
import {ProviderWorkArea} from './schemas/ProviderWorkArea';
import {ProviderPersonalInfo} from './schemas/ProviderPersonalInfo'
import 'dotenv/config';
import { insertSeedData } from './seed-data';

function sendPasswordResetEmail(token: string, identity: string) {
    console.log('Token sended to email ', identity, token);
}

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add in inital roles here
  },
  passwordResetLink: {
     sendToken(args) {
      // send the email
        sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        console.log('Connected to the database!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items go in here
      ProviderWorkSchedule,
      ProviderWorkArea,
      ProviderPersonalInfo,
      User,
      Role,
      Listing,
    }),

    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
);


