import Home from './pages/Home'
import Cart from './pages/Cart'

// other
import { FC } from 'react'

// interface
interface Route {
  key: string
  title: string
  path: string
  enabled: boolean
  component: FC<{}>
}

export const routes: Array<Route> = [
  {
    key: 'home-route',
    title: 'Home',
    path: '/',
    enabled: true,
    component: Home,
  },
  {
    key: 'cart-route',
    title: 'Cart',
    path: '/cart',
    enabled: true,
    component: Cart,
  },
]
