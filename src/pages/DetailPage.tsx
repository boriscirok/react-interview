import { useHistory } from 'react-router-dom'
import { QueryFunctionContext } from '@tanstack/react-query'
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography
} from '@mui/material'
import { useQuery } from 'react-query'
import { useHttp } from 'hooks/http.hook'
import { Character } from 'api/types'
import { useParams } from 'react-router-dom'

export const DetailPage = () => {
  const { request } = useHttp()
  const { id } = useParams<{ id: string }>()
  const fetchCharacter = async ({ queryKey }: QueryFunctionContext) => {
    const data: Character = await request(`https://rickandmortyapi.com/api/character/${queryKey[1]}`)
    return data
  }
  const history = useHistory()
  const { isLoading, isIdle, error, data } = useQuery<Character, Error>(['character', id], fetchCharacter)
  if (isLoading || isIdle) return <Skeleton variant="rectangular" width={210} height={118} />
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
    )
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={data.image} title={data.name} />
      <CardContent>
        <Typography gutterBottom={true} variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography gutterBottom={true} variant="h5" component="div">
          {data.gender}
        </Typography>
        <Typography gutterBottom={true} variant="h5" component="div">
          {data.status}
        </Typography>
        <Typography gutterBottom={true} variant="h5" component="div">
          {data.species}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.episode.map(episode => {
            return <li key={episode}>{episode}</li>
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={() => history.push('/')}>
          Return
        </Button>
      </CardActions>
    </Card>
  )
}
