import React from 'react'
import { Flex, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useContext } from 'react';
import { UserContext } from '../lib/context'
import NewStudentModal from '../components/NewStudentModal';
import { getSports } from '../lib/api'

export default function Home(props) {
    const { user } = useContext(UserContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()

    if (router.query.modal && router.query.modal === 'student' && !isOpen) {
        onOpen()
    }

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
