import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

interface ApiOrderDetails {
  customization: {
    technology: string;
    material: string;
    layerThickness: string;
    filling: number;
    colorFinish: string;
    scale: number;
    printerOption: string;
  };
  deliveryInstructions: {
    deliveryType: string;
    cname: string;
    address: string;
    pincode: string;
    expertAssistance: string;
    email: string;
    phone: string;
    shippingMethod: string;
  };
  printInfo: {
    filamentWeight: number;
    printTime: number;
  };
  printPrices: {
    printByWeight: number;
    printByTime: number;
    colorPrice: number;
    printProduction: number;
    finalProductionPrice: number;
    printPostProduction: number;
  };
  _id: string;
  orderId: string;
  filePath: string;
  quantity: number;
  status: string;
  progress: string;
  tokenUsed: boolean;
  __v: number;
  uploadToken: string;
}

interface OrderDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
  updateOrderStatus: (orderId: string, newStatus: string) => void;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  open,
  onClose,
  orderId,
  updateOrderStatus,
}) => {
  const [orderDetails, setOrderDetails] = useState<ApiOrderDetails | null>(null);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/private/orders/${orderId}`, {
          method: 'GET', // Optional: method is GET by default
          headers: {
            'Content-Type': 'application/json',
            // Include other headers as required, e.g., authorization headers
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ApiOrderDetails = await response.json();
        setOrderDetails(data);
        setStatus(data.status);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
        // Optionally handle the error state here, e.g., showing an error message
      } finally {
        setLoading(false);
      }
    };

    if (orderId && open) {
      fetchOrderDetails();
    }
  }, [orderId, open]);

  const handleStatusChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    // Optionally update the status on the server side here
    updateOrderStatus(orderId, newStatus);
  };

  if (loading || !orderDetails) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          {loading ? <CircularProgress /> : "Order details not available."}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Order Details - {orderId}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Example of displaying some details */}
          <Grid item xs={12}>
            <Typography>Technology: {orderDetails.customization.technology}</Typography>
            {/* Display other order details as needed */}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={handleStatusChange}>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="OnHold">OnHold</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
