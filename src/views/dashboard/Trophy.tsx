// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

// React & Next
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Styled components
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = () => {
  const theme = useTheme()
  const router = useRouter()

  const [revenue, setRevenue] = useState<number | null>(null)
  const [month, setMonth] = useState<string>('')

  const navigateToOrders = () => {
    router.push('/sales/orders')
  }

  useEffect(() => {
    const fetchBestMonth = async () => {
      try {
        const response = await axios.get('https://back.mekuva.com/api/public/best-month-revenue')
        setRevenue(response.data.revenue)
        setMonth(response.data.month)
      } catch (error) {
        console.error('Error fetching best month data:', error)
      }
    }

    fetchBestMonth()
  }, [])

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>
          {month ? `Best Month: ${month}` : 'Loading...'}
        </Typography>

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
