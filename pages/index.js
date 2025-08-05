import { Typography, Container } from '@mui/material';

export default function HomePage() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome! 👋
      </Typography>
      <Typography variant="body1">
        This is a public page. Anyone can see this content. Try navigating to the Dashboard using the sidebar.
      </Typography>
    </Container>
  );
}