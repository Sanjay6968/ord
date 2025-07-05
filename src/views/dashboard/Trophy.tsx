import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

// Styled images
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
  const [loading, setLoading] = useState(true)

  const fetchRevenue = async () => {
    try {
      const res = await fetch('https://back.mekuva.com/api/public/monthly-revenue')
      const data = await res.json()
      setRevenue(data.revenue)
    } catch (err) {
      console.error('Failed to fetch revenue:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRevenue()
  }, [])

  const navigateToOrders = () => {
    router.push('/sales/orders')
  }

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Congratulations Rajkumar!</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Best month of the year
        </Typography>

        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          ₹{loading ? '...' : revenue?.toLocaleString() ?? '0'}
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
