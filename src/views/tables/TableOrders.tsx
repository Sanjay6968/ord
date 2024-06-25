import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import OrderDetailsDialog from 'src/pages/orders/OrderDetailsDialog';

interface ApiOrder {
  _id: string;
  orderId: string;
  deliveryInstructions: {
    cname: string;
    phone: string;
    deliveryType: string;
  };
  printPrices: {
    totalFinalAmount: number;
  };
  status: string;
}

interface Order {
  id: string; // Mapped from _id
  orderId: string;
  customer: string; // Mapped from deliveryInstructions.cname
  phone: string;
  price: number;
  delivery_type: string;
  status: string;
}

const columns: GridColDef[] = [
  { field: 'orderId', headerName: 'Order ID', flex: 1 },
  { field: 'customer', headerName: 'Customer Name', flex: 1 },
  { field: 'phone', headerName: 'Mobile No.', flex: 1 },
  { field: 'price', headerName: 'Final Amount', flex: 1 },
  { field: 'delivery_type', headerName: 'Delivery', flex: 1 },
  {
    field: 'status',
    headerName: 'Order Status',
    flex: 1,
    renderCell: (params) => {
      const statusColors: { [key: string]: 'error' | 'success' | 'warning' | 'info' } = {
        pending: 'warning',
        completed: 'success',
        cancelled: 'error',
        onHold: 'info',
      };
      const color = statusColors[params.value.toLowerCase() as keyof typeof statusColors] || 'default';
      
      return <Chip label={params.value} color={color} />;
    },
  },
  
];

export default function DataTable() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/private/orders');
        const data: ApiOrder[] = await response.json();
        const mappedOrders = data.map((order) => ({
          id: order.orderId,
          orderId: order.orderId,
          customer: order.deliveryInstructions?.cname || 'N/A',
          phone: order.deliveryInstructions?.phone || 'N/A',
          price: order.printPrices?.totalFinalAmount || 0,
          delivery_type: order.deliveryInstructions?.deliveryType || 'N/A',
          status: order.status,
        }));
        
        setOrders(mappedOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
 }, []);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedOrderId(params.row.id); // Use the order ID to fetch details
    
    setDialogOpen(true);
  };

  const updateOrderStatus = (id: string, newStatus: string) => {
    // Implement the logic to update the order status
    // This function should ideally make an API call to update the status in the backend
    // For now, it just updates the state locally
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
 };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={orders}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowClick={handleRowClick}
      />
      
      {selectedOrderId && (
        <OrderDetailsDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          orderId={selectedOrderId} // Pass the selected order ID
          updateOrderStatus={updateOrderStatus}
        />
      )}
    </div>
  );
}
