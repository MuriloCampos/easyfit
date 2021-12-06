import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Heading, Flex, NumberInput, NumberInputField, Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, Text, Button, Select, Textarea, Checkbox
} from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"

import { getSports, postStudent } from '../../lib/api';

import { useContext } from 'react';
import { UserContext } from '../../lib/context'

export default function StudentsSignUpForm(props) {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState(0)
  const [gender, setGender] = useState('')
  const [goal, setGoal] = useState('')
  const [sports, setSports] = useState([])
  const { user } = useContext(UserContext)
  const router = useRouter()
  const toast = useToast()

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

    if (response.status === 201) {
      toast({
        title: "Usuário criado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      router.push('/professionals?page=1')
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

  return (
    <Flex p={10} direction="column">
      <Heading textAlign="center">QUEREMOS TE CONHECER MELHOR</Heading>

      <Flex direction="row" mt={5}>
        <Flex direction="column" flex={1} borderWidth={1} borderColor="blue.300" padding={3} borderRadius="md" marginRight={5} alignItems="center">
 
          <Flex>
            <NumberInput mr="15">
              <NumberInputField w="170px" placeholder="Idade" onChange={handleAgeChange} />
            </NumberInput>

            <NumberInput>
              <NumberInputField w="170px" placeholder="Peso (Kg)" onChange={handleWeightChange} />
            </NumberInput>
          </Flex>

          <Text mt={5}>Altura: {height}cm</Text>
          <Slider aria-label="slider-ex-1" value={height} w="50%" mt="2" onChange={value => setHeight(value)} min={0} max={230}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <Flex>
            <Select w="350px" mt="5" variant="outline" placeholder="Sexo:" onChange={e => setGender(e.target.value)}>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
            </Select>
          </Flex>

          <Flex>
            <Text mt="5">Objetivos?</Text>
          </Flex>

          <Flex>
            <Textarea mt="5" w="350px" placeholder="Detalhe seus objetivos" onChange={e => setGoal(e.target.value)}/>
          </Flex>

        </Flex>
      
        <Flex flex={1} borderWidth={1} borderColor="blue.300" padding={3} borderRadius="md">ESPORTES DO SEU INTERESSE
            {props.sports.map(sport =>  <Checkbox onChange={e => {
              const index = sports.findIndex(sport => sport === e.target.value)

              if (index === -1) {
                setSports(current => [...current, e.target.value])
              } else {
                setSports(current => current.filter(sport => sport !== e.target.value))
              }
            }} key={sport.id} spacing={2} value={sport.id}>{sport.name}</Checkbox>)}
        </Flex>

      </Flex>

      <Button colorScheme="blue" mt="50px" onClick={handleSubmit}>Finalizar cadastro</Button>
    </Flex >
  )
}

export async function getStaticProps() {
  const sports = await getSports()

  return {
    props: {sports },
    revalidate: 5000,
  };
}