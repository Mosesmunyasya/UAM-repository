import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | Recon </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
