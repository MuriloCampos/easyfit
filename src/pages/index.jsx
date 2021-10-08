import { Flex } from '@chakra-ui/react'

import HomeCard from '../components/HomeCard'
import { useContext } from 'react';
import { UserContext } from '../lib/context'

export default function Home() {
    const { user } = useContext(UserContext)
    const dataList = [
        {
            id: "1",
            product: "Encontre um profissional para te ajudar a evoluir em seus treinos",
            summary: "Profissionais certificados com horários flexíveis",
            longLine: "This is a very long description"
        },
        {
            id: "2",
            product: "Encontre alunos para aplicar seus treinos",
            summary: "Centralize todo o seu planejamento de aulas em um lugar só",
            longLine: "This is a very long description"
        },
    ]

  return (
    <Flex direction={{ base: "column", md: "row" }} justify="space-evenly" minH="100vh">
        {dataList.map(({id, product, summary, longLine}) => (
            <HomeCard key={id} summary={summary} product={product} longLine={longLine} isSignUpEnabled={!!user} />
        ))}
    </Flex>
  )
}
