import { Helmet } from 'react-helmet-async';

import { ForgotPasswordView } from 'src/sections/auth/forgot-password';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Forgot Password | Recon </title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
