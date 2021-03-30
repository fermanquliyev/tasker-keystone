import { list } from '@keystone-next/keystone/schema';
import * as Types from '@keystone-next/fields';

export const ProviderWorkSchedule = list({
  fields: {
    scheduleType:  Types.select({
        options: [
          { value: 'WEEKDAYS', label: 'Weekdays' },
          { value: 'WEEKEND', label: 'Weekend' },
          { value: 'ODDDAYS', label: 'Odd days' },
          { value: 'EVENDAYS', label: 'Even days' },
          { value: 'SELECTEDDAY', label: 'Only selected day' },
        ],
        defaultValue: 'WEEKDAYS',
      }),
    selectedDay: Types.timestamp(),
    startTime: Types.text({isRequired: true}), // Just for time like 09:00
    endTime: Types.text({isRequired: true}), // Just for time like 18:00
  }
});
