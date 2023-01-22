import { useHistory } from 'react-router-dom'
import { Character } from '../api/types'
import { CharacterCard } from '../components/CharacterCard'
import { FilterCard } from 'components/FilterCard'
import { useHttp } from 'hooks/http.hook'
import { useQuery } from 'react-query'
import { useAppSelector } from 'hooks/useAppSelector'
import { MouseEvent } from 'react'
import { Alert, AlertTitle, Box, Button, Skeleton } from '@mui/material'
import { useTypeDispatch } from 'hooks/useTypeDispatch'
import { changeStatusActiveFilter, changeGenderActiveFilter } from 'store/reducers/filter'

type requestType = {
  info: {
    count: number
    pages: number
    next: string
    prev: string
  }
  results: Character[]
}

export const ListPage = () => {
  const { activeStatus, activeGender, status, gender } = useAppSelector(state => state.filter)
  const dispatch = useTypeDispatch()
  const { request } = useHttp()

  const fetchCharacters = async () => {
    let query
    if (activeStatus === 'All' && activeGender === 'All') {
      query = ''
    } else if (activeStatus === 'All' && activeGender !== 'All') {
      query = `?gender=${activeGender}`
    } else if (activeStatus !== 'All' && activeGender === 'All') {
      query = `?status=${activeStatus}`
    } else {
      query = `?&status=${activeStatus}&gender=${activeGender}`
    }
    const data: requestType = await request(`https://rickandmortyapi.com/api/character${query}`)
    return data
  }
  const history = useHistory()

  const { isLoading, isIdle, error, data, refetch } = useQuery<requestType, Error>('characters', fetchCharacters)

  const handleChangeStatus = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
    dispatch(changeStatusActiveFilter(newAlignment))
  }
  const handleChangeGender = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
    dispatch(changeGenderActiveFilter(newAlignment))
  }

  if (isLoading || isIdle) return <Skeleton variant="rectangular" width={210} height={118} />
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
    )
  }

  const handleCharacterClick = (id: number) => {
    history.push(`/detail/${id}`)
  }

  return (
    <>
      <FilterCard filter={gender} alignment={activeGender} onChange={handleChangeGender} />
      <FilterCard filter={status} alignment={activeStatus} onChange={handleChangeStatus} />
      <Box sx={{ m: 2 }}>
        <Button variant="contained" onClick={() => refetch()}>
          Apply
        </Button>
      </Box>
      {data.results.map(item => {
        return <CharacterCard key={item.id} character={item} onClick={handleCharacterClick} />
      })}
    </>
  )
}
