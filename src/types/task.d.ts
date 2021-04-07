import dayjs from 'dayjs';

type Task = {
  id: string;
  task: string;
  expirationDate: dayjs.Dayjs;
  dueDate: dayjs.Dayjs;
  memo: string;
};

export default Task;
