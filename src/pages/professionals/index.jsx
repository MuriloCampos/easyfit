import { useCallback, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Flex, Icon, Select, Input } from '@chakra-ui/react'
import { FiSearch } from "react-icons/fi";
import debounce from 'lodash.debounce';
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";

import ProfessionalsList from '../../components/ProfessionalsList';
import { getProfessionals, getSports, getProfessionalByFilter } from '../../lib/api';

export default function Professionals (props) {
  const ITEMS_PER_PAGE = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [professionals, setProfessionals] = useState(props.professionals.data)
  const { pages, pagesCount } = usePagination({
    total: professionals.totalCount ?? props.professionals.totalCount,
    initialState: { pageSize: ITEMS_PER_PAGE, currentPage: 1 }
  });
  const { sports } = props
  const [name, setName] = useState('')
  const [sport, setSport] = useState('')
  const isQueryEnabled = name !== '' || sport !== ''
  const { data: unfilteredProfessionals, isLoading: isLoadingUnfilteredProfessionals } = useQuery(['professionals', { page: currentPage }], getProfessionals, { enabled: currentPage !== 1 })
  const { data, isLoading } = useQuery(['filteredProfessionals', { name, sport, page: 1 }], getProfessionalByFilter, { enabled: isQueryEnabled })

  useEffect(() => {
    if (!isQueryEnabled) {
      setProfessionals(props.professionals)
      setCurrentPage(1)
    }
    if (isQueryEnabled && data && !isLoading) {
      setProfessionals(data)
    }
  }, [data, isLoading, props.professionals, isQueryEnabled])

  useEffect(() => {
    if (!isQueryEnabled && currentPage !== 1 && unfilteredProfessionals && !isLoadingUnfilteredProfessionals) {
      setProfessionals(unfilteredProfessionals)
    }
  }, [isQueryEnabled, currentPage, unfilteredProfessionals, isLoadingUnfilteredProfessionals])

  useEffect(() => {
    if (currentPage === 1) {
      setProfessionals(props.professionals)
    }
  }, [currentPage, props.professionals])

  const handleNameChange = event => {
    setName(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <ProfessionalsList professionals={professionals.data} isLoading={isLoading || isLoadingUnfilteredProfessionals} />
      
      <Flex justify="center" mt={5}>
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={e => {
            setCurrentPage(e)
          }}
        >
          <PaginationContainer>
            <PaginationPrevious>Anterior</PaginationPrevious>
            <PaginationPageGroup>
              {pages.map((page) => (
                <PaginationPage 
                  key={`pagination_page_${page}`} 
                  page={page} 
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext>Proxima</PaginationNext>
          </PaginationContainer>
        </Pagination>
      </Flex>
    </Flex>
  )
}

export async function getServerSideProps() {
  const professionals = await getProfessionals()
  const sports = await getSports()

  return {
    props: { professionals, sports }
  };
}