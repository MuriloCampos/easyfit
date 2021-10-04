import { useCallback, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Flex, Text, Grid, Icon, Select, Input } from '@chakra-ui/react'
import { FiSearch } from "react-icons/fi";
import debounce from 'lodash.debounce';

import { getProfessionals, getSports, getProfessionalByFilter } from '../../lib/api';
import ProfessionalCard from "../../components/ProfessionalCard"

export default function Professionals (props) {
  const [professionals, setProfessionals] = useState(props.professionals)
  const { sports } = props
  const [name, setName] = useState('')
  const [sport, setSport] = useState('')
  const isQueryEnabled = name !== '' || sport !== ''
  const { data, isLoading } = useQuery(['professionals', { name, sport }], getProfessionalByFilter, { enabled: isQueryEnabled })

  useEffect(() => {
    if (!isQueryEnabled) {
      setProfessionals(props.professionals)
    }
    if (isQueryEnabled && data && !isLoading) {
      setProfessionals(data)
    }
  }, [name, data, isLoading, props.professionals, isQueryEnabled])

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const debouncedHandleNameChange = useCallback(
    debounce(handleNameChange, 500)
  , []);

  const handleSportChange = event => {
    setSport(event.target.value);
  };

  return (
    <Flex p={5} direction="column">
      <Flex alignSelf="center" width={{ base: "100%", md: "40%" }} bgColor="white" p={3.5} borderRadius="lg" align="center">
        <Icon as={FiSearch} mr="3" color="gray.400" />
        <Input placeholder="Nome" variant="unstyled" onChange={debouncedHandleNameChange} />
        <Select width={{ base: "50%", md: "30%" }} ml="auto" variant="unstyled" placeholder="Esporte" color="gray.400" onChange={handleSportChange}>
          {sports.map(sport => <option key={sport.id} value={sport.id}>{sport.name}</option>)}
        </Select>
      </Flex>
      <Grid gap={6} pt={5} templateColumns={{ base: "repeat(auto-fill, minmax(250px, 1fr))", md: "repeat(auto-fill, minmax(350px, 1fr))" }}>
        {professionals.map(professional => (
            <ProfessionalCard key={professional.id} professional={professional} />
        ))}
      </Grid>
    </Flex>
  )
}

export async function getStaticProps() {
  const professionals = await getProfessionals()
  const sports = await getSports()

  return {
    props: { professionals, sports },
    revalidate: 5000,
  };
}