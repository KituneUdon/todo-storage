import React, { FC, useState } from 'react';
import { css } from '@emotion/css';
import { IconButton, Typography, Card } from '@material-ui/core';

import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import Task from '../types/task';

dayjs.extend(isSameOrBefore);

type Props = {
  task: Task;
  taskFinish: (task: Task) => void;
  taskDelete: (task: Task) => void;
  openDrawer: (task: Task) => void;
};

const container = css`
  display: flex;
  align-items: center;
`;

const taskText = css`
  flex-grow: 1;
`;

const redText = css`
  color: red;
`;

const expirationDateText = css`
  margin-left: 10px;
`;

const TodoElement: FC<Props> = ({
  task,
  taskFinish,
  taskDelete,
  openDrawer,
}) => {
  const [isButtonHover, setIsButtonHover] = useState(false);

  const handleMouseOver = () => setIsButtonHover(true);
  const handleMouseOut = () => setIsButtonHover(false);
  const handleTaskFinish = () => {
    taskFinish(task);
  };
  const handleTaskDelete = () => {
    taskDelete(task);
  };

  const hasPastToday = (date: dayjs.Dayjs) => {
    const today = dayjs();

    if (
      date.isSameOrBefore(today, 'year') &&
      date.isSameOrBefore(today, 'month') &&
      date.isBefore(today, 'day')
    ) {
      return true;
    }

    return false;
  };

  return (
    <Card className={container}>
      <IconButton
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleTaskFinish}
      >
        {isButtonHover ? <CheckCircleOutlineIcon /> : <PanoramaFishEyeIcon />}
      </IconButton>
      <div className={taskText}>
        <Typography onClick={() => openDrawer(task)} variant="subtitle1">
          {task.title}
        </Typography>
        <div className={container}>
          <Typography
            variant="body2"
            className={hasPastToday(task.expirationDate) ? redText : ''}
          >
            期限日：{task.expirationDate.format('M月D日')}
          </Typography>
          <Typography
            variant="body2"
            className={`${expirationDateText}
              ${hasPastToday(task.expirationDate) ? redText : ''}`}
          >
            予定日：{task.dueDate.format('M月D日')}
          </Typography>
        </div>
      </div>
      <IconButton onClick={handleTaskDelete}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default TodoElement;
