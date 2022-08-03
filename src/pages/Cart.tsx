import { v4 as uuidv4 } from 'uuid'
import React, { ReactElement, FC, useContext } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { GlobalContext } from '../contexts/Context'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import ItemCard from '../components/ItemCard'
import { Link } from 'react-router-dom'

const Cart: FC = (): ReactElement => {
  const globalCtx = useContext(GlobalContext)

  return (
    <>
      <Link to="/">
        <Button
          sx={{ alignSelf: 'start', margin: 2, textDecoration: 'none',marginTop:12 }}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Go Back
        </Button>
      </Link>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          maxWidth: 'xl',
          alignSelf: 'center',
        }}
      >
        {globalCtx.cartArray.map((item, idx) => {
            return (
              <ItemCard
                key={uuidv4()}
                bandName={item.bandName}
                avatar={item.avatar}
                picture={item.picture}
                start={item.start}
                end={item.end}
                venueName={item.venueName}
                venue={item.venue}
                hidePlus={true}
              />
            )
        })}
        {globalCtx.cartArray.length === 0 &&  <Typography variant="body1">No Items found</Typography>}
      </Box>
    </>
  )
}

export default Cart
