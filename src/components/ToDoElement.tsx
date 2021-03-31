import React, { FC, useState } from 'react';
import { css } from '@emotion/css';
import { IconButton, Typography } from '@material-ui/core';

import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

type Task = {
  id: string;
  task: string;
};

type Props = {
  task: Task;
  taskFinish: (task: Task) => void;
};

const container = css`
  border: solid 1px #000000;
  display: flex;
  align-items: center;
`;

const ToDoElement: FC<Props> = ({ task, taskFinish }) => {
  const [isButtonHover, setIsButtonHover] = useState(false);

  const handleMouseOver = () => setIsButtonHover(true);
  const handleMouseOut = () => setIsButtonHover(false);
  const handleTaskDelete = () => {
    taskFinish(task);
  };

  return (
    <div className={container}>
      <IconButton
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleTaskDelete}
      >
        {isButtonHover ? <CheckCircleOutlineIcon /> : <PanoramaFishEyeIcon />}
      </IconButton>
      <Typography>{task.task}</Typography>
    </div>
  );
};

export default ToDoElement;
