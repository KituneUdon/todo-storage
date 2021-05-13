import React, { FC, useState, useEffect } from 'react';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import DayJsUtils from '@date-io/dayjs';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Task, { RepeatType } from '../types/task';

dayjs.locale(ja);

const drawer = css({
  width: '360px',
});

const fullWidth = css({
  flexGrow: 1,
});

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: '360px',
    },
  }),
);

type Props = {
  oepn: boolean;
  drawerClose: () => void;
  task: Task;
  updateTask: (task: Task) => void;
};

const repeatValues = [
  {
    value: 'none',
    label: '未設定',
  },
  {
    value: 'daily',
    label: '毎日',
  },
  {
    value: 'monthly',
    label: '毎月',
  },
];

const TodoDetail: FC<Props> = ({ oepn, drawerClose, task, updateTask }) => {
  const classes = useStyles();
  const [taskDetail, setTaskDetail] = useState(task);

  useEffect(() => setTaskDetail(task), [task]);

  return (
    <MuiPickersUtilsProvider locale={ja} utils={DayJsUtils}>
      <Drawer
        css={drawer}
        variant="persistent"
        anchor="right"
        open={oepn}
        classes={{ paper: classes.drawer }}
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
              onChange={(e) =>
                setTaskDetail({ ...taskDetail, title: e.target.value })
              }
              onBlur={() => updateTask(taskDetail)}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <DatePicker
              disableToolbar
              css={fullWidth}
              value={taskDetail.expirationDate}
              label="期限日"
              onChange={(date) => {
                if (date) {
                  const strDate = date.toString();
                  setTaskDetail({
                    ...taskDetail,
                    expirationDate: dayjs(strDate),
                  });
                }
              }}
              format="YYYY/MM/DD"
              onBlur={() => updateTask(taskDetail)}
            />
          </ListItem>
          <ListItem>
            <DatePicker
              disableToolbar
              css={fullWidth}
              value={taskDetail.dueDate}
              label="実行予定日"
              onChange={(date) => {
                if (date) {
                  const strDate = date.toString();
                  setTaskDetail({ ...taskDetail, dueDate: dayjs(strDate) });
                }
              }}
              format="YYYY/MM/DD"
              onBlur={() => updateTask(taskDetail)}
            />
          </ListItem>
          <ListItem>
            <TextField
              select
              fullWidth
              label="繰り返し設定"
              value={taskDetail.repeat}
              onChange={(e) =>
                setTaskDetail({
                  ...taskDetail,
                  repeat: e.target.value as RepeatType,
                })
              }
              onBlur={() => updateTask(taskDetail)}
            >
              {repeatValues.map((repeatValue) => (
                <MenuItem key={repeatValue.value} value={repeatValue.value}>
                  {repeatValue.label}
                </MenuItem>
              ))}
            </TextField>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <TextField
              value={taskDetail.memo ?? ``}
              fullWidth
              multiline
              onChange={(e) =>
                setTaskDetail({ ...taskDetail, memo: e.target.value })
              }
              label="メモ"
              onBlur={() => updateTask(taskDetail)}
            />
          </ListItem>
        </List>
      </Drawer>
    </MuiPickersUtilsProvider>
  );
};

export default TodoDetail;
