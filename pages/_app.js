import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import LoadingOverlay from '../components/LoadingOverlay'; // Import our new component

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteStart = () => setLoading(true);
    const handleRouteDone = () => {
      // Wait for 500ms before hiding the loader
      setTimeout(() => setLoading(false), 500); 
    };

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <CssBaseline />
      {loading && <LoadingOverlay />} {/* Conditionally render the overlay */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;