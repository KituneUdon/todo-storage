import React, { FC, useState } from 'react';
import { css } from '@emotion/css';
import { IconButton, Typography, Card } from '@material-ui/core';

import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

import Task from '../types/task';

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
          <Typography variant="body2">
            期限日：{task.expirationDate.format('M月D日')}
          </Typography>
          <Typography variant="body2">
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
