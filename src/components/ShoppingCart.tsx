import { Badge } from '@mui/material'
import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

interface Props {
  number: number
}

export const ShoppingCart = ({ number }: Props): React.ReactElement => {
  return (
    <Badge badgeContent={number} color="error">
      <ShoppingCartOutlinedIcon color="action" />
    </Badge>
  )
}
