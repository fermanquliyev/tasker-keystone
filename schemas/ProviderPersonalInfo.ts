import { list } from "@keystone-next/keystone/schema";
import * as Types from "@keystone-next/fields";

export const ProviderPersonalInfo = list({
  fields: {
    about: Types.text(),
    birthDate: Types.timestamp({ isRequired: true }),
    user: Types.relationship({
      ref: "User",
      many: false,
      isIndexed: true,
      isUnique: true,
    }),
    workArea: Types.relationship({
      ref: "ProviderWorkArea",
      many: true,
    }),
  },
});
