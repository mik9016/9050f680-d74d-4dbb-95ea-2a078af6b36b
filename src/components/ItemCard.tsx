import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  CardHeader,
  Button,
  Avatar,
  Typography,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import React, { useContext } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { GlobalContext } from '../contexts/Context'

export interface Props {
  bandName: string
  avatar: string
  picture: string
  venue: string
  venueName: string
  start: string
  end: string
}

const ItemCard = ({
  bandName,
  avatar,
  picture,
  venue,
  start,
  venueName,
  end,
  ref,
}: Props & { ref?: React.Ref<HTMLDivElement> }): React.ReactElement => {
  const globalCtx = useContext(GlobalContext)

  const infos = {
    bandName: bandName,
    avatar: avatar,
    picture: picture,
    venue: venue,
    start: start,
    venueName: venueName,
    end: end,
  }
  const incrementCartNumber = () => {
    globalCtx.incrementNumber(infos)
  }
  const startDate = new Date(start)
  const endDate = new Date(end)

  const noPicUrl = 'https://picsum.photos/200/300'

  return (
    <Card
      ref={ref}
      sx={{
        width: { xs: 310, md: 345 },
        height: 400,
        margin: { xs: 0, md: 2 },
        my: { xs: 1 },
      }}
    >
      <CardHeader
        avatar={<Avatar alt="Avatar" src={avatar} />}
        title={bandName}
      />
      <CardMedia
        component="img"
        height="140"
        image={picture ? picture : noPicUrl}
        alt="picture"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Button target="_blank" href={venue} rel="noopener">
            {' '}
            <LocationOnIcon color="primary" />
            {venueName}{' '}
          </Button>
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="text.secondary"
          component="div"
        >
          {`| Starts: ${startDate.getDate()}.${
            startDate.getMonth() + 1
          }.${startDate.getFullYear()},  ${startDate.getHours()}:${
            startDate.getMinutes() === 0 ? '00' : startDate.getMinutes()
          }`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`| Ends: ${endDate.getDate()}.${
            endDate.getMonth() + 1
          }.${endDate.getFullYear()},  ${endDate.getHours()}:${
            endDate.getMinutes() === 0 ? '00' : endDate.getMinutes()
          }`}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add" onClick={incrementCartNumber}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ItemCard
