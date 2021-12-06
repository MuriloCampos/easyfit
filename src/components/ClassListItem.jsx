import { Flex, Button, Heading, Text, Avatar, useDisclosure, Divider, Box, Badge } from '@chakra-ui/react'
import { format } from 'date-fns'

export default function ClassListItem(props) {
  const { classItem } = props

  return (
    <>
      {/* <Flex direction="column">
        <Text fontWeight="semibold">{classItem.professional.user.name}</Text>
        <Flex>
          <Text>{classItem.sport.name}</Text>
          <Text>{format(new Date(classItem.datetime), 'dd/MM/yyyy')}</Text>
        </Flex>
      </Flex> */}

      <Flex bgColor="white" p={2.5} borderRadius="md">
        <Avatar name={classItem.professional.user.name} src={classItem.professional.user.avatar_url} size="md" />
        <Flex direction="column" width="full" ml={3} alignItems="flex-start">
          <Text fontWeight="semibold">{classItem.professional.user.name}</Text>
          <Badge colorScheme="green">{classItem.sport.name}</Badge>
          <Text mt="1.5">{format(new Date(classItem.datetime), 'dd/MM/yyyy HH:mm')}</Text>
        </Flex>
      </Flex>
    </>
  )
}