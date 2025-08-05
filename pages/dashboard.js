import { getSession } from 'next-auth/react';
import { Typography, Container } from '@mui/material';

export default function DashboardPage({ user }) {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Protected Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome, <strong>{user.name}</strong>! You can see this page because you are signed in.
      </Typography>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If the user is not logged in, redirect to the login page
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // If the user is logged in, pass the session data to the page
  return {
    props: {
      user: session.user,
    },
  };
}