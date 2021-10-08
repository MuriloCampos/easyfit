import { useState } from 'react'
import { Heading, Flex, NumberInput, NumberInputField, Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, Text, Button } from "@chakra-ui/react"

import { useContext } from 'react';
import { UserContext } from '../../lib/context'

export default function StudentsSignUpForm() {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState(0)
  const { user } = useContext(UserContext)

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
      gender: 'male',
      goals: 'quero ficar bom',
      sports: [''],
      email: user.email,
      name: user.displayName,
      avatar: user.photoURL
    }

    console.log(data)
  }

  return (
    <Flex p={10} direction="column">
      <Heading textAlign="center">Queremos te conhecer melhor</Heading>

      <Flex direction="row" mt={5}>
        <Flex direction="column" flex={1}>
          <Flex>
            <NumberInput mr="15">
              <NumberInputField w="120px" placeholder="Idade" onChange={handleAgeChange} />
            </NumberInput>

            <NumberInput>
              <NumberInputField w="120px" placeholder="Peso (kg)" onChange={handleWeightChange} />
            </NumberInput>
          </Flex>

          <Text mt={5}>Altura: {height}cm</Text>
          <Slider aria-label="slider-ex-1" value={height} w="40%" mt="2" onChange={value => setHeight(value)} min={0} max={230}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>

        <Flex flex={1}>ESPORTES</Flex>
      </Flex>

      <Button colorScheme="blue" mt="50px" onClick={handleSubmit}>Finalizar cadastro</Button>
    </Flex>
  )
}