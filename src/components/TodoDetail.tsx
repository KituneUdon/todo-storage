import React, { FC } from 'react';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  TextField,
} from '@material-ui/core';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import DayJsUtils from '@date-io/dayjs';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Task from '../types/task';

dayjs.locale(ja);

const drawer = css({
  width: '360px',
});

const datepicker = css({
  flexGrow: 1,
});

type Props = {
  oepn: boolean;
  drawerClose: () => void;
  taskDetail: Task;
  titleChange: (title: string) => void;
  expirationDateChange: (expirationDate: dayjs.Dayjs) => void;
  dueDateChange: (dueDate: dayjs.Dayjs) => void;
  memoChange: (memo: string) => void;
};

const TodoDetail: FC<Props> = ({
  oepn,
  drawerClose,
  taskDetail,
  titleChange,
  expirationDateChange,
  dueDateChange,
  memoChange,
}) => (
  <MuiPickersUtilsProvider locale={ja} utils={DayJsUtils}>
    <Drawer
      css={drawer}
      variant="persistent"
      anchor="right"
      open={oepn}
      classes={{ paper: drawer.styles }}
    >
      <IconButton onClick={drawerClose}>
        <ChevronRightIcon />
      </IconButton>
      <Divider />
      <List>
        <ListItem>
          <TextField
            value={taskDetail.title}
            label="タスク"
            fullWidth
            onChange={(e) => titleChange(e.target.value)}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <DatePicker
            disableToolbar
            css={datepicker}
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
          <DatePicker
            disableToolbar
            css={datepicker}
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
            onChange={(t) => memoChange(t.target.value)}
            label="メモ"
          />
        </ListItem>
      </List>
    </Drawer>
  </MuiPickersUtilsProvider>
);

export default TodoDetail;
