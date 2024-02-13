import { Helmet } from 'react-helmet-async';

import { APP_NAME } from 'src/utils/environments';

import { OTPView } from 'src/sections/auth/otp';

// ----------------------------------------------------------------------

export default function OTPpage() {
  return (
    <>
      <Helmet>
        <title> Verify OTP  | {APP_NAME} </title>
      </Helmet>

      <OTPView />
    </>
  );
}
