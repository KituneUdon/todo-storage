import dayjs from 'dayjs';

type Task = {
  id: string;
  task: string;
  expirationDate: dayjs.Dayjs;
  dueDate: string;
  memo: string;
};

export default Task;
