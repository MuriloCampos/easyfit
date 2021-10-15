import { Flex, Text, Grid, Icon, Select, Input } from '@chakra-ui/react'

import ProfessionalCard from "./ProfessionalCard"
import ProfessionalCardSkeleton from './ProfessionalCardSkeleton'

const SKELETON_ARRAY = [1,2,3,4,5,6,7,8,9,10,11,12]

export default function ProfessionalsList({ professionals, isLoading }) {
  if (professionals && professionals.length === 0) {
    return (
      <Flex minHeight="lg" align="center" justify="center">
        <Text fontSize="2xl" fontWeight="extrabold">Nenhum profissional encontrado</Text>
      </Flex>
    )
  }

  return (
    <Grid gap={6} pt={5} templateColumns={{ base: "repeat(auto-fill, minmax(250px, 1fr))", md: "repeat(auto-fill, minmax(350px, 1fr))" }}>
      {isLoading || !professionals ? (
        SKELETON_ARRAY.map(skeleton => <ProfessionalCardSkeleton key={skeleton} />)
      ) : professionals.map(professional => (
        <ProfessionalCard key={professional.id} professional={professional} />
      ))}
    </Grid>
  )
}