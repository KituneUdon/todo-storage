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
  changeTasks: (task: Task) => void;
  updateFirestoreTaskTitle: (taskid: string) => void;
  updateFirestoreTaskExpirationDate: (taskid: string) => void;
  updateFirestoreTaskDueDate: (taskid: string) => void;
  updateFirestoreTaskMemo: (taskid: string) => void;
  updateFirestoreTaskRepeat: (taskid: string) => void;
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

const TodoDetail: FC<Props> = ({
  oepn,
  drawerClose,
  task,
  changeTasks,
  updateFirestoreTaskTitle,
  updateFirestoreTaskExpirationDate,
  updateFirestoreTaskDueDate,
  updateFirestoreTaskMemo,
  updateFirestoreTaskRepeat,
}) => {
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
              onBlur={() => {
                updateFirestoreTaskTitle(taskDetail.id);
                changeTasks(taskDetail);
              }}
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
              onBlur={() => updateFirestoreTaskExpirationDate(taskDetail.id)}
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
              onBlur={() => updateFirestoreTaskDueDate(taskDetail.id)}
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
              onBlur={() => updateFirestoreTaskRepeat(taskDetail.id)}
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
              onBlur={() => updateFirestoreTaskMemo(taskDetail.id)}
            />
          </ListItem>
        </List>
      </Drawer>
    </MuiPickersUtilsProvider>
  );
};

export default TodoDetail;
