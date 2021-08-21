import { ChakraProvider } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../lib/firebase';
import { UserContext } from '../lib/context';
import Navbar from '../components/Navbar'
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  
  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{ user }}>
        <Navbar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
