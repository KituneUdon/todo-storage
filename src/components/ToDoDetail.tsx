import React, { FC } from 'react';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
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
};

const ToDoDetail: FC<Props> = ({ oepn, drawerClose, taskDetail }) => {
  const expirationDate = `期限日：${taskDetail.expirationDate ?? ''}`;
  const dueDate = `タスク実行予定日：${taskDetail.dueDate ?? ''}`;
  const memo = `メモ：${taskDetail.memo ?? ''}`;

  return (
    <Drawer className={drawer} variant="persistent" anchor="right" open={oepn}>
      <IconButton onClick={drawerClose}>
        <ChevronLeftIcon />
      </IconButton>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary={taskDetail.task} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary={expirationDate} />
        </ListItem>
        <ListItem>
          <ListItemText primary={dueDate} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary={memo} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default ToDoDetail;
