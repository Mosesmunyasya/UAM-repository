// eslint-disable-next-line perfectionist/sort-imports
import React, { useState } from 'react';

// eslint-disable-next-line perfectionist/sort-imports
import Box from '@mui/material/Box';
// eslint-disable-next-line perfectionist/sort-imports
import Link from '@mui/material/Link';
// eslint-disable-next-line perfectionist/sort-imports
import Card from '@mui/material/Card';
// eslint-disable-next-line perfectionist/sort-imports
import Stack from '@mui/material/Stack';
// eslint-disable-next-line perfectionist/sort-imports
import TextField from '@mui/material/TextField';
// eslint-disable-next-line perfectionist/sort-imports
import Typography from '@mui/material/Typography';
// eslint-disable-next-line perfectionist/sort-imports
import LoadingButton from '@mui/lab/LoadingButton';

// eslint-disable-next-line perfectionist/sort-imports
import { alpha, useTheme } from '@mui/material/styles';

// eslint-disable-next-line perfectionist/sort-imports
import { useRouter } from 'src/routes/hooks';
// eslint-disable-next-line perfectionist/sort-imports
import { bgGradient } from 'src/theme/css';
// eslint-disable-next-line perfectionist/sort-imports
import Logo from 'src/components/logo';
// eslint-disable-next-line perfectionist/sort-imports
import axios from 'axios';
// eslint-disable-next-line perfectionist/sort-imports
import { baseUrl } from 'src/utils/environments';




export default function OTPView() {
  const theme = useTheme();
  const router = useRouter();
  const [otp, setotp] = useState('');
  const [otpError, setotpError] = useState('');

  const [InvalidOTP, setInvalidOTP] = useState('');
  const [ValidOTP, setValidOTP] = useState('');

  const email = localStorage.getItem('email');

  const handleotpChange = (event) => {
    setotp(event.target.value);
    setotpError('');
  };


  const [loading, setLoading] = useState(false); // State to track loading state of the button


  const handleSubmit = async () => {
    if (!otp) {
      // If otp input is empty, set the error message
      setotpError('Email is required');
      return;
    }
  
    setLoading(true);
    try {
        const response = await axios.post(`${baseUrl}auth/verifyotp/`, {
          email: `${email}`,
          otp: `${otp}`,
        });
        setLoading(false)
        if (response.data.status === 200) {
          setValidOTP(response.data.message);
          setInvalidOTP('')
          localStorage.removeItem('email')
          localStorage.setItem('user', JSON.stringify(response.data.entity));
          setTimeout(() => {
            router.push('/');
          }, 500);
        } else {
          setInvalidOTP(response.data.message);
          setValidOTP('')
        }
      } catch (error) {
        console.error('Error.... {error}');
        setLoading(false)
      }
  };
  
  

  const renderForm = (
    <>
    {InvalidOTP && (
          <div style={{ color: 'red', border: '1px solid red', width: '100%', padding: '10px', margin: '3px 0', borderRadius: '6px' }} role="alert">
            {InvalidOTP}
          </div>
        )}
        {ValidOTP && (
          <div style={{ color: 'green', border: '1px solid green', width: '100%', padding: '10px', margin: '3px 0', borderRadius: '6px' }} role="alert">
            {ValidOTP}
          </div>
        )}

      <Stack spacing={3}>
        <TextField name="otp" 
        value={otp}
        onChange={handleotpChange} 
        label="OTP" 
        required
        error={Boolean(otpError)}
        helperText={otpError}
        />

       
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        {/* Have Account? &nbsp; */}
        
        <Link  href="/login" variant="subtitle2" underline="none">
          Back
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        style={{ background: 'maroon' }}
        onClick={handleSubmit}
        loading={loading} // Pass the loading state to the LoadingButton component
      >
        Verify
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Verify OTP </Typography>
          <p>Check your email for an <strong>OTP</strong></p>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
