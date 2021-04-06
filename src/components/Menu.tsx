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

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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

const Menu: FC<Props> = ({ menuOpen, handleMenuClose }) => (
  <Drawer anchor="left" open={menuOpen} variant="persistent" className={menu}>
    <IconButton onClick={handleMenuClose}>
      <ChevronRightIcon />
    </IconButton>
    <Divider />
    <List>
      <ListItem button>
        <ListItemIcon>
          <WbSunnyIcon />
        </ListItemIcon>
        <ListItemText primary="今日のタスク" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="すべてのタスク" />
      </ListItem>
    </List>
  </Drawer>
);

export default Menu;
