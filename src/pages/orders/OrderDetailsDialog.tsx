import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Grid, Typography, Select, MenuItem, SelectChangeEvent, TextField, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';

interface Order {
    date: string;
    orderNo: string;
    product: string;
    customer: string;
    amount: number;
    status: string;
    technologyUsed: string;
    materialUsed: string;
    layerThickness: string;
    deliveryType: string;
    customerName: string;
    customerAddress: string;
    customerEmail: string;
    customerPhone: string;
}

interface OrderDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    order: Order;
    updateOrderStatus: (orderNo: string, status: string) => void;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({ open, onClose, order, updateOrderStatus }) => {
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    updateOrderStatus(order.orderNo, newStatus);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xl" PaperProps={{ style: { maxHeight: '90vh' } }}>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers={true}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img src="https://picsum.photos/200/300" alt="Order Item" style={{ maxWidth: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={6}>
                <Typography gutterBottom variant="h6">Order Information</Typography>
                <Typography variant="body1">Date: {order.date}</Typography>
                <Typography variant="body1">Order Number: {order.orderNo}</Typography>
                <Typography variant="body1">Product: {order.product}</Typography>
                <Typography variant="body1">Customer: {order.customer}</Typography>
                <Typography variant="body1">
                  Amount: {order.amount.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                </Typography>

                <Typography gutterBottom variant="h6">Delivery Instructions</Typography>
                <Typography variant="body1">Delivery Type: {order.deliveryType}</Typography>
                <Typography variant="body1">Customer Name and Address: {order.customerName} - {order.customerAddress}</Typography>
                <Typography variant="body1">Contact Information: {order.customerEmail} - {order.customerPhone}</Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography gutterBottom variant="h6">Print Information</Typography>
                <Typography variant="body1">Technology Used: {order.technologyUsed}</Typography>
                <Typography variant="body1">Material Used: {order.materialUsed}</Typography>
                <Typography variant="body1">Layer Thickness: {order.layerThickness}</Typography>
              
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                    <MenuItem value="OnHold">OnHold</MenuItem>
                  </Select>
                </FormControl>
              
              
                <TextField
                  label="Notes"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  style={{ marginTop: '1rem' }}
                />
              </Grid>
            </Grid>
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
