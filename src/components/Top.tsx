import React, { FC } from 'react';
import { Button, Typography } from '@material-ui/core';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import screenshot from '../img/todo-storage-screenshot.png';

const container = css({
  width: '100%',
  textAlign: 'center',
  margin: '10px 0',
});

const img = css({
  width: '100%',
});

const flex = css({
  display: 'flex',
  justifyContent: 'center',
});

const flexItem = css({
  width: 'calc(100% / 3)',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  padding: '0 10px',
});

const Top: FC = () => (
  <>
    <div css={container}>
      <Typography variant="h2">すべてのToDoを１箇所に</Typography>
    </div>
    <div css={container}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/login"
        size="large"
      >
        今すぐ始める
      </Button>
    </div>
    <div css={container}>
      <img css={img} src={screenshot} alt="アプリのスクリーンショット" />
    </div>
    <div css={flex}>
      <div css={flexItem}>
        <Typography variant="subtitle1">シンプル</Typography>
        <Typography variant="body1">
          複雑な機能は搭載していないシンプルなタスク管理アプリです。
          機能が少ないため直感的に操作が可能です。
        </Typography>
      </div>
      <div css={flexItem}>
        <Typography variant="subtitle1">一人専用</Typography>
        <Typography variant="body1">
          共同タスクの設定などチームで利用するための機能は搭載していません。
          個人で利用するためのタスク管理アプリです。
        </Typography>
      </div>
      <div css={flexItem}>
        <Typography variant="subtitle1">忘れない</Typography>
        <Typography variant="body1">
          すべてのタスクに実行予定日と期限日を設定することを強制されます。
          タスクの期限日と実行予定日を設定することで
          タスクを消化することに対する意識が強まります。
        </Typography>
      </div>
    </div>
  </>
);

export default Top;
