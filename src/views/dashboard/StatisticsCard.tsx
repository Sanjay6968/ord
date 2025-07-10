import React, { useEffect, useState } from 'react'

// ** MUI Imports
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar
} from '@mui/material'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import ArrowUp from 'mdi-material-ui/ChevronUp'
import ArrowDown from 'mdi-material-ui/ChevronDown'

// ** Types
interface StateSales {
  stateCode: string
  stateName: string
  amount: number
  change: number
  sales: string
  color: string
}

const SalesByStateCard = () => {
  const [data, setData] = useState<StateSales[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const res = await fetch('https://back.mekuva.com/api/public/sales-by-state')
        const result = await res.json()
        setData(result)
      } catch (err) {
        console.error('Failed to fetch sales data', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSalesData()
  }, [])

  return (
    <Card>
      <CardHeader
        title='Sales by State'
        action={
          <IconButton size='small' aria-label='settings'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
        {loading ? (
          <Typography variant='body2'>Loading...</Typography>
        ) : (
          <List>
            {data.map((item, index) => (
              <ListItem key={index} disableGutters sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: item.color, color: 'white', fontSize: '0.875rem' }}>
                      {item.stateCode}
                    </Avatar>
                  </ListItemAvatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontWeight: 600, mr: 1 }}>
                        ₹{item.amount.toLocaleString()}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: item.change >= 0 ? 'green' : 'red' }}>
                        {item.change >= 0 ? <ArrowUp fontSize='small' /> : <ArrowDown fontSize='small' />}
                        <Typography variant='body2'>{Math.abs(item.change)}%</Typography>
                      </Box>
                    </Box>
                    <Typography variant='body2' color='text.secondary'>
                      {item.stateName}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {item.sales} <span style={{ color: '#888' }}>Sales</span>
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  )
}

export default SalesByStateCard
