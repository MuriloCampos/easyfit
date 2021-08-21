import { Flex, Button, Heading, Text, Avatar } from '@chakra-ui/react'
import { auth, googleAuthProvider } from '../lib/firebase';

import { useContext } from 'react';
import { UserContext } from '../lib/context'

export default function Header() {
  const { user } = useContext(UserContext)

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <Flex 
      as="header" 
      w="100%" 
      h="20" 
      mx="auto" 
      px="6" 
      align="center" 
      justify="space-between" 
      bgColor="blue.300"
    >
      <Heading 
        color="white" 
        fontWeight="semibold" 
        letterSpacing="tighter"
      >
        easyfit
      </Heading>
      {user ? (
        <Flex align="center">
          <Text color="white" fontWeight="bold" mr="2" fontSize="xl">
            Olá, {user.displayName.split(' ')[0]}!
            </Text>
          <Avatar name="User's google avatar" src={user.photoURL} />
          {/* This logout button is just for testing */}
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </Flex>
      ) : 
        <Button onClick={signInWithGoogle}>Login</Button>
      }
    </Flex>
  )
}