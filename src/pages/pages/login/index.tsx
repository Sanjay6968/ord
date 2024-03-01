// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="60" height="70" viewBox="0 0 284 321" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_dd_92_4)">
                  <path d="M142 9L14 82.6667V230.333L142 304.333L270 230.333V82.6667L142 9ZM205 118L144 82.6667V16.879L264.333 84L205 118ZM80.6667 123.667L140 158V226.333L80.6667 192V123.667ZM144 157.667L203.333 123.333V191.667L144 226.333V157.667ZM142 154.333L112.333 137.333L82.6667 120.333L142 86L201.333 120.333L142 154.333ZM140 82.6667L79 118L19.6667 84L140 16.879V82.6667ZM77 121.333V192L19.6667 225L17.6667 87L77 121.333ZM78.6667 195.333L140 230.667V297L21 229.5L78.6667 195.333ZM144 230.667L205.333 195.333L264.5 229L144 297V230.667ZM207 192V121.333L266.333 87L264.667 225L207 192Z" fill="#FED700"/>
                  <path d="M142 9L14 82.6667V230.333L142 304.333L270 230.333V82.6667L142 9ZM205 118L144 82.6667V16.879L264.333 84L205 118ZM80.6667 123.667L140 158V226.333L80.6667 192V123.667ZM144 157.667L203.333 123.333V191.667L144 226.333V157.667ZM142 154.333L112.333 137.333L82.6667 120.333L142 86L201.333 120.333L142 154.333ZM140 82.6667L79 118L19.6667 84L140 16.879V82.6667ZM77 121.333V192L19.6667 225L17.6667 87L77 121.333ZM78.6667 195.333L140 230.667V297L21 229.5L78.6667 195.333ZM144 230.667L205.333 195.333L264.5 229L144 297V230.667ZM207 192V121.333L266.333 87L264.667 225L207 192Z" stroke="#FED700" stroke-width="15"/>
                </g>
                <g filter="url(#filter1_d_92_4)">
                  <path d="M14 228.481V81.078L82.6667 120.043L112.333 137.043L142 154.043L201.333 120.043L270 81.078V230.043M146.5 160L80.6667 123.377L17.6667 86.71V228.481M137 160L203.333 123.377L266.333 86.71V230.043" stroke="#123CB4" stroke-width="20"/>
                </g>
                <path d="M267.163 81.4221L263.533 81.7403L264.974 84.6494L267.572 83.026L267.163 81.4221Z" fill="#123CB4" stroke="#123CB4"/>
                <path d="M20.461 81.7403L16.8635 81.4286L16.5908 83.026L19.1882 84.3247L20.461 81.7403Z" fill="#123CB4" stroke="#123CB4"/>
                <defs>
                  <filter id="filter0_dd_92_4" x="0.428711" y="0.346619" width="283.284" height="320.65" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_92_4"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_92_4" result="effect2_dropShadow_92_4"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_92_4" result="shape"/>
                  </filter>
                  <filter id="filter1_d_92_4" x="0" y="63.9056" width="284" height="174.138" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_92_4"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_92_4" result="shape"/>
                  </filter>
                </defs>
              </svg>

            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Staff Login
            </Typography>

            <Typography variant='body2'>Please sign-in to your Mekuva authorized account.</Typography>
          </Box>

          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} />

            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>

              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />

              <LinkStyled passHref href='/' onClick={e => e.preventDefault()}>
                Forgot Password?
              </LinkStyled>
            </Box>

            <Button
              fullWidth
              size='large'
              variant='contained'
              onClick={() => router.push('/')}
            >
              Login
            </Button>

            <Divider sx={{ my: 5 }}></Divider>

            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => router.push('/')}
            >
              Sign in with
              <svg width="24px" height="24px" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 8 }}>
                <g>
                  <path d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451" fill="#4285F4"></path>
                  <path d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1" fill="#34A853"></path>
                  <path d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37" fill="#FBBC05"></path>
                  <path d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479" fill="#EB4335"></path>
                </g>
              </svg>
            </Button>
          </form>
        </CardContent>
      </Card>

      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
