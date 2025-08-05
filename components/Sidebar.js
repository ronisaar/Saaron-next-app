import Link from 'next/link';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'; // 1. Import icon

export default function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { text: 'Home', href: '/', icon: <HomeIcon /> },
    { text: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Products', href: '/products', icon: <StorefrontIcon /> },
    { text: 'Exchange Rates', href: '/exchange', icon: <CurrencyExchangeIcon /> }, // 2. Add new item
  ];

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
        <Toolbar />
        <List sx={{width: 240}}>
            {menuItems.map((item) => (
            <Link href={item.href} key={item.text} passHref legacyBehavior>
                <ListItem disablePadding component="a" onClick={onClose}>
                    <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            </Link>
            ))}
      </List>
    </Drawer>
  );
}