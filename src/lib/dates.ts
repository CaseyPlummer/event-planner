import { DateTime } from 'luxon';

export const formatDate = (iso: string) => {
    const when = DateTime.fromISO(iso);
    return when.toLocaleString(DateTime.DATETIME_SHORT);
};