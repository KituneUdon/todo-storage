import dayjs from 'dayjs';

type Task = {
  id: string;
  title: string;
  expirationDate: dayjs.Dayjs;
  dueDate: dayjs.Dayjs;
  memo: string;
  hasRepeat: boolean;
};

export default Task;
