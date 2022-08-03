import React, { useCallback, useState } from 'react'
import { Props as ItemCardProps } from '../components/ItemCard'
import { DataItem } from '../models/index'

interface Props {
  children?: React.ReactNode
}
interface AppContext {
  data: Array<DataItem[]>
  cacheData: (data: Array<DataItem[]>) => void
  currentCartNumber: number
  incrementNumber: (infos: ItemCardProps) => void
  decrementNumber: () => void
  cartArray: ItemCardProps[]
  setCurrentSearch: (value: string) => void
  currentSearchValue: string
}

export const GlobalContext = React.createContext<AppContext>({
  data: [],
  cacheData: () => {},
  currentCartNumber: 0,
  incrementNumber: () => {},
  decrementNumber: () => {},
  cartArray: [],
  setCurrentSearch: () => {},
  currentSearchValue: '',
})

const GlobalContextProvider: React.FC<Props> = (props) => {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [currentSearchValue, setCurrentSearchValue] = useState('')
  const [cartArray, setCartArray] = useState<ItemCardProps[]>([])
  const [dataContext, setDataContext] = useState<Array<DataItem[]>>([])

  const incrementNumber = (addedItem: ItemCardProps): void => {
    const updatedArray = [...cartArray]
    updatedArray.push(addedItem)
    setCartArray(updatedArray)
    setCurrentNumber(currentNumber + 1)
  }

  const decrementNumber = (): void => {
    setCurrentNumber(currentNumber - 1)
  }

  const cacheDataContext = useCallback((data: Array<DataItem[]>): void => {
    setDataContext(data)
  }, [])

  const setCurrentSearch = useCallback((value: string): void => {
    setCurrentSearchValue(value)
  }, [])

  const contextValue = {
    data: dataContext,
    cacheData: cacheDataContext,
    currentCartNumber: currentNumber,
    incrementNumber: incrementNumber,
    decrementNumber: decrementNumber,
    cartArray: cartArray,
    setCurrentSearch: setCurrentSearch,
    currentSearchValue: currentSearchValue,
  }
  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
