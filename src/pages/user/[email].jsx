import React, { useEffect, useState } from 'react'
import { Grid, Flex, Button, Text, Spinner, Divider, Center, Badge } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { getStudent, getStudentClassesQuery } from '../../lib/api';
import ClassListItem from '../../components/ClassListItem';
import { auth } from '../../lib/firebase'

export async function getServerSideProps({ params }) {
  const { email } = params;
  const student = await getStudent(email)

  return {
    props: { email, student }
  };
}

export default function Profile(props) {
  const { data, isLoading } = useQuery(['classes', { email: props.email }], getStudentClassesQuery)
  const [orderedData, setOrderedData] = useState()

  useEffect(() => {
    if (data && !isLoading) {
      const newData = data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
      setOrderedData(newData)
    }
  }, [data, isLoading])

  const handleSignOut = () => {
    auth.signOut()
    window.location.assign('https://gifted-ramanujan-0a5946.netlify.app/')
  }
  return (
    <Center my="10">
      <Flex direction={{ base: "column", md: "row" }} w="80%">
        <Flex mb={{ base: "15", md: "0" }} w={{ base: "100%", md: "40%" }} direction="column" bgColor="white" p={3} rounded="md">
          <Text fontSize="xl" fontWeight="semibold">Dados pessoais</Text>

          <Divider my="3" />

          <Flex mb="1.5">
            <Text fontWeight="semibold" mr="1.5">Nome:</Text>
            <Text>{props.student.user.name}</Text>
          </Flex>

          <Flex mb="1.5">
            <Text fontWeight="semibold" mr="1.5">Idade:</Text>
            <Text>{props.student.user.age}</Text>
          </Flex>

          <Flex mb="1.5">
            <Text fontWeight="semibold" mr="1.5">Peso:</Text>
            <Text>{props.student.weight}</Text>
          </Flex>

          <Flex mb="1.5">
            <Text fontWeight="semibold" mr="1.5">Altura:</Text>
            <Text>{props.student.height}</Text>
          </Flex>

          <Flex mb="1.5">
            <Text fontWeight="semibold" mr="1.5">Sexo:</Text>
            <Text>{props.student.user.gender === 'male' ? 'Masculino' : 'Feminino'}</Text>
          </Flex>

          <Flex mb="1.5">
            <Text fontWeight="semibold">Esportes:</Text>
            {props.student.sports.map(sport => <Badge ml="1.5" key={sport.id}>{sport.name}</Badge>)}
          </Flex>

          <Flex mb="1.5">
            <Text fontWeight="semibold" mr="1.5">Objetivos:</Text>
            <Text>{props.student.goals}</Text>
          </Flex>
          <Button onClick={handleSignOut} colorScheme="red" w="50%" mt="auto" mx="auto">SAIR</Button>
        </Flex>

        <Flex w="20%" />

        <Flex w={{ base: "100%", md: "40%" }} direction="column" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">Aulas</Text>
          <Grid gap={6} pt={5} templateColumns={{ base: "repeat(auto-fill, minmax(250px, 1fr))", md: "repeat(auto-fill, minmax(350px, 1fr))" }}>
            {isLoading ? <Spinner size="lg" /> : data.map(classItem => <ClassListItem key={classItem.id} classItem={classItem} />)}
          </Grid>
        </Flex>
      </Flex>
    </Center>
  )
}