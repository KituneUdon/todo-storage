import React, { FC } from 'react';
import {
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useHistory, useLocation } from 'react-router-dom';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const menuWidth = 200;

const root = css({
  display: 'flex',
});

const menu = css({
  width: menuWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
});

const toolbar = css({
  display: 'flex',
  height: '64px',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const useStyles = makeStyles(() =>
  createStyles({
    drawerOpen: {
      width: `${menuWidth}px`,
    },
    drawerClose: {
      overflowX: 'hidden',
      width: '72px',
    },
  }),
);

type Props = {
  menuOpen: boolean;
  handleMenuClose: () => void;
};

const Menu: FC<Props> = ({ menuOpen, handleMenuClose }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <div css={root}>
      <Drawer
        anchor="left"
        open={menuOpen}
        variant="permanent"
        css={menu}
        classes={{ paper: menuOpen ? classes.drawerOpen : classes.drawerClose }}
      >
        <div css={toolbar}>
          <IconButton onClick={handleMenuClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => history.push('/tasks/today')}>
            <ListItemIcon>
              <WbSunnyIcon
                color={
                  location.pathname === '/tasks/today' ? 'inherit' : 'disabled'
                }
              />
            </ListItemIcon>
            <ListItemText primary="今日のタスク" />
          </ListItem>
          <ListItem button onClick={() => history.push('/tasks/all')}>
            <ListItemIcon>
              <HomeIcon
                color={
                  location.pathname === '/tasks/all' ? 'inherit' : 'disabled'
                }
              />
            </ListItemIcon>
            <ListItemText primary="すべてのタスク" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Menu;
