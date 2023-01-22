import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'

type Props = {
  filter: string[]
  alignment: string
  onChange: (event: React.MouseEvent<HTMLElement>, newAlignment: string) => void
}

export const FilterCard = ({ filter, onChange, alignment }: Props) => {
  return (
    <Box sx={{ m: 2 }}>
      <ToggleButtonGroup color="primary" value={alignment} exclusive={true} onChange={onChange} aria-label="Platform">
        {filter.map(item => {
          return (
            <ToggleButton value={item} key={item}>
              {item}
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    </Box>
  )
}
