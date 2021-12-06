import { Flex, Heading, Text, Avatar } from '@chakra-ui/react'
import { useContext } from 'react';
import { useRouter } from 'next/router'

import { UserContext } from '../lib/context'

export default function Header() {
  const { user } = useContext(UserContext)
  const router = useRouter()

  return (
    <>
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
        <a href="/professionals">
          <Heading 
            color="white" 
            fontWeight="semibold" 
            letterSpacing="tighter"
            cursor="pointer"
          >
            easyfit
          </Heading>
        </a>
        {user && router.pathname !== '/' ? (
          <Flex align="center">
            <Text color="white" fontWeight="bold" mr="2" fontSize="xl" display={{ base: 'none', md: 'inline' }}>
              Olá, {user.displayName.split(' ')[0]}!
              </Text>
            <a href={`/user/${user.email}`}>
              <Avatar name="User's google avatar" src={user.photoURL} cursor="pointer" />
            </a>
          </Flex>
        ) : 
          <></>
        }
      </Flex>
    </>
  )
}