import dayjs from 'dayjs';

type RepeatType = 'none' | 'daily' | 'monthly';

type Task = {
  id: string;
  title: string;
  expirationDate: dayjs.Dayjs;
  dueDate: dayjs.Dayjs;
  memo: string;
  repeat: RepeatType;
};

export default Task;
export { RepeatType };
