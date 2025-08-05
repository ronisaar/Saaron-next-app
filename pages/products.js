import { getSession } from 'next-auth/react';
import { Container, Typography, Box, Paper } from '@mui/material';

// This is a placeholder for your product data.
// In a real app, you would fetch this from a database or API.
const sampleProducts = [
  { id: 1, name: 'Quantum Laptop', description: 'Next-gen processing power.' },
  { id: 2, name: 'Hyper-Threaded Mouse', description: 'Navigate at the speed of thought.' },
  { id: 3, name: 'Acoustic-Dampening Keyboard', description: 'Silent, yet responsive.' },
];

export default function ProductsPage({ user }) {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Welcome, <strong>{user.name}</strong>. Here is our exclusive list of products, visible only to logged-in members.
      </Typography>
      
      <Box>
        {sampleProducts.map((product) => (
          <Paper key={product.id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If the user is not logged in, redirect to the login page.
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // If the user is logged in, pass the session data to the page.
  return {
    props: {
      user: session.user,
    },
  };
}