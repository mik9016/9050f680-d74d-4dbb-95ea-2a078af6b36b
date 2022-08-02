import React, {
  useEffect,
  useState,
  Suspense,
  useRef,
  Ref,
  createRef,
  RefObject,
  ReactNode,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import axios from 'axios'
import { DataItem } from '../models/index'
import { useInView } from 'react-intersection-observer'
const ItemCard = React.lazy(() => import('../components/ItemCard'))

interface Count {
  [key: string]: number
}
interface Refs {
  [key: string]: React.Ref<HTMLDivElement>
}

const Home = (): React.ReactElement => {
  const [data, setData] = useState<Array<DataItem[]> | []>([])
  const [date, setDate] = useState('0')

  const getData = async () => {
    const url = 'https://tlv-events-app.herokuapp.com/events/uk/london'

    const { data } = await axios.get(url)

    const sortedData = sortEvents(data)

    const dateArrays = sortToArrays(sortedData, 'date')

    setData(dateArrays)
  }

  const sortToArrays = (ar: DataItem[], field: string): Array<DataItem[]> => {
    const count: Count = {}
    const countArrays: Array<DataItem[]> = []
    // create count object
    ar.forEach((element: any) => {
      count[element[field]] = (count[element[field]] || 0) + 1
    })
    //create right number of arrays
    for (let i = 0; i < Object.keys(count).length; i++) {
      countArrays.push([])
    }
    // push elements to the separate arrays
    ar.forEach((element: any) => {
      for (let i = 0; i < Object.keys(count).length; i++) {
        if (Object.keys(count)[i] === element.date) {
          countArrays[i].push(element)
        }
      }
    })

    return countArrays
  }

  const sortEvents = (ar: DataItem[]): DataItem[] => {
    const sorted = [...ar]
    return sorted.sort((a: DataItem, b: DataItem) => {
      const dateA = new Date(a.startTime).getTime()
      const dateB = new Date(b.startTime).getTime()
      return dateA - dateB
    })
  }

  useEffect(() => {
    getData()
  }, [])

  ////// InView
  const setDateFromString = (str: string): string => {
    const newDate = new Date(str)
    return `${newDate.getDate()}.${
      newDate.getMonth() + 1
    }.${newDate.getFullYear()}`
  }
  const [ref0, inView0] = useInView()
  const [ref1, inView1] = useInView()
  const [ref2, inView2] = useInView()
  const [ref3, inView3] = useInView()
  const [ref4, inView4] = useInView()
  const [ref5, inView5] = useInView()
  const [ref6, inView6] = useInView()
  const [ref7, inView7] = useInView()
  const [ref8, inView8] = useInView()
  const [ref9, inView9] = useInView()
  const [ref10, inView10] = useInView()
  const [ref11, inView11] = useInView()
  const [ref12, inView12] = useInView()

  const refArr = [
    ref0,
    ref1,
    ref2,
    ref3,
    ref4,
    ref5,
    ref6,
    ref7,
    ref8,
    ref9,
    ref10,
    ref11,
    ref12,
  ]

  const dataShow = (refName: Ref<HTMLDivElement>, index: number): ReactNode => {
    return (
      <Box
        ref={refName}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: 'xl',
          minWidth: '100vw',
          alignSelf: 'center',
          mt: 7,
          border: '1px red solid',
        }}
      >
        {data.length > 0 &&
          data[index].map((item, idnx) => {
            return (
              <ItemCard
                key={item['_id']}
                bandName={item['title']}
                avatar={item['flyerFront']}
                picture={item['flyerFront']}
                start={item['startTime']}
                end={item['endTime']}
                venueName={item['venue']['name']}
                venue={item['venue']['direction']}
              />
            )
          })}
      </Box>
    )
  }
  const showBetterData = (range: number) => {
    const result = []
    for (let i = 0; i < range; i++) {
      result.push(dataShow(refArr[i], i))
    }
    return result
  }

  const dataLoaded = data.length > 0
  const checkPosition = (inViewFlag: boolean, index: number): void => {
    if (dataLoaded) {
      if (inViewFlag) {
        const currentDate = setDateFromString(data[index][0].startTime)
        setDate(`${getDayName(data[index][0].startTime, 'eng')} ${currentDate}`)
      }
    }
  }
  const inViews = [
    inView0,
    inView1,
    inView2,
    inView3,
    inView4,
    inView5,
    inView6,
    inView7,
    inView8,
    inView9,
    inView10,
    inView11,
    inView12,
  ]
  useEffect(() => {
    for (let i = 0; i < inViews.length; i++) {
      checkPosition(inViews[i], i)
    }
  }, [inViews])

  const getDayName = (dateStr: string, locale: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale, { weekday: 'long' })
  }

  const dataToShow = showBetterData(data.length)

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          alignSelf: 'center',
          position: 'fixed',
          zIndex: 4,
          width: '100%',
          mt: 10,
          py: 2,
          px: 5,
        }}
      >
        <Typography variant="h5" color="primary" ml={5}>
          {date}
        </Typography>
      </Paper>
      <Typography
        variant="h4"
        mt="12rem"
        ml={10}
        color="black"
        fontWeight="fontWeightBold"
      >
        Public Events
      </Typography>
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
        <Suspense fallback={<CircularProgress />}>
          {dataToShow.map((item) => {
            return  item 
          })}
        </Suspense>
      </Box>
    </>
  )
}

export default Home
