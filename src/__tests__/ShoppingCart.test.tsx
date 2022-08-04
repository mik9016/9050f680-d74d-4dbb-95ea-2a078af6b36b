import React from 'react'

import { act, create } from 'react-test-renderer'

import { ShoppingCart } from '../components/ShoppingCart'

test(`renders ShoppingCart without crashing`, async () => {
  const root = create(<ShoppingCart number={5} />)

  expect(root.toJSON()).toMatchSnapshot()

  act(() => {
    root.unmount()
  })
})
