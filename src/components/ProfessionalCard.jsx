import { Flex, Divider, Icon, Button, Avatar, Box, Badge, Text } from '@chakra-ui/react'
import { FiHeart } from "react-icons/fi";

import { useContext } from 'react';
import { UserContext } from '../lib/context'

export default function ProfessionalCard(props) {
  const { user } = useContext(UserContext)

  if(!user) {
    // TEMPORARY: Just to use the user's avatar while we dont save the user avatar URL to the database (to be done in the forms)
    return <div>loading...</div>
  }

  return (
    <Flex bgColor="white" direction="column" p={2.5} borderRadius="md">
      <Flex>
        <Avatar name={props.professional.user.name} src={user.photoURL} size="xl" />
        <Flex direction="column" width="full" p={3}>
          <Flex justify="space-between" width="full" align="center">
            <Text fontSize="xl" fontWeight="semibold">{props.professional.user.name}</Text>
            <Icon as={FiHeart} />
          </Flex>
          <Box>
            {props.professional.expertise.map(expertise => 
              <Badge key={expertise.id} mr="2">{expertise.name}</Badge>
            )}
          </Box>
        </Flex>
      </Flex>

      <Divider my="3" />

      <Text color="gray.500">{props.professional.bio}</Text>

      <Box ml="auto" mt="3">
        <Button mr="2" colorScheme="blue">Agendar</Button>
        <Button variant="outline" colorScheme="blue">Perfil</Button>
      </Box>
    </Flex>
  )
}