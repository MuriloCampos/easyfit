import { ChakraProvider } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {QueryClient,
  QueryClientProvider,} from 'react-query'

import { auth } from '../lib/firebase';
import { UserContext } from '../lib/context';
import Navbar from '../components/Navbar'
import { theme } from '../styles/theme';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <UserContext.Provider value={{ user }}>
          <Navbar />
          <Component {...pageProps} />
        </UserContext.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
