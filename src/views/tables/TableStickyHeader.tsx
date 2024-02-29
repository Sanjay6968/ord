import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

const statusColors: { [key: string]: 'error' | 'success' | 'warning' | 'info'} = {
  Pending: 'warning',
  Completed: 'success',
  Cancelled: 'error',
  OnHold: 'info',
};

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'orderNo', headerName: 'Order Number', flex: 1 },
  { field: 'product', headerName: 'Product', flex: 1 },
  { field: 'customer', headerName: 'Customer', flex: 1 },
  { 
    field: 'amount', 
    headerName: 'Amount', 
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.value.toLocaleString('en-US')}`,
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 1,
    renderCell: (params) => {
      
      const color = statusColors[params.value as keyof typeof statusColors] || 'default';
      
      return <Chip label={params.value} color={color} />;
      
    },
  },
];

const rows = [
  { id: 1, date: '2024-02-28', orderNo: 'OR001', product: 'Product A', customer: 'Customer 1', amount: 100, status: 'Pending' },
  { id: 2, date: '2024-02-27', orderNo: 'OR002', product: 'Product B', customer: 'Customer 2', amount: 200, status: 'Completed' },
  { id: 3, date: '2024-02-26', orderNo: 'OR003', product: 'Product C', customer: 'Customer 3', amount: 150, status: 'Pending' },
  { id: 4, date: '2024-02-25', orderNo: 'OR004', product: 'Product D', customer: 'Customer 4', amount: 300, status: 'OnHold' },
  { id: 5, date: '2024-02-24', orderNo: 'OR005', product: 'Product E', customer: 'Customer 5', amount: 400, status: 'Cancelled' },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
