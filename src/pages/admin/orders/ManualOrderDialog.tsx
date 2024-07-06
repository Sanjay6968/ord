import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent,
  Typography,
  Grid
} from '@mui/material';
import { TechnologyDropdown } from 'src/layouts/components/TechnologyDropdown';
import { MaterialDropdown, getMaterialOptions } from 'src/layouts/components/MaterialDropdown';
import { ColorFinishDropdown, colorOptions } from 'src/layouts/components/ColorFinishDropdown';

interface ManualOrderDialogProps {
  open: boolean;
  onClose: () => void;
}

const ManualOrderDialog: React.FC<ManualOrderDialogProps> = ({ open, onClose }) => {
  const [orderData, setOrderData] = useState({
    customer: '',
    phone: '',
    price: '',
    delivery_type: 'Standard',
    expert_assistance: 'Not Required',
    customer_name: '',
    email: '',
    address: '',
    pincode: '',
    status: '',
    technology: 'FDM',
    material: 'PLA',
    layerThickness: 'Normal - 0.2mm',
    printer: 'STANDARD 220x200x220mm',
    infill: 10,
    colorFinish: 'White',
    quantity: 1,
    gstNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleCreateOrder = () => {
    console.log('New Order Data:', orderData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Create Manual Order</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Customer Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="customer"
                label="Customer Name"
                type="text"
                fullWidth
                value={orderData.customer}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={orderData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="phone"
                label="Phone Number"
                type="text"
                fullWidth
                value={orderData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="price"
                label="Price"
                type="number"
                fullWidth
                value={orderData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="status"
                label="Status"
                type="text"
                fullWidth
                value={orderData.status}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Customization</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Technology</InputLabel>
                <Select
                  value={orderData.technology}
                  onChange={handleSelectChange}
                  name="technology"
                  label="Technology"
                >
                  {['FDM', 'SLA', 'SLS', 'DLP', 'MJF'].map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Material</InputLabel>
                <Select
                  value={orderData.material}
                  onChange={handleSelectChange}
                  name="material"
                  label="Material"
                >
                  {getMaterialOptions(orderData.technology).map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Layer Thickness</InputLabel>
                <Select
                  value={orderData.layerThickness}
                  onChange={handleSelectChange}
                  name="layerThickness"
                  label="Layer Thickness"
                >
                  {['Ultra Fine - 0.12mm', 'Fine - 0.16mm', 'Normal - 0.2mm', 'Draft - 0.3mm'].map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Printer</InputLabel>
                <Select
                  value={orderData.printer}
                  onChange={handleSelectChange}
                  name="printer"
                  label="Printer"
                >
                  {['STANDARD 220x200x220mm', 'MEDIUM 400x400x400mm', 'LARGE 600x600x600mm'].map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="infill"
                label="Infill"
                type="number"
                fullWidth
                value={orderData.infill}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 0, max: 100, step: 10 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <ColorFinishDropdown
                  options={colorOptions.getColorFinishOptions(orderData.technology, orderData.material)}
                  value={orderData.colorFinish}
                  onChange={(value) => setOrderData({ ...orderData, colorFinish: value })}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Delivery Options</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Delivery Type</InputLabel>
                <Select
                  value={orderData.delivery_type}
                  onChange={handleSelectChange}
                  name="delivery_type"
                  label="Delivery Type"
                >
                  {['Standard', 'Express'].map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="address"
                label="Address"
                type="text"
                fullWidth
                value={orderData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="pincode"
                label="Pincode"
                type="text"
                fullWidth
                value={orderData.pincode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={2}>
          <Typography variant="h6" gutterBottom>Checkout Options</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="quantity"
                label="Quantity"
                type="number"
                fullWidth
                value={orderData.quantity}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="gstNumber"
                label="GST Number"
                type="text"
                fullWidth
                value={orderData.gstNumber}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreateOrder} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManualOrderDialog;
