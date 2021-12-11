import React, { useState } from 'react'
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

import { postStudent } from '../lib/api';
import { auth, googleAuthProvider } from '../lib/firebase'


export default function NewStudentModal(props) {
  const { isOpen, onClose, user } = props
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState(0)
  const [gender, setGender] = useState('')
  const [goal, setGoal] = useState('')
  const [sports, setSports] = useState([])
  const [googleSignInStatus, setGoogleSignInStatus] = useState('idle')
  const toast = useToast()
  const router = useRouter()


  const handleAgeChange = e => {
    setAge(e.target.value)
  }

  const handleWeightChange = e => {
    setWeight(e.target.value)
  }

  const handleSubmit = async () => {
    const data = {
      age: parseInt(age),
      weight: parseFloat(weight),
      height,
      gender,
      goals:goal,
      sports,
      email: user.email,
      name: user.displayName,
      avatar_url: user.photoURL
    }

    const response = await postStudent(data)

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
          <Flex my="5">
            <NumberInput mr="5">
              <NumberInputField placeholder="Idade" onChange={handleAgeChange} />
            </NumberInput>

            <NumberInput>
              <NumberInputField placeholder="Peso (Kg)" onChange={handleWeightChange} />
            </NumberInput>
          </Flex>

          <Text mb="1.5" color="blue.900" fontWeight="semibold">Altura: {height}cm</Text>
          <Slider aria-label="slider-ex-1" value={height} onChange={value => setHeight(value)} min={0} max={230}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <Select mt="5" variant="outline" placeholder="Sexo:" onChange={e => setGender(e.target.value)}>
            <option value="female">Feminino</option>
            <option value="male">Masculino</option>
          </Select>

          <Text mt="5" color="blue.900" fontWeight="semibold">Quais são seus objetivos?</Text>
          <Textarea mt="5" placeholder="Detalhe seus objetivos" onChange={e => setGoal(e.target.value)}/>

          <Divider my="3" />

          <Text mt="5" color="blue.900" fontWeight="semibold" mb="5">Esportes do seu interesse</Text>
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
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>Cancelar</Button>
          <Button disabled={!!!user} colorScheme="blue" onClick={handleSubmit}>
            Criar conta
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}