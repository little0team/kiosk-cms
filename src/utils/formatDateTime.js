import * as dayjs from 'dayjs';

export const formatDateTime = (date) => {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};
