// src/layouts/UserLayout.tsx

import { ReactNode } from 'react'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// Layout and Config Imports
import VerticalLayout from 'src/@core/layouts/VerticalLayout'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import { useSettings } from 'src/@core/hooks/useSettings'
import useNavigation from 'src/navigation/vertical'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  const { settings, saveSettings } = useSettings()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // 🧠 Dynamic nav based on userId
  const navItems = useNavigation()

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={navItems}
      verticalAppBarContent={props => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
    </VerticalLayout>
  )
}

export default UserLayout
