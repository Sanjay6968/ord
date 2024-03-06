// ** Icon imports
// import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
// import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
// import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import FormatListBulleted from 'mdi-material-ui/FormatListBulleted'
import PackageVariant from 'mdi-material-ui/PackageVariant'
import Printer3dNozzle from 'mdi-material-ui/Printer3dNozzle'
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import CurrencyRupee from 'mdi-material-ui/CurrencyRupee'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Navigation Menu'
    },
    {
      title: 'Orders',
      icon: FormatListBulleted,
      path: '/orders'
    },
    {
      title: 'Inventory',
      path: '/inventory',
      icon: PackageVariant
    },
    {
      title: 'Print Queue',
      icon: Printer3dNozzle,
      path: '/queue'
    },
    {
      title: 'Customers',
      icon: AccountMultiple,
      path: '/customers'
    },
    {
      icon: CurrencyRupee,
      title: 'Financials',
      path: '/financials'
    },

    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // }
    
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
