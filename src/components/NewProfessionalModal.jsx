import React, { useState, useContext } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  NumberInput,
  NumberInputField,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, 
  Text, 
  Select, 
  Textarea, 
  Checkbox,
  Flex,
  Divider,
  Grid,
  Spinner,
  useToast,
} from "@chakra-ui/react"
import { useRouter } from 'next/router'
import { FiCheckCircle } from "react-icons/fi";

import { postProfessional } from '../lib/api';
import { UserContext } from '../lib/context'
import { auth, googleAuthProvider } from '../lib/firebase'
import { CheckboxGroup } from '@chakra-ui/checkbox';

const POSSIBLE_WORKING_HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

export default function NewProfessionalModal(props) {
  const { isOpen, onClose } = props
  const [age, setAge] = useState('')
  const [workingHours, setWorkingHours] = useState([])
  const [gender, setGender] = useState('')
  const [hourRate, setHourRate] = useState(0)
  const [goal, setGoal] = useState('')
  const [sports, setSports] = useState([])
  const [googleSignInStatus, setGoogleSignInStatus] = useState('idle')
  const toast = useToast()
  const router = useRouter()
  const { user } = useContext(UserContext)

  const handleSubmit = async () => {
    const data = {
      age: parseInt(age),
      gender,
      expertise: sports,
      name: user.displayName,
      avatar_url: user.photoURL,
      bio: goal,
      email: user.email,
      working_hours: JSON.stringify(workingHours),
      hour_rate: parseFloat(hourRate)
    }

    const response = await postProfessional(data)

    if (response.status && response.status === 201) {
      toast({
        title: "Usuário criado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      router.push('/professionals')
    } else {
      toast({
        title: "Erro na criação do usuário.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }

  }

  const signInWithGoogle = async () => {
    setGoogleSignInStatus('loading')
    await auth.signInWithPopup(googleAuthProvider);
    setGoogleSignInStatus('success')
  };

  const handleWorkingHoursChange = e => {
    const index = workingHours.findIndex(working_hour => working_hour === e.target.value)

    if (index === -1) {
      setWorkingHours(current => [...current, parseInt(e.target.value)])
    } else {
      setWorkingHours(current => current.filter(sport => sport !== parseInt(e.target.value)))
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Queremos te conhecer melhor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex w="full" justify="center">
            {googleSignInStatus === 'idle' ? 
              <Button onClick={signInWithGoogle} alignSelf="center">Login com Google</Button>
              : googleSignInStatus === 'success' ? <FiCheckCircle color="green" size="40" /> : <Spinner />
            }
            
          </Flex>
         
          
          <Text mt="5" color="blue.900" fontWeight="semibold">Conte sobre você para os seus alunos</Text>
          <Textarea mt="5" placeholder="Detalhe sobre o que você faz" onChange={e => setGoal(e.target.value)}/>

          <Divider my="3" />

          <Text mt="5" color="blue.900" fontWeight="semibold" mb="5">Esportes que você gostaria de dar aula</Text>
          <Grid gap={6} pt={5} templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(3, 1fr)" }}>
          {props.sports.map(sport =>  <Checkbox onChange={e => {
              const index = sports.findIndex(sport => sport === e.target.value)

              if (index === -1) {
                setSports(current => [...current, e.target.value])
              } else {
                setSports(current => current.filter(sport => sport !== e.target.value))
              }
            }} key={sport.id} spacing={2} value={sport.id}>{sport.name}</Checkbox>)}
          </Grid>

          <Divider my="3" />
          
          <Text mt="5" color="blue.900" fontWeight="semibold" mb="5">Quais os seus diferenciais?</Text>     

          <Grid gap={6} pt={5} templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(3, 1fr)" }}>   
          <CheckboxGroup colorScheme='blue.900'>
               <Checkbox value='PosGraduacao'>Pós Graduação</Checkbox>  
               <Checkbox value='Mestrado'>Mestrado</Checkbox>
               <Checkbox value='Doutorado'>Doutorado</Checkbox>
               <Checkbox value='Medalhista'>Medalhas</Checkbox>
               <Checkbox value='Outro'>Outro</Checkbox>
          </CheckboxGroup>
          </Grid>

          <Divider my="3" />

          <Flex mt="3">
            <NumberInput mr="3">
              <NumberInputField placeholder="Valor da aula (R$)" onChange={e => setHourRate(e.target.value)} />
            </NumberInput>

            <NumberInput>
              <NumberInputField placeholder="Idade" onChange={e => setAge(e.target.value)} />
            </NumberInput>
          </Flex>

          <Select mt="5" variant="outline" placeholder="Sexo:" onChange={e => setGender(e.target.value)}>
            <option value="female">Feminino</option>
            <option value="male">Masculino</option>
          </Select>

          <Text mt="5" color="blue.900" fontWeight="semibold" mb="5">Horarios disponiveis</Text>
          <Grid gap={6} pt={5} templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }}>
            {POSSIBLE_WORKING_HOURS.map(schedule_time => {
              return (
                <Button key={schedule_time} colorScheme={workingHours.includes(schedule_time) ? 'blue' : 'green'} onClick={handleWorkingHoursChange} value={schedule_time}>{schedule_time}:00</Button>
              )
            })}
          </Grid>

        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>Cancelar</Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Criar conta
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}