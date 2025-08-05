import { useState } from 'react';
import { Box } from '@mui/material';
import AppBarComponent from './AppBar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarComponent onMenuClick={() => setDrawerOpen(true)} />
      <Sidebar isOpen={isDrawerOpen} onClose={toggleDrawer(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
        {children}
      </Box>
    </Box>
  );
}