import { TextField, InputAdornment } from '@mui/material'
import React from 'react'

interface Props {
  iconStart: React.ReactElement
  label: string
}

export const IconTextField = ({
  iconStart,
  label,
}: Props): React.ReactElement => {
  return (
    <TextField
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ),
      }}
      variant="outlined"
    />
  )
}
