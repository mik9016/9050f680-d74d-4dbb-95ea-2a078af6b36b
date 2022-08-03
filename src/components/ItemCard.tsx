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
  id?: string
  bandName: string
  avatar: string
  picture: string
  venue: string
  venueName: string
  start: string
  end: string
  hidePlus?: boolean
}

const ItemCard = ({
  id,
  bandName,
  avatar,
  picture,
  venue,
  start,
  venueName,
  end,
  ref,
  hidePlus,
}: Props & { ref?: React.Ref<HTMLDivElement> }): React.ReactElement => {
  const globalCtx = useContext(GlobalContext)

  const infos = {
    id: id,
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

  const showDate = (date: Date): string => {
    return `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()},  ${date.getHours()}:${
      date.getMinutes() === 0 ? '00' : date.getMinutes()
    }`
  }

  const noPicUrl = 'https://picsum.photos/200/300'

  return (
    <Card
      ref={ref}
      sx={{
        width: { xs: 310, md: 345 },
        height: 400,
        margin: { xs: 0, md: 2 },
        my: { xs: 1 },
        mx: { xs: 1 },
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
          {`| Starts: ${showDate(startDate)}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`| Ends: ${showDate(endDate)}`}
        </Typography>
      </CardContent>
      <CardActions>
        {!hidePlus ? (
          <IconButton aria-label="add" onClick={incrementCartNumber}>
            <AddCircleIcon color="primary" />
          </IconButton>
        ) : null}
      </CardActions>
    </Card>
  )
}

export default ItemCard
