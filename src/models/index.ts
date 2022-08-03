export interface ArtistDataItem {
  id: string
  name: string
  _id: { $oid: string }
}

export interface VenueData {
  id: string
  name: string
  ontentUrl: string
  live: boolean
  direction: string
}

export interface DataItem {
  artists: ArtistDataItem[]
  attending: number
  city: string
  contentUrl: string
  country: string
  date: string
  endTime: string
  flyerFront: string
  private: false
  startTime: string
  title: string
  venue: VenueData
  __v: number
  _id: string
}

export interface Count {
  [key: string]: number
}
