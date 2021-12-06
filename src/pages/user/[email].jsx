import { Grid, Flex, Button, Heading, Text, Avatar, useDisclosure, Divider } from '@chakra-ui/react'
import { getStudents, getStudent, getStudentClasses } from '../../lib/api';
import ClassListItem from '../../components/ClassListItem';
import { auth } from '../../lib/firebase'

export async function getStaticProps({ params }) {
  const { email } = params;
  const student = await getStudent(email)
  const classes = await getStudentClasses(email)

  return {
    props: { email, student, classes },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const students = await getStudents();

  const paths = students.map(student => {
    return {
      params: { 'email': student.user.email },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  };
}

export default function Profile(props) {
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
        <Button onClick={() => auth.signOut()} colorScheme="red" w="50%" mt="5">SAIR</Button>

      </Flex>

      <Flex w="50%" direction="column" alignItems="center">
        <Text fontSize="xl" fontWeight="semibold">Aulas</Text>
        <Grid gap={6} pt={5} templateColumns={{ base: "repeat(auto-fill, minmax(250px, 1fr))", md: "repeat(auto-fill, minmax(350px, 1fr))" }}>
          {props.classes.map(classItem => <ClassListItem classItem={classItem} />)}
        </Grid>
      </Flex>
    </Flex>
  )
}