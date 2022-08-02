import React, { FC, ReactElement, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Toolbar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { GlobalContext } from '../contexts/Context'

import { IconTextField } from './IconTextField'
import { ShoppingCart } from './ShoppingCart'

const Navbar = (): React.ReactElement => {
  const globalCtx = useContext(GlobalContext)

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        padding: 1,
        paddingLeft: 3,
        backgroundColor: 'primary.main',
        position: 'fixed',
        zIndex: '4',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconTextField label="Search" iconStart={<SearchIcon />} />
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginLeft: 'auto',
                paddingLeft: '1rem',
              }}
            >
              <Link to={'/cart'}>
                <ShoppingCart number={globalCtx.currentCartNumber} />
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  )
}

export default Navbar
