import React, { FC, useState } from 'react';
import { css } from '@emotion/css';
import { IconButton, Typography } from '@material-ui/core';

import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const container = css`
  border: solid 1px #000000;
  display: flex;
  align-items: center;
`;

const ToDoElement: FC = () => {
  const [isButtonHover, setIsButtonHover] = useState(false);

  const handleMouseOver = () => setIsButtonHover(true);
  const handleMouseOut = () => setIsButtonHover(false);

  return (
    <div className={container}>
      <IconButton onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {isButtonHover ? <CheckCircleOutlineIcon /> : <PanoramaFishEyeIcon />}
      </IconButton>
      <Typography>タスクA</Typography>
    </div>
  );
};

export default ToDoElement;
