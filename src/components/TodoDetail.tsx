import React, { FC } from 'react';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  TextField,
} from '@material-ui/core';
import { css } from '@emotion/css';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import DayJsUtils from '@date-io/dayjs';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Task from '../types/task';

dayjs.locale(ja);

const drawer = css`
  width: 360px;
`;

const datepicker = css`
  flex-grow: 1;
`;

type Props = {
  oepn: boolean;
  drawerClose: () => void;
  taskDetail: Task;
  taskChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  expirationDateChange: (expirationDate: dayjs.Dayjs) => void;
  dueDateChange: (dueDate: dayjs.Dayjs) => void;
  memoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoDetail: FC<Props> = ({
  oepn,
  drawerClose,
  taskDetail,
  taskChange,
  expirationDateChange,
  dueDateChange,
  memoChange,
}) => (
  <MuiPickersUtilsProvider locale={ja} utils={DayJsUtils}>
    <Drawer
      className={drawer}
      variant="persistent"
      anchor="right"
      open={oepn}
      classes={{ paper: drawer }}
    >
      <IconButton onClick={drawerClose}>
        <ChevronRightIcon />
      </IconButton>
      <Divider />
      <List>
        <ListItem>
          <TextField
            value={taskDetail.task}
            label="タスク"
            fullWidth
            onChange={taskChange}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <KeyboardDatePicker
            className={datepicker}
            value={taskDetail.expirationDate}
            label="期限日"
            onChange={(date) => {
              if (date) {
                const strDate = date.toString();
                expirationDateChange(dayjs(strDate));
              }
            }}
            format="YYYY/MM/DD"
          />
        </ListItem>
        <ListItem>
          <KeyboardDatePicker
            className={datepicker}
            value={taskDetail.dueDate}
            label="実行予定日"
            onChange={(date) => {
              if (date) {
                const strDate = date.toString();
                dueDateChange(dayjs(strDate));
              }
            }}
            format="YYYY/MM/DD"
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <TextField
            value={taskDetail.memo ?? ``}
            fullWidth
            multiline
            onChange={memoChange}
            label="メモ"
          />
        </ListItem>
      </List>
    </Drawer>
  </MuiPickersUtilsProvider>
);

export default TodoDetail;
