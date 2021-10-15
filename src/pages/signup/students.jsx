import { useState } from 'react'
import {
  Heading, Flex, NumberInput, NumberInputField, Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, Text, Button, Select, Textarea, Checkbox, CheckboxGroup
} from "@chakra-ui/react"

import {getSports} from '../../lib/api';

import { useContext } from 'react';
import { UserContext } from '../../lib/context'

export default function StudentsSignUpForm(props) {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState(0)
  const { user } = useContext(UserContext)
  const [gender, setGender] = useState('')
  const [goal, setGoal] = useState('')

  const handleAgeChange = e => {
    setAge(e.target.value)
  }

  const handleWeightChange = e => {
    setWeight(e.target.value)
  }

  const handleSubmit = () => {
    const data = {
      age,
      weight,
      height,
      gender,
      goals:goal,
      sports: [''],
      email: user.email,
      name: user.displayName,
      avatar: user.photoURL
    }

    console.log(data)
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
        
          {
            props.sports.map(sport =>  (
            <CheckboxGroup onChange={data => console.log(data)}>
              <Checkbox spacing={2}>{sport.name}</Checkbox>

            </CheckboxGroup>
            )
            )
          }
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