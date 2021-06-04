import { format, formatDistanceToNowStrict } from 'date-fns';

export const formatDateTime = (date: Date) => {
  return format(new Date(date), "dd/MM/yy',' h':'mm a");
};
