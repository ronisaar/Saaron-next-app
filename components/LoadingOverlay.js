import { Backdrop, CircularProgress } from '@mui/material';

export default function LoadingOverlay() {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
      open={true} // The parent component will control rendering
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}