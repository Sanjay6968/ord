// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { useState } from 'react'

import TableOrders from 'src/views/tables/TableOrders'
import ManualOrderDialog from 'src/pages/admin/orders/ManualOrderDialog' // Import the dialog component

const Orders = () => {
  const [manualOrderDialogOpen, setManualOrderDialogOpen] = useState(false);

  const handleOpenManualOrderDialog = () => {
    setManualOrderDialogOpen(true);
  };

  const handleCloseManualOrderDialog = () => {
    setManualOrderDialogOpen(false);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>
            Orders
          </Link>
        </Typography>

        <Typography variant='body2'>You can find all orders here</Typography>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleOpenManualOrderDialog}>
          Create Manual Order
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Latest Orders' titleTypographyProps={{ variant: 'h6' }} />

          <TableOrders />
        </Card>
      </Grid>

      <ManualOrderDialog open={manualOrderDialogOpen} onClose={handleCloseManualOrderDialog} />
    </Grid>
  )
}

export default Orders
