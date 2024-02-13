/* eslint-disable perfectionist/sort-imports */
import React, { useState, useEffect } from 'react';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import Spinner from 'src/utils/spinner/Spinner'; 

// ----------------------------------------------------------------------

export default function App() {
  const [loading, setLoading] = useState(true);

  useScrollToTop();

  useEffect(() => {
    // Simulate an async operation (e.g., fetching data from an API)
    setTimeout(() => {
      setLoading(false); // Once data is loaded, set loading to false
    }, 500);
  }, []);

  return (
    <ThemeProvider>
      {loading ? (
        <Spinner />
      ) : (
        <Router />
      )}
    </ThemeProvider>
  );
}
