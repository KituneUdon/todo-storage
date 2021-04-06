import React, { FC } from 'react';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { css } from '@emotion/css';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Task from '../types/task';

const drawer = css`
  width: 240px;
`;

type Props = {
  oepn: boolean;
  drawerClose: () => void;
  taskDetail: Task;
  taskChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  expirationDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dueDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  memoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ToDoDetail: FC<Props> = ({
  oepn,
  drawerClose,
  taskDetail,
  taskChange,
  expirationDateChange,
  dueDateChange,
  memoChange,
}) => (
  <Drawer className={drawer} variant="persistent" anchor="right" open={oepn}>
    <IconButton onClick={drawerClose}>
      <ChevronLeftIcon />
    </IconButton>
    <Divider />
    <List>
      <ListItem>
        <TextField value={taskDetail.task} onChange={taskChange} />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem>
        <ListItemText primary="期限日：" />
        <TextField
          value={taskDetail.expirationDate ?? ''}
          onChange={expirationDateChange}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary="実行予定日：" />
        <TextField value={taskDetail.dueDate ?? ''} onChange={dueDateChange} />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem>
        <ListItemText primary="メモ：" />
        <TextField
          value={taskDetail.memo ?? ``}
          multiline
          onChange={memoChange}
        />
      </ListItem>
    </List>
  </Drawer>
);

export default ToDoDetail;
