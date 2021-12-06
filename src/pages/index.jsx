import React, { useEffect, useCallback } from 'react'
import { Flex, useDisclosure, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useContext } from 'react';
import { UserContext } from '../lib/context'
import NewStudentModal from '../components/NewStudentModal';
import { getSports, getStudent } from '../lib/api'
import { auth, googleAuthProvider } from '../lib/firebase'

export default function Home(props) {
    const { user } = useContext(UserContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const toast = useToast()

    if (router.query.modal && router.query.modal === 'student' && !isOpen) {
        onOpen()
    }

    const signIn = useCallback(async () => {
      const authRes = await auth.signInWithPopup(googleAuthProvider);

      const response = await getStudent(authRes.user.email)

      if (response && response.id) {
        toast({
          title: "Usuário autenticado",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
        router.push('/professionals')
      } else {
        toast({
          title: "Erro na autenticação.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
        window.location.assign('https://gifted-ramanujan-0a5946.netlify.app/')
      }
    }, []);

    useEffect(() => {
      if (router.query.modal && router.query.modal === 'login') {
        signIn()
      }
    }, [router.query])

  return (
    <Flex direction={{ base: "column", md: "row" }} justify="space-evenly" minH="100vh">
        <NewStudentModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} sports={props.sports} user={user} />
    </Flex>
  )
}

export async function getStaticProps() {
    const sports = await getSports()
  
    return {
      props: { sports },
      revalidate: 5000,
    };
  }
