import { useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useCallback } from 'react'

import NewStudentModal from './NewStudentModal'

export default function NewStudentModalWrapper(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onOpen()
  }, [])

  return (
    <NewStudentModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} sports={props.sports} user={props.user} />
  )
}