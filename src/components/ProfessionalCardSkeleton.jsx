import { Flex, Divider, Box } from '@chakra-ui/react'
import { SkeletonCircle, SkeletonText } from "@chakra-ui/react"

export default function ProfessionalCardSkeleton() {

  return (
    <Flex bgColor="white" direction="column" p={2.5} borderRadius="md">
      <Flex>
        <SkeletonCircle size="10" />
        <Flex direction="column" width="full" p={3}>
          <Flex justify="space-between" width="full" align="center">
            <SkeletonText noOfLines={1} />
          </Flex>
          <Box>
            <SkeletonText noOfLines={1} />
          </Box>
        </Flex>
      </Flex>

      <Divider my="3" />

      <SkeletonText noOfLines={5} />
    </Flex>
  )
}