import React, { useCallback, useState } from 'react'
import { Props as ItemCardProps } from '../components/ItemCard'

interface Props {
  children?: React.ReactNode
}
interface AppContext {
  currentCartNumber: number
  incrementNumber: (infos: ItemCardProps) => void
  decrementNumber: () => void
  cartArray: ItemCardProps[]
  setCurrentSearch: (value: string) => void
  currentSearchValue: string
}

export const GlobalContext = React.createContext<AppContext>({
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

  const incrementNumber = (addedItem: ItemCardProps): void => {
    const updatedArray = [...cartArray]
    updatedArray.push(addedItem)
    setCartArray(updatedArray)
    setCurrentNumber(currentNumber + 1)
  }

  const decrementNumber = (): void => {
    setCurrentNumber(currentNumber - 1)
  }
  const setCurrentSearch = useCallback((value: string): void => {
    setCurrentSearchValue(value)
  }, [])

  const contextValue = {
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
