import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';

const BottomNav: React.FC = () => {
  const [value, setValue] = React.useState<number>(0);
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_, v) => setValue(v as number)}
    >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
    </BottomNavigation>
  );
};

export default BottomNav;

