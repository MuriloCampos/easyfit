import { Flex, Button, Heading, Text, Avatar } from '@chakra-ui/react'
import Link from 'next/link'
import { useContext } from 'react';

import { auth, googleAuthProvider } from '../lib/firebase';
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
      <Link href="/" passHref>
        <Heading 
          color="white" 
          fontWeight="semibold" 
          letterSpacing="tighter"
          cursor="pointer"
        >
          easyfit
        </Heading>
      </Link>
      {user ? (
        <Flex align="center">
          <Text color="white" fontWeight="bold" mr="2" fontSize="xl" display={{ base: 'none', md: 'inline' }}>
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