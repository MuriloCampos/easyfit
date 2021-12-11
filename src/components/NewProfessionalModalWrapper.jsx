import { useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import NewProfessionalModal from './NewProfessionalModal'

export default function NewStudentModalWrapper(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onOpen()
  }, [])

  return (
    <NewProfessionalModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} sports={props.sports} user={props.user} />
  )
}