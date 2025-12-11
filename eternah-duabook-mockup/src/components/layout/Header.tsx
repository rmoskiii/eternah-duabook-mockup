import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div">
        Eternah DuaBook
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
