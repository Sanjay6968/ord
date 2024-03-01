import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Grid, Typography, Select, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { useState } from 'react';

interface Order {
    date: string;
    orderNo: string;
    product: string;
    customer: string;
    amount: number;
    status: string;
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
          <Grid item xs={12} sm={4}>
            <img src="https://picsum.photos/200/300" alt="Order Item" style={{ maxWidth: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>Date: {order.date}</Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>Order Number: {order.orderNo}</Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>Product: {order.product}</Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>Customer: {order.customer}</Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              Amount: {order.amount.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
              Status: 
              <Select
                value={status}
                onChange={handleStatusChange}
                style={{ marginLeft: '10px' }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="OnHold">OnHold</MenuItem>
              </Select>
            </Typography>
            <TextField label = "Notes" variant = "outlined" fullWidth multiline rows={4} style={{ marginTop :'10px'}}/>
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
