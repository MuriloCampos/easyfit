import React, { useState } from 'react'
import { Flex, Text, Avatar, Badge, Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from '@chakra-ui/react'
import { format, isBefore } from 'date-fns'
import Rating from 'react-rating'
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import { updateClassRating } from '../lib/api'

export default function ClassListItem(props) {
  const { classItem } = props
  const [temporaryRating, setTemporaryRating] = useState()
  const [classRating, setClassRating] = useState(classItem.rating)
  const isPastClass = isBefore(new Date(classItem.datetime), Date.now())
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getBgColor = () => {
    if (isPastClass) {
      return 'red.100'
    } else {
      return 'white'
    }
  }

  const getBadgeColor = () => {
    if (isPastClass) {
      return 'gray'
    } else {
      return 'green'
    }
  }

  const handleRatingChange = async () => {
    setClassRating(temporaryRating)
    const data = {
      id: classItem.id,
      rating: temporaryRating
    }
    updateClassRating(data)
    onClose()
  }

  return (
    <>
      <Flex bgColor={getBgColor} p={2.5} borderRadius="md" align="center">
        <Avatar name={classItem.professional.user.name} src={classItem.professional.user.avatar_url} size="md" />
        <Flex direction="column" width="full" ml={3} alignItems="flex-start">
          <Text fontWeight="semibold">{classItem.professional.user.name}</Text>
          <Badge colorScheme={getBadgeColor()}>{classItem.sport.name}</Badge>
          <Text mt="1.5" mb={isPastClass ? "1.5" : "0"}>{format(new Date(classItem.datetime), 'dd/MM/yyyy HH:mm')}</Text>
          {isPastClass && <Rating onChange={(value) => {
            setTemporaryRating(value)
            onOpen()
          }} readonly={classRating > 0} initialRating={classRating > 0 ? classRating : 0} emptySymbol={<AiOutlineStar color="#F59E0B" size="20" />} fullSymbol={<AiFillStar color="#F59E0B" size="20" />} />}
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Text>Confirmar avaliação de aula?</Text>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>Cancelar</Button>
              <Button colorScheme="blue" onClick={handleRatingChange}>
                  Confirmar
              </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  )
}