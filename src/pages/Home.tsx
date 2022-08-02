import React, {
  useEffect,
  useState,
  Suspense,
  Ref,
  ReactNode,
  useContext,
} from 'react'
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  ListItem,
  List,
} from '@mui/material'
import axios from 'axios'
import { DataItem } from '../models/index'
import { useInView } from 'react-intersection-observer'
import { GlobalContext } from '../contexts/Context'

const ItemCard = React.lazy(() => import('../components/ItemCard'))

interface Count {
  [key: string]: number
}

const Home = (): React.ReactElement => {
  const globalCtx = useContext(GlobalContext)

  const [data, setData] = useState<Array<DataItem[]> | []>([])
  const [dataLen, setDataLen] = useState(0)
  const [date, setDate] = useState<string>('0')
  const [searchFilteredArrays, setSearchFilteredArrays] = useState<
    Array<DataItem[]> | []
  >([])
  const [searchValues, setSearchValues] = useState<Array<React.ReactNode> | []>(
    []
  )

  const getData = async () => {
    const url = 'https://tlv-events-app.herokuapp.com/events/uk/london'

    const { data } = await axios.get(url)

    const sortedData = sortEvents(data)

    const dateArrays = sortToArrays(sortedData, 'date')
    setDataLen(dateArrays.length)
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

  const filterEvents = (data: Array<DataItem[]>): DataItem[] => {
    const newData = [...data]
    const filteredArr = []
    for (let i = 0; i < newData.length; i++) {
      for (let j = 0; j < newData[i].length; j++) {
        if (
          newData[i][j].title
            .toUpperCase()
            .includes(globalCtx.currentSearchValue.toUpperCase())
        ) {
          filteredArr.push(newData[i][j])
        }
      }
    }
    return sortEvents(filteredArr)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const searchFiltered = filterEvents(data)
    const sortedSearch = sortToArrays(searchFiltered, 'date')
    setSearchFilteredArrays(sortedSearch)
    const searchDataToShow = showBetterData(sortedSearch.length, sortedSearch)
    setSearchValues(searchDataToShow)
  }, [globalCtx.currentSearchValue])

  ////// InView
  const setDateFromString = (str: string): string => {
    const newDate = new Date(str)
    return `${newDate.getDate()}.${
      newDate.getMonth() + 1
    }.${newDate.getFullYear()}`
  }
  // const refArr2 = []
  // for (let i = 0; i < dataLen; i++) {
  //   const map: { [key: string]: string } = {}

  //   map['myTextA'] = 'Hello!'
  //   map['myTextB'] = 'Goodbye!'
  //   var textList = ['A', 'B']
  //   console.log('I want to say ' + map['myText' + textList[0]])

  //   refArr2.push()
  // }

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

  const dataShow = (
    refName: Ref<HTMLDivElement>,
    index: number,
    data: Array<DataItem[]>
  ): ReactNode => {
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

  const showBetterData = (
    range: number,
    data: Array<DataItem[]>
  ): Array<React.ReactNode> => {
    const result = []
    for (let i = 0; i < range; i++) {
      result.push(dataShow(refArr[i], i, data))
    }
    return result
  }

  const dataLoaded = data.length > 0
  const checkPosition = (
    inViewFlag: boolean,
    index: number,
    data: DataItem[][]
  ): void => {
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
    const isTyping = globalCtx.currentSearchValue.length > 0
    if (isTyping) {
      for (let i = 0; i < searchFilteredArrays.length; i++) {
        checkPosition(inViews[i], i, searchFilteredArrays)
      }
    } else {
      for (let i = 0; i < inViews.length; i++) {
        checkPosition(inViews[i], i, data)
      }
    }
  }, [inViews])

  const getDayName = (dateStr: string, locale: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale, { weekday: 'long' })
  }

  const dataToShow = showBetterData(data.length, data)

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
        ml={{ xs: 0, md: 10 }}
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
        <Suspense fallback={<CircularProgress color="primary" />}>
          <List>
            {globalCtx.currentSearchValue.length > 0 ? (
              searchValues.length === 0 ? (
                <Typography variant="body1">No Items found</Typography>
              ) : (
                searchValues.map((searchItem, idx) => {
                  return <ListItem key={idx}>{searchItem}</ListItem>
                })
              )
            ) : (
              dataToShow.map((item, idx) => {
                return <ListItem key={idx}>{item}</ListItem>
              })
            )}
          </List>
        </Suspense>
      </Box>
    </>
  )
}

export default Home
