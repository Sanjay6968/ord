// src/navigation/vertical/index.ts

import { useAuth } from '@clerk/nextjs'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatListBulleted from 'mdi-material-ui/FormatListBulleted'
import PackageVariant from 'mdi-material-ui/PackageVariant'
import Printer3dNozzle from 'mdi-material-ui/Printer3dNozzle'
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import CurrencyRupee from 'mdi-material-ui/CurrencyRupee'

const useNavigation = (): VerticalNavItemsType => {
  const { isLoaded, userId } = useAuth()

  if (!isLoaded || !userId) return []

  const userPaths: Record<string, string> = {
    user_2jgefoBMl5FxEaM3XIvdf2QOd6t: '/admin/orders',
    user_2h30mxeNsmKAObdfguTUZZoaj7B: '/sales/orders',
    user_2jgen6hu0iAWBEGuDXlJPuSMniR: '/production/orders',
    user_2jgeuZp4FUyEIn1OcRHN4qXamxe: '/dispatch/orders',
    user_2jgnmC3TJOIoQA52LNJMjx2XgZB: '/post-production/orders'
  }

  const ordersPath = userPaths[userId]
  if (!ordersPath) return []

  return [
    { title: 'Dashboard', icon: HomeOutline, path: '/' },
    { sectionTitle: 'Navigation Menu' },
    { title: 'Orders', icon: FormatListBulleted, path: ordersPath },
    { title: 'Inventory', icon: PackageVariant, path: '/inventory' },
    { title: 'Print Queue', icon: Printer3dNozzle, path: '/queue' },
    { title: 'Customers', icon: AccountMultiple, path: '/customers' },
    { title: 'Financials', icon: CurrencyRupee, path: '/financials' }
  ]
}

export default useNavigation
