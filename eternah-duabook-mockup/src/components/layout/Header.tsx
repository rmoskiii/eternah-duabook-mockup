import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Header: React.FC = () => {
  const theme = useTheme();
  const titleColor = theme.palette.getContrastText
    ? theme.palette.getContrastText(theme.palette.primary.main)
    : theme.palette.text.primary;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ color: titleColor }}>
          Eternah DuaBook
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
