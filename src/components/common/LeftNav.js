import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const LeftNav = () => (
  <div>
    <Paper>
      <Menu>
        <MenuItem primaryText="Maps" />
        <MenuItem primaryText="Books" />
        <MenuItem primaryText="Flights" />
        <MenuItem primaryText="Apps" />
      </Menu>
    </Paper>
  </div>
);

export default LeftNav;
