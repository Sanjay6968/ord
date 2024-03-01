import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ItemDetailsDialog = ({ open, onClose, item }: { open: boolean, onClose: () => void, item: any }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Item Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          SKU: {item.sku}<br />
          Name: {item.itemName}<br />
          Category: {item.category}<br />
          Quantity in Stock: {item.quantityInStock}<br />
          Reorder Level: {item.reorderLevel}<br />
          Price per Unit: ${item.pricePerUnit}<br />
          Supplier: {item.supplier}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDetailsDialog;