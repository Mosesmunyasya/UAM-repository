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
import IconButton from '@mui/material/IconButton';
// eslint-disable-next-line perfectionist/sort-imports
import LoadingButton from '@mui/lab/LoadingButton';

// eslint-disable-next-line perfectionist/sort-imports
import { alpha, useTheme } from '@mui/material/styles';

// eslint-disable-next-line perfectionist/sort-imports
import InputAdornment from '@mui/material/InputAdornment';
// eslint-disable-next-line perfectionist/sort-imports
import { useRouter } from 'src/routes/hooks';
// eslint-disable-next-line perfectionist/sort-imports
import { bgGradient } from 'src/theme/css';
// eslint-disable-next-line perfectionist/sort-imports
import Logo from 'src/components/logo';
// eslint-disable-next-line perfectionist/sort-imports
import Iconify from 'src/components/iconify';
// eslint-disable-next-line perfectionist/sort-imports
import axios from 'axios';
// eslint-disable-next-line perfectionist/sort-imports
import { baseUrl } from 'src/utils/environments';


export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const handleusernameChange = (event) => {
    setusername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading state of the button


  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${baseUrl}auth/login/`, {
        username: `${username}`,
        password: `${password}`,
      });
      setLoading(false)
      if (response.data.status === 200) {
        setLoginSuccess(response.data.message);
        setLoginError('')
        localStorage.setItem('email', response.data.entity.email);
        setTimeout(() => {
          router.push('/verify-otp');
        }, 500);
      } else {
        // Show error message from API response
        setLoginError(response.data.message);
        setLoginSuccess('')
      }
      console.log(response.data.message);
    } catch (error) {
      console.error('Error.... {error}');
      setLoading(false)
    }
  }
  

  const renderForm = (
    <>
      {loginError && (
          <div className="alert alert-danger" style={{ color: 'red', border: '1px solid red', width: '100%', padding: '10px', margin: '3px 0', borderRadius: '6px' }} role="alert">
            {loginError}
          </div>
        )}
        {loginSuccess && (
          <div className="alert alert-danger" style={{ color: 'green', border: '1px solid green', width: '100%', padding: '10px', margin: '3px 0', borderRadius: '6px' }} role="alert">
            {loginSuccess}
          </div>
        )}
      <Stack spacing={3}>
        <TextField name="username" 
        value={username}
        onChange={handleusernameChange} 
        label="username" 
        />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
        {/* Have Account? &nbsp; */}
        <Link  href="/forgot-password" variant="subtitle2" underline="none">
         Forgot Password
        </Link>
        <Link  href="/register" variant="subtitle2" underline="none">
          Create Account 
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
        loading={loading}
      >
        Login
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
          <Typography variant="h4" style={{ marginBottom: '5px' }}>Login</Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
