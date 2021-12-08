import React from 'react';
import { Flex, Grid, Divider, Icon, Button, Avatar, Box, Badge, Text, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  useToast,
  Spinner,
 } from '@chakra-ui/react'
import Calendar from 'react-calendar'
import { useQuery } from 'react-query'
import 'react-calendar/dist/Calendar.css';
import { FiHeart } from "react-icons/fi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Rating from 'react-rating'

import { UserContext } from '../lib/context'
import { getStripeJs } from '../lib/stripe-js'
import { 
  getProfessionalClassesOfDay, 
  startStripeCheckoutSession, 
  postNewClass,
  getProfessionalRating,
} from '../lib/api';

export default function ProfessionalCard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [classExpertise, setClassExpertise] = React.useState(props.professional.expertise.length > 1 ? null : props.professional.expertise[0].id)
  const [calendarDay, setCalendarDay] = React.useState(new Date())
  const [classTime, setClassTime] = React.useState(0)
  const [classDateTime, setClassDateTime] = React.useState()
  const { data, isLoading } = useQuery(['classes', { id: props.professional.id, day: calendarDay.toISOString() }], getProfessionalClassesOfDay, { enabled: isOpen })
  const { data: classRating, isLoading: isLoadingRating } = useQuery(['rating', { id: props.professional.id }], getProfessionalRating)
  const { user } = React.useContext(UserContext)
  let classTimes = []
  const working_hours = JSON.parse(props.professional.working_hours)
  const toast = useToast()

  if (data) {
    classTimes = data.map(d => {
      const classTime = new Date(d.datetime)
      return classTime.getHours()
    })
  }

  const handleNewClassSubmit = async () => {
    const classData = {
      professional_id: props.professional.id,
      student_email: user.email,
      sport_id: classExpertise,
      class_datetime: classDateTime
    }

    const response = await postNewClass(classData)

    if (response.status && response.status === 201) {
      toast({
        title: "Prosseguindo para pagamento.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      const stripeResponse = await startStripeCheckoutSession(user.email)
      const { sessionId } =  stripeResponse.data
      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({ sessionId })
    } else {
      toast({
        title: "Erro no agendamento.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const handleExpertiseChange = event => {
    setClassExpertise(event.target.value);
  };

  const handleClassDateTimeChange = event => {
    const newDateTime = calendarDay
    newDateTime.setHours(event.target.value, 0, 0, 0)
    setClassTime(parseInt(event.target.value))
    setClassDateTime(newDateTime.toISOString())
  }

  const getClassTimesButtonColor = schedule_time => {
    if (classTimes.includes(schedule_time)) {
      return 'red'
    } else if (schedule_time === classTime) {
      return 'blue'
    }

    return 'green'
  }

  return (
    <>
      <Flex bgColor="white" direction="column" p={2.5} borderRadius="md">
        <Flex>
          <Avatar name={props.professional.user.name} src={props.professional.user.avatar_url} size="xl" />
          <Flex direction="column" width="full" p={3}>
            <Flex justify="space-between" width="full" align="center">
              <Text fontSize="xl" fontWeight="semibold">{props.professional.user.name}</Text>
              <Icon as={FiHeart} />
            </Flex>
            <Box mb="2">
              {props.professional.expertise.map(expertise => 
                <Badge key={expertise.id} mr="2">{expertise.name}</Badge>
              )}
            </Box>
            {classRating && !isLoadingRating && classRating > 0 && (
              <Rating 
                readonly
                initialRating={classRating}
                emptySymbol={<AiOutlineStar color="#F59E0B" size="20" />}
                fullSymbol={<AiFillStar color="#F59E0B" size="20" />} 
              />
            )}
          </Flex>
        </Flex>

        <Divider my="3" />

        <Text color="gray.500">{props.professional.bio}</Text>

        <Box ml="auto" mt="auto">
          <Button mr="2" colorScheme="blue" disabled={!user} onClick={onOpen}>Agendar</Button>
          <Button variant="outline" colorScheme="blue">Perfil</Button>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agendamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.professional.expertise.length > 1 && (
              <Select placeholder="Escolha a modalidade" mb="3" onChange={handleExpertiseChange}>
                {props.professional.expertise.map(expertise => (
                  <option key={expertise.id} value={expertise.id}>{expertise.name}</option>
                ))}
              </Select>
            )}
            <Flex direction={{ base: "column", md: "row" }}>
              <Calendar value={calendarDay} onChange={setCalendarDay} minDate={new Date()} />
              <Box ml={{ base: 0, md: 5 }}>
                <Text fontWeight="bold" textAlign="center" mb="3">Horarios</Text>
                {isLoading ? <Spinner /> : (
                  <Grid templateColumns="1fr 1fr" gap="1.5">
                    {working_hours.map(schedule_time => {
                      const colorScheme = getClassTimesButtonColor(schedule_time)
                      return (
                        <Button key={schedule_time} disabled={colorScheme === 'red'} colorScheme={colorScheme} onClick={handleClassDateTimeChange} value={schedule_time}>{schedule_time}:00</Button>
                      )
                    })}
                  </Grid>
                )}
                
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Cancelar</Button>
            <Button colorScheme="blue" disabled={!!!classDateTime || !!!classExpertise} onClick={handleNewClassSubmit}>
              Agendar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}