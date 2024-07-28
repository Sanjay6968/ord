// MUI Imports
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import AutorenewIcon from 'mdi-material-ui/Autorenew';

import TableOrders from 'src/views/tables/TableOrders';
import ManualOrderDialog from 'src/pages/admin/orders/ManualOrderDialog';

const Orders = () => {
  const [manualOrderDialogOpen, setManualOrderDialogOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const handleOpenManualOrderDialog = () => {
    setManualOrderDialogOpen(true);
  };

  const handleCloseManualOrderDialog = () => {
    setManualOrderDialogOpen(false);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MEKUVA_BACKEND_API_BASE_URL}/api/private/orders`);
      const data = await response.json();
      const mappedOrders = data.map((order: { orderId: any; name: any; mobileNo: any; totalFinalAmount: any; deliveryType: any; status: any; }) => ({
        id: order.orderId,
        orderId: order.orderId,
        customer: order.name || 'N/A',
        phone: order.mobileNo || 'N/A',
        totalFinalAmount: order.totalFinalAmount || 0,
        delivery_type: order.deliveryType || 'N/A',
        status: order.status,
      }));
      console.log('Fetched orders:', mappedOrders);
      setOrders(mappedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
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
          <CardHeader 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Latest Orders</span>
                <IconButton onClick={fetchOrders} color="secondary">
                  <AutorenewIcon />
                </IconButton>
              </div>
            } 
            titleTypographyProps={{ variant: 'h6' }}
          />

          <TableOrders orders={orders} updateOrderStatus={updateOrderStatus} />
        </Card>
      </Grid>

      <ManualOrderDialog open={manualOrderDialogOpen} onClose={handleCloseManualOrderDialog} />
    </Grid>
  )
}

export default Orders;
