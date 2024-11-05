import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import * as React from 'react'

export default function Loading() {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="inherit" />
    </Stack>
  )
}
