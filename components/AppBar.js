import { useSession, signIn, signOut } from 'next-auth/react';
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function AppBarComponent({ onMenuClick }) {
  const { data: session } = useSession();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={onMenuClick} edge="start" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          SAAR App
        </Typography>
        {session ? (
          <>
            <Avatar src={session.user.image} sx={{ width: 32, height: 32, mr: 2 }} />
            <Button color="inherit" onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => signIn('google')}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}