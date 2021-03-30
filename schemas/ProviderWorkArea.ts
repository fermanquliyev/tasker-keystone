import { list } from '@keystone-next/keystone/schema';
import * as Types from '@keystone-next/fields';

export const ProviderWorkArea = list({
    fields: {
        title: Types.text(),
        city: Types.text({isRequired:true}),
        country: Types.text({isRequired:true}),
        lat: Types.float({isRequired:true, isIndexed:true}),
        long: Types.float({isRequired:true, isIndexed:true}),
        schedule:Types.relationship({
            ref:'ProviderWorkSchedule',
            many:false,
        })
    }
});