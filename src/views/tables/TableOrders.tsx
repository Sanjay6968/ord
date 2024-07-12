import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import OrderDetailsDialog from 'src/pages/admin/orders/OrderDetailsDialog';

interface ApiOrder {
    orderId: string;
    name: string;
    mobileNo: string;
    deliveryType: string;
    totalFinalAmount: number;
    status: string;
}

interface Order {
    id: string;
    orderId: string;
    customer: string;
    phone: string; 
    totalFinalAmount: number;
    delivery_type: string;
    status: string;
}

const columns: GridColDef[] = [
    { field: 'orderId', headerName: 'Order ID', flex: 1 },
    { field: 'customer', headerName: 'Customer Name', flex: 1 },
    { field: 'phone', headerName: 'Mobile No.', flex: 1 },
    { field: 'totalFinalAmount', headerName: 'Final Amount', flex: 1 },
    { field: 'delivery_type', headerName: 'Delivery', flex: 1 },
    {
        field: 'status',
        headerName: 'Order Status',
        flex: 1,
        renderCell: (params) => {
            const statusColors: { [key: string]: 'error' | 'success' | 'warning' | 'info' } = {
                confirmed: 'warning',
                printingScheduled: 'info',
                inProduction: 'info',
                postProcessing: 'info',
                dispatch: 'info',
                delivered: 'success',
                cancelled: 'error',
            };
            const color = statusColors[params.value.toLowerCase() as keyof typeof statusColors] || 'default';

            return <Chip label={params.value} color={color} />;
        },
    },
];

interface TableOrdersProps {
    orders: Order[];
    updateOrderStatus: (id: string, newStatus: string) => void;
}

export default function DataTable({ orders, updateOrderStatus }: TableOrdersProps) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const handleRowClick = (params: GridRowParams) => {
        setSelectedOrderId(params.row.id);
        setDialogOpen(true);
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
                    orderId={selectedOrderId}
                    updateOrderStatus={updateOrderStatus}
                />
            )}
        </div>
    );
}
