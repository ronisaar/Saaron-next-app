import { signIn } from 'next-auth/react';
import { Button, Container, Typography, Box, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginPage() {
  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Typography sx={{ mt: 1, mb: 3, textAlign: 'center' }}>
          Please sign in to view the protected content.
        </Typography>
        
        {/* Use a Stack to manage multiple buttons */}
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            Sign in with Google
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}