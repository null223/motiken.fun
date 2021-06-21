import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (row_date, format = 'YYYY/MM/DD') => {
  return dayjs.utc(row_date).tz('Asia/Tokyo').format(format)
}