import React, { useEffect, useCallback } from 'react'
import { Flex, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useContext } from 'react';
import { UserContext } from '../lib/context'
import NewStudentModalWrapper from '../components/NewStudentModalWrapper';
import NewProfessionalModalWrapper from '../components/NewProfessionalModalWrapper';
import { getSports, getStudent } from '../lib/api'
import { auth, googleAuthProvider } from '../lib/firebase'

export default function Home(props) {
    const { user } = useContext(UserContext)
    const router = useRouter()
    const toast = useToast()

    const getModalWrapper = useCallback(() => {
      if (router.query.modal && router.query.modal === 'student') {
        return <NewStudentModalWrapper sports={props.sports} user={user} />
      } else if (router.query.modal && router.query.modal === 'professional') {
        return <NewProfessionalModalWrapper sports={props.sports} user={user} />
      } else return <></>
    }, [router.query, props.sports, user])

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
    }, [router, toast]);

    useEffect(() => {
      if (router.query.modal && router.query.modal === 'login') {
        signIn()
      }
    }, [router.query, signIn])

  return (
    <Flex direction={{ base: "column", md: "row" }} justify="space-evenly" minH="100vh">
      {getModalWrapper()}
    </Flex>
  )
}

export async function getServerSideProps() {
    const sports = await getSports()
  
    return {
      props: { sports }
    };
  }
