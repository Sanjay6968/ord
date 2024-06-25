import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { CircularProgress, Grid, Typography, TextField, Card, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material';

interface ApiOrderDetails {
  customization: {
    technology: string;
    material: string;
    colorFinish: string;
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
  dimensions: {
    breadth: number;
    height: number;
    length: number;
    volume: number;
  };
  printPrices: {
    unitProductionPrice: number;
    unitPostProductionPrice: number;
    subtotal: number;
    taxAmount: number;
    totalFinalAmount: number;
    shippingPrice: number;
  };
  _id: string;
  orderId: string;
  filePath: string;
  originalFileName: string;
  quantity: number;
  status: string;
  progress: string;
  tokenUsed: boolean;
  __v: number;
  uploadToken: string;
  statusNotes: string[];
  createdAt: string;
  updatedAt: string;
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
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/private/orders/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: { order: ApiOrderDetails, thumbnailUrl: string } = await response.json();
        const validDate = isValidDate(data.order.createdAt) ? new Date(data.order.createdAt).toISOString() : 'Invalid date';
        data.order.createdAt = validDate;
        setOrderDetails(data.order);
        setThumbnailUrl(data.thumbnailUrl);
        setStatus(data.order.status);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId && open) {
      fetchOrderDetails();
    }
  }, [orderId, open]);

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
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

  const formatCreationTime = (createdAt: string) => {
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>
        Order #{orderId}
        <Typography variant="subtitle1" color="textSecondary">
          Created on: {formatCreationTime(orderDetails.createdAt)}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Order Item</Typography>
                    <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: isMobile ? 'column' : 'row', justifyContent: isMobile ? 'flex-start' : 'space-between' }}>
                      <div>
                        <Typography variant="h5" gutterBottom>{orderDetails.originalFileName}</Typography>
                        {isMobile && thumbnailUrl && (
                          <img src={thumbnailUrl} alt="Thumbnail" style={{ maxWidth: '150px', height: 'auto', marginTop: '8px', marginBottom: '8px' }} />
                        )}
                        <Typography>Technology: {orderDetails.customization?.technology || 'N/A'}</Typography>
                        <Typography>Material: {orderDetails.customization?.material || 'N/A'}</Typography>
                        <Typography>Color Finish: {orderDetails.customization?.colorFinish || 'N/A'}</Typography>
                        <Typography>Dimensions: {orderDetails.dimensions?.length || 0} mm x {orderDetails.dimensions?.breadth || 0} mm x {orderDetails.dimensions?.height || 0} mm</Typography>
                        <Typography>Volume: {orderDetails.dimensions?.volume || 0} mm³</Typography>
                      </div>
                      {!isMobile && thumbnailUrl && (
                        <img src={thumbnailUrl} alt="Thumbnail" style={{ maxWidth: '150px', height: 'auto', marginLeft: '16px' }} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Order Summary</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography>Unit Production Price:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">₹{orderDetails.printPrices?.unitProductionPrice || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Unit Post Production Price:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">₹{orderDetails.printPrices?.unitPostProductionPrice || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Subtotal:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">₹{orderDetails.printPrices?.subtotal || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Tax Amount:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">₹{orderDetails.printPrices?.taxAmount || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Shipping Price:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">₹{orderDetails.printPrices?.shippingPrice || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" fontWeight="bold">Total Final Amount:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right" fontWeight="bold">₹{orderDetails.printPrices?.totalFinalAmount || 0}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <FormControl fullWidth>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        value={status}
                        onChange={handleStatusChange}
                        label="Status"
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                        <MenuItem value="onHold">On Hold</MenuItem>
                      </Select>
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Notes</Typography>
                    <TextField
                      label="Note"
                      multiline
                      fullWidth
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      variant="outlined"
                      margin="normal"
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Customers</Typography>
                    <Typography>Name: {orderDetails.deliveryInstructions?.cname || 'N/A'}</Typography>
                    <Typography>Email: {orderDetails.deliveryInstructions?.email || 'N/A'}</Typography>
                    <Typography>Phone: {orderDetails.deliveryInstructions?.phone || 'N/A'}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Contact Information</Typography>
                    <Typography>Email: {orderDetails.deliveryInstructions?.email || 'N/A'}</Typography>
                    <Typography>Phone: {orderDetails.deliveryInstructions?.phone || 'N/A'}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Shipping Address</Typography>
                    <Typography>Address: {orderDetails.deliveryInstructions?.address || 'N/A'}</Typography>
                    <Typography>Pincode: {orderDetails.deliveryInstructions?.pincode || 'N/A'}</Typography>
                    <Typography>Shipping Method: {orderDetails.deliveryInstructions?.shippingMethod || 'N/A'}</Typography>
                  </CardContent>
                </Card>
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
