import { TextField, InputAdornment } from '@mui/material'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { GlobalContext } from '../contexts/Context'

interface Props {
  iconStart: React.ReactElement
  label: string
}

export const IconTextField = ({
  iconStart,
  label,
}: Props): React.ReactElement => {
  const globalCtx = useContext(GlobalContext)

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    globalCtx.setCurrentSearch(searchValue)
  }, [searchValue])

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchValue(e.currentTarget.value)
    },
    []
  )

  return (
    <TextField
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ),
      }}
      variant="outlined"
      onChange={changeHandler}
    />
  )
}
