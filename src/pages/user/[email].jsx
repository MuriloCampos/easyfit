import { Grid, Flex, Button, Text, Spinner, Divider } from '@chakra-ui/react'
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

  const handleSignOut = () => {
    auth.signOut()
    window.location.assign('https://gifted-ramanujan-0a5946.netlify.app/')
  }
  return (
    <Flex direction="row" p={5}>
      <Flex w="50%" direction="column">
        <Text fontSize="xl" fontWeight="semibold">Infos</Text>

        <Divider my="5" />

        <Text>Nome: {props.student.user.name}</Text>
        <Text>Idade: {props.student.user.age}</Text>
        <Text>Peso: {props.student.weight}</Text>
        <Text>Altura: {props.student.height}</Text>
        <Text>Sexo: {props.student.user.gender === 'male' ? 'Masculino' : 'Feminino'}</Text>
        <Text>Objetivos: {props.student.goals}</Text>
        <Button onClick={handleSignOut} colorScheme="red" w="50%" mt="5">SAIR</Button>
      </Flex>

      <Flex w="50%" direction="column" alignItems="center">
        <Text fontSize="xl" fontWeight="semibold">Aulas</Text>
        <Grid gap={6} pt={5} templateColumns={{ base: "repeat(auto-fill, minmax(250px, 1fr))", md: "repeat(auto-fill, minmax(350px, 1fr))" }}>
          {isLoading ? <Spinner size="lg" /> : data.map(classItem => <ClassListItem key={classItem.id} classItem={classItem} />)}
        </Grid>
      </Flex>
    </Flex>
  )
}