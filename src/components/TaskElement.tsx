import React, { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IconButton, Typography, Card, Container } from '@material-ui/core';

import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import Task from '../types/task';

dayjs.extend(isSameOrBefore);

type Props = {
  task: Task;
  finishTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  openTaskDetailDrawer: (task: Task) => void;
};

const container = css({
  display: 'flex',
  alignItems: 'center',
});

const taskText = css({
  flexGrow: 1,
  margin: 0,
  maxWidth: 'none',
});

const redText = css({
  color: 'red',
});

const expirationDateText = css({
  marginLeft: '10px',
});

const deleteButton = css({
  justifyContent: 'flex-end',
});

const TaskElement: FC<Props> = ({
  task,
  finishTask,
  deleteTask,
  openTaskDetailDrawer: openDrawer,
}) => {
  const [isButtonHover, setIsButtonHover] = useState(false);

  const handleMouseOver = () => setIsButtonHover(true);
  const handleMouseOut = () => setIsButtonHover(false);
  const handleTaskFinish = () => {
    finishTask(task);
  };
  const handleTaskDelete = () => {
    deleteTask(task);
  };

  const hasPastToday = (date: dayjs.Dayjs) => {
    const today = dayjs();

    if (
      date.isSameOrBefore(today, 'year') &&
      date.isSameOrBefore(today, 'month') &&
      date.isBefore(today, 'day')
    ) {
      return true;
    }

    return false;
  };

  return (
    <Card css={container}>
      <IconButton
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleTaskFinish}
      >
        {isButtonHover ? <CheckCircleOutlineIcon /> : <PanoramaFishEyeIcon />}
      </IconButton>
      <Container css={taskText} onClick={() => openDrawer(task)}>
        <Typography variant="subtitle1">{task.title}</Typography>
        <div css={container}>
          <Typography
            variant="body2"
            css={hasPastToday(task.expirationDate) ? redText : ''}
          >
            期限日：{task.expirationDate.format('M月D日')}
          </Typography>
          <Typography
            variant="body2"
            css={[
              expirationDateText,
              hasPastToday(task.expirationDate) ? redText : '',
            ]}
          >
            実行予定日：{task.dueDate.format('M月D日')}
          </Typography>
        </div>
      </Container>
      <IconButton onClick={handleTaskDelete} css={deleteButton}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default TaskElement;
