import React from 'react'

import { act, create } from 'react-test-renderer'

import Navbar from '../components/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'

test(`renders Navbar without crashing`, async () => {
  const root = create(
    <Router>
      <Navbar />
    </Router>
  )

  expect(root.toJSON()).toMatchSnapshot()

  act(() => {
    root.unmount()
  })
})
