import React, { FC, useState } from 'react';
import { css } from '@emotion/css';
import { IconButton, Typography } from '@material-ui/core';

import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

type Task = {
  id: string;
  task: string;
};

type Props = {
  task: Task;
  taskFinish: (task: Task) => void;
  taskDelete: (task: Task) => void;
};

const container = css`
  border: solid 1px #000000;
  display: flex;
  align-items: center;
`;

const taskText = css`
  flex-grow: 1;
`;

const ToDoElement: FC<Props> = ({ task, taskFinish, taskDelete }) => {
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
    <div className={container}>
      <IconButton
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleTaskFinish}
      >
        {isButtonHover ? <CheckCircleOutlineIcon /> : <PanoramaFishEyeIcon />}
      </IconButton>
      <Typography className={taskText}>{task.task}</Typography>
      <IconButton onClick={handleTaskDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default ToDoElement;
