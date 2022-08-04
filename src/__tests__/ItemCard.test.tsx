import React from 'react'
import { act, create } from 'react-test-renderer'
import ItemCard from '../components/ItemCard'

test(`renders ItemCard without crashing`, async () => {
  const img = '../logo.svg'
  const root = create(
    <ItemCard
      id="item['_id']"
      bandName="item['title']"
      avatar={img}
      picture={img}
      start="item['startTime']"
      end="item['endTime']"
      venueName="item['venue']['name']"
      venue="item['venue']['direction']"
      hidePlus={false}
    />
  )

  expect(root.toJSON()).toMatchSnapshot()

  act(() => {
    root.unmount()
  })
})
