// ** React & Next Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

// Type for the API response
type BestMonthResponse = {
  month: string
  revenue: number
}

const Trophy = () => {
  const theme = useTheme()
  const router = useRouter()

  const [month, setMonth] = useState<string>('Loading...')
  const [revenue, setRevenue] = useState<number | null>(null)

  const navigateToOrders = () => {
    router.push('/orders')
  }

  useEffect(() => {
    const fetchBestMonth = async () => {
      try {
        const response = await axios.get<BestMonthResponse>(
          'https://back.mekuva.com/api/public/best-month-revenue'
        )

        setMonth(response.data.month)
        setRevenue(response.data.revenue)
      } catch (error) {
        console.error('Error fetching best month revenue:', error)
        setMonth('Unavailable')
      }
    }

    fetchBestMonth()
  }, [])

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>{`Best Month: ${month}`}</Typography>

        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Congratulations Rajkumar! 🚀
        </Typography>

        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {revenue !== null ? `₹${revenue.toLocaleString()}` : 'Loading...'}
        </Typography>

        <Button size='small' variant='contained' onClick={navigateToOrders}>
          View Sales
        </Button>

        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
