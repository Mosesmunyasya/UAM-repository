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
// import { useRouter } from 'src/routes/hooks';
// eslint-disable-next-line perfectionist/sort-imports
import { bgGradient } from 'src/theme/css';
// eslint-disable-next-line perfectionist/sort-imports
import Logo from 'src/components/logo';




export default function ForgotPasswordView() {
  const theme = useTheme();
  // const router = useRouter();
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setEmailError('');
  };


  const [loading, setLoading] = useState(false); // State to track loading state of the button


  const handleSubmit = async () => {
    if (!phone) {
      // If phone input is empty, set the error message
      setEmailError('Email is required');
      return;
    }
  
    setLoading(true);
    try {
      console.log(phone)
    } catch (error) {
      // Handle error
      // ...
    } finally {
      setLoading(false);
    }
  };
  
  

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="phone" 
        value={phone}
        onChange={handlePhoneChange} 
        label="Email address" 
        required
        error={Boolean(emailError)}
        helperText={emailError}
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
        Submit
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
          <Typography variant="h4">Forgot Password</Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
