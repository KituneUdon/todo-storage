import React, { FC } from 'react';
import { css } from '@emotion/css';
import { TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const container = css`
  border: solid 1px #000000;
  display: flex;
  align-items: center;
`;

const AddToDo: FC = () => (
  <div className={container}>
    <IconButton>
      <AddIcon />
    </IconButton>
    <TextField label="タスクを追加する" />
  </div>
);

export default AddToDo;
