import { useState } from 'react';
import { getSession } from 'next-auth/react';
import {
  Container,
  Typography,
  Autocomplete,
  TextField,
  Box,
  Grid,
  Paper,
  Divider
} from '@mui/material';

export default function ExchangePage({ usdRates, eurRates, user, error }) {
  // ✅ FIX 1: All React Hooks are now at the top level, called unconditionally.
  const [selectedUsdCurrency, setSelectedUsdCurrency] = useState(null);
  const [selectedEurCurrency, setSelectedEurCurrency] = useState(null);

  // ✅ FIX 2: The early return for an error now happens AFTER the hooks.
  // This is perfectly fine and a common pattern.
  if (error) {
    return (
      <Container>
        {/* It's good practice to show the user's name even on an error page if available */}
        {user && <Typography sx={{mb: 2}}>Welcome, <strong>{user.name}</strong>.</Typography>}
        <Typography color="error">Error: {error}</Typography>
        <Typography color="text.secondary" sx={{mt: 1}}>Could not fetch the latest exchange rates. Please try again later.</Typography>
      </Container>
    );
  }

  // --- State and Options Setup ---
  // This logic is now safe because we know `error` is not present,
  // meaning `usdRates` and `eurRates` exist.
  const usdOptions = Object.keys(usdRates).map((c) => ({ label: c, rate: usdRates[c] }));
  const eurOptions = Object.keys(eurRates).map((c) => ({ label: c, rate: eurRates[c] }));

  // ✅ FIX 3: Initialize the default values here and set them if the state is still null.
  // This runs on the first render only, preventing a re-render loop.
  const defaultUsdOption = usdOptions.find(opt => opt.label === 'ILS') || null;
  if (selectedUsdCurrency === null && defaultUsdOption) {
    setSelectedUsdCurrency(defaultUsdOption);
  }

  const defaultEurOption = eurOptions.find(opt => opt.label === 'ILS') || null;
  if (selectedEurCurrency === null && defaultEurOption) {
    setSelectedEurCurrency(defaultEurOption);
  }

  // --- Calculation Logic ---
  const usdToIlsRate = usdRates.ILS;
  const eurToIlsRate = eurRates.ILS;

  // Raw number calculations
  const rawUsdAmount = 10000 * usdToIlsRate;
  const rawEurAmount = 5000 * eurToIlsRate;
  const rawTotalAmount = rawUsdAmount + rawEurAmount;

  // Formatted strings for display
  const formattingOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const formattedUsdAmount = rawUsdAmount.toLocaleString('en-US', formattingOptions);
  const formattedEurAmount = rawEurAmount.toLocaleString('en-US', formattingOptions);
  const formattedTotalAmount = rawTotalAmount.toLocaleString('en-US', formattingOptions);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Foreign Exchange Rates
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Welcome, <strong>{user.name}</strong>. The default currency is set to ILS (₪).
      </Typography>

      <Grid container spacing={4}>
        {/* USD Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom>USD Rates 💵</Typography>
          <Autocomplete
            value={selectedUsdCurrency}
            options={usdOptions}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            sx={{ width: 300 }}
            onChange={(event, newValue) => setSelectedUsdCurrency(newValue)}
            renderInput={(params) => <TextField {...params} label="Select Currency" />}
          />
          {selectedUsdCurrency && (
            <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
              <Typography variant="h6">
                1 USD = {selectedUsdCurrency.rate.toFixed(4)} {selectedUsdCurrency.label}
              </Typography>
            </Box>
          )}
        </Grid>

        {/* EUR Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom>EUR Rates 💶</Typography>
          <Autocomplete
            value={selectedEurCurrency}
            options={eurOptions}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            sx={{ width: 300 }}
            onChange={(event, newValue) => setSelectedEurCurrency(newValue)}
            renderInput={(params) => <TextField {...params} label="Select Currency" />}
          />
          {selectedEurCurrency && (
            <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
              <Typography variant="h6">
                1 EUR = {selectedEurCurrency.rate.toFixed(4)} {selectedEurCurrency.label}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* --- Updated Calculation Section --- */}
      <Paper sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Example Calculations
        </Typography>
        <Divider sx={{ mb: 2 }}/>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body1">
            <strong>$10,000 USD</strong> is approximately <strong>₪{formattedUsdAmount} ILS</strong>
          </Typography>
          <Typography variant="body1">
            <strong>€5,000 EUR</strong> is approximately <strong>₪{formattedEurAmount} ILS</strong>
          </Typography>
          <Divider sx={{ my: 1 }}/>
          <Typography variant="body1">
            <strong>TOTAL</strong> is approximately <strong>₪{formattedTotalAmount} ILS</strong>
          </Typography>
        </Box>
          <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
            *Based on live mid-market rates as of August 2025.
        </Typography>
      </Paper>

      {/* --- Summary Section --- */}
      <Paper sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          About the Israeli Shekel (ILS)
        </Typography>
        <Divider sx={{ mb: 2 }}/>
        <Typography variant="body1" paragraph>
          The Israeli Shekel (₪), denoted by the code **ILS**, is the official currency of the State of Israel. It is managed by the central **Bank of Israel**.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Key Facts</Typography>
        <Box component="ul" sx={{ pl: 2.5 }}>
            <li>The currency is divided into 100 **agurot**.</li>
            <li>Common coins include 10 agurot, ½, 1, 2, 5, and 10 shekels.</li>
            <li>Banknotes are issued in denominations of ₪20, ₪50, ₪100, and ₪200.</li>
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>Economic Profile</Typography>
        <Typography variant="body1" paragraph>
            The shekel is a strong, freely convertible currency that is traded globally. It has been recognized for its stability over the last decade, making it a key currency in the Middle East financial markets. The rates displayed on this page reflect its live value against major world currencies like the USD and EUR.
        </Typography>
      </Paper>
    </Container>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  try {
    const [usdRes, eurRes] = await Promise.all([
      fetch('https://api.exchangerate-api.com/v4/latest/USD'),
      fetch('https://api.exchangerate-api.com/v4/latest/EUR')
    ]);
    if (!usdRes.ok || !eurRes.ok) throw new Error('Failed to fetch API data.');
    const usdData = await usdRes.json();
    const eurData = await eurRes.json();
    return {
      props: {
        usdRates: usdData.rates,
        eurRates: eurData.rates,
        user: session.user,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
        user: session.user,
      },
    };
  }
}