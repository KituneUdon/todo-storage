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
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const menuWidth = 200;

const menu = css`
  width: ${menuWidth};
`;

type Props = {
  menuOpen: boolean;
  handleMenuClose: () => void;
};

const Menu: FC<Props> = ({ menuOpen, handleMenuClose }) => {
  const history = useHistory();

  return (
    <Drawer anchor="left" open={menuOpen} variant="persistent" className={menu}>
      <IconButton onClick={handleMenuClose}>
        <ChevronLeftIcon />
      </IconButton>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push('/todo/today')}>
          <ListItemIcon>
            <WbSunnyIcon />
          </ListItemIcon>
          <ListItemText primary="今日のタスク" />
        </ListItem>
        <ListItem button onClick={() => history.push('/todo/all')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="すべてのタスク" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Menu;
