import { Flex, Button, Heading, Text, Avatar, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { useContext } from 'react';

import { auth, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context'
import NewStudentModal from './NewStudentModal';

export default function Header() {
  const { user } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const mockedSports = [
    {
      "name": "jiu jitsu",
      "id": "5077694b-011a-43ba-a583-085347492af3",
      "created_at": "2021-11-28T14:49:29.388Z",
      "updated_at": "2021-11-28T14:49:29.388Z"
    },
    {
      "name": "boxe",
      "id": "b69478f1-e437-495b-9e2b-331dd8e2c9db",
      "created_at": "2021-11-28T14:49:36.317Z",
      "updated_at": "2021-11-28T14:49:36.317Z"
    },
    {
      "name": "ciclismo",
      "id": "d71f554d-74b4-47dc-a2bb-7ba2995c7451",
      "created_at": "2021-11-28T14:49:44.197Z",
      "updated_at": "2021-11-28T14:49:44.197Z"
    },
    {
      "name": "Natação",
      "id": "a96f18ed-fb1b-4508-8e12-1c3c759c5603",
      "created_at": "2021-11-28T14:49:54.415Z",
      "updated_at": "2021-11-28T14:49:54.415Z"
    },
    {
      "name": "Volei",
      "id": "dc161e0e-a35a-4a2a-a81f-dd905b43dc37",
      "created_at": "2021-12-05T19:36:04.330Z",
      "updated_at": "2021-12-05T19:36:04.330Z"
    }
  ]

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  

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
        <Button onClick={onOpen}>Criar Aluno</Button>
        {user ? (
          <Flex align="center">
            <Text color="white" fontWeight="bold" mr="2" fontSize="xl" display={{ base: 'none', md: 'inline' }}>
              Olá, {user.displayName.split(' ')[0]}!
              </Text>
            <Link href={`/user/${user.email}`}>
              <Avatar name="User's google avatar" src={user.photoURL} cursor="pointer" />
            </Link>
          </Flex>
        ) : 
          <Button onClick={signInWithGoogle}>Login</Button>
        }
      </Flex>
      <NewStudentModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} sports={mockedSports} user={user} />
    </>
  )
}