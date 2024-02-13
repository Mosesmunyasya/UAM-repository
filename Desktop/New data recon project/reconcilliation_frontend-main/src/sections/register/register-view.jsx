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
// import { useRouter } from 'src/routes/hooks';
// eslint-disable-next-line perfectionist/sort-imports
import { bgGradient } from 'src/theme/css';
// eslint-disable-next-line perfectionist/sort-imports
import Logo from 'src/components/logo';
// eslint-disable-next-line perfectionist/sort-imports
import Iconify from 'src/components/iconify';
// eslint-disable-next-line perfectionist/sort-imports
import axios from 'axios';


export default function RegisterView() {
  const theme = useTheme();
  // const router = useRouter();
  const [phone, setPhone] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

//   Validations
const [nameError, setnameError] = useState('');
const [phoneError, setphoneError] = useState('');
const [emailError, setemailError] = useState('');
const [usernameError, setusernameError] = useState('');
const [passwordError, setpasswordError] = useState('');


  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setphoneError('')
  };

  const handleNameChange = (event) => {
    setname(event.target.value);
    setnameError('')
  };
  const handleEmailChange = (event) => {
    setemail(event.target.value);
    setemailError("")
  };
  const handleUsernameChange = (event) => {
    setusername(event.target.value);
    setusernameError("")
  };
 
  
  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
    setpasswordError('')
  };



  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading state of the button


  const handleSubmit = async () => {
    setLoading(true);
    const inputValues = {
      name: { value: name, setError: setnameError, errorText: 'Name is required' },
      phone: { value: phone, setError: setphoneError, errorText: 'Phone is required' },
      email: { value: email, setError: setemailError, errorText: 'Email is required' },
      username: { value: username, setError: setusernameError, errorText: 'Username is required' },
      password: { value: password, setError: setpasswordError, errorText: 'Password is required' },
    };
  
    Object.entries(inputValues).forEach(([key, { value, setError, errorText }]) => {
      if (!value) {
        setError(errorText);
      } else {
        setError('');
      }
    });
  
    // Check if any error exists
    if (Object.values(inputValues).some(({ value }) => !value)) {
      // At least one input field is empty, return early
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post('https://example.com/api/data', {
        name: "John Doe"
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="name" 
        value={name} 
        error={Boolean(nameError)}
        helperText={nameError}
        onChange={handleNameChange} 
        label="Name" />
        <TextField name="email" 
        value={email} 
        error={Boolean(emailError)}
        helperText={emailError}
        onChange={handleEmailChange} label="Email" />
        <TextField name="phone" 
        error={Boolean(phoneError)}
        helperText={phoneError}
        value={phone} onChange={handlePhoneChange} label="Phone" />
        <TextField name="username" 
        error={Boolean(usernameError)}
        helperText={usernameError}
        value={username} onChange={handleUsernameChange} label="Username" />
        <TextField
          name="password"
          label="Password"
          error={Boolean(passwordError)}
          helperText={passwordError}
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
  
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        Have Account? &nbsp;
        <Link  href="/login" variant="subtitle2" underline="none">
          Login 
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
        Register
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
          <Typography variant="h4">Register</Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
