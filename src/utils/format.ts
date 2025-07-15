import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export function formatUTC(ubcString: string, formatString = 'YYYY/MM/DD HH:mm:ss') {
    return dayjs.utc(ubcString).utcOffset(8).format(formatString);
}
