import React, { useEffect, useState } from 'react';
import useOrders from '../../hooks/useOrders';
import DataTable from '../../components/tables/DataTable';
import Modal from '../../components/ui/Modal';
import { Search, Calendar, ArrowRight, Eye, Mail, Phone, ShoppingCart, Download } from 'lucide-react';
import { Order, OrderStatus } from '../../types';

export const OrdersPage: React.FC = () => {
  const { orders, loading, fetchOrders, changeOrderStatus } = useOrders(true);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [dateFilter, setDateFilter] =   useState("30");

  // Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // KPI Calculations
  const totalCount = orders.length;
  const pendingCount = orders.filter(o => o.orderStatus === 'PENDING').length;
  const processingCount = orders.filter(o => o.orderStatus === 'PROCESSING').length;
  const deliveredCount = orders.filter(o => o.orderStatus === 'DELIVERED').length;
  const cancelledCount = orders.filter(o => o.orderStatus === 'CANCELLED').length;

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await changeOrderStatus(orderId, newStatus);
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsModalOpen(true);
  };
  const exportOrdersReport = () => {
  const rows = orders.flatMap((order) => {
    return order.orderItems.map((item) => ({
      OrderNumber: order.orderNumber,
      CustomerName:
        order.user?.name || "",
      Email:
        order.user?.email || "",
      Phone:
        order.user?.phoneNumber ||
        order.phoneNumber,
      OrderStatus:
        order.orderStatus,
      OrderDate:
        new Date(
          order.createdAt
        ).toLocaleDateString(),
      ProductName:
        item.productName,
      FrameSize:
        item.frameSize,
      MountType:
        item.mountType,
      GlassType:
        item.glassType,
      Quantity:
        item.quantity,
      Price:
        item.price,
      Subtotal:
        item.subtotal,
      OrderTotal:
        order.totalAmount,
    }));
  });
  if (!rows.length) {
    alert("No orders found");
    return;
  }
  const csv = [
    Object.keys(rows[0]).join(","),
    ...rows.map((row) =>
      Object.values(row)
        .map((value) => `"${value}"`)
        .join(",")
    ),
  ].join("\n");
  const blob = new Blob(
    [csv],
    {
      type: "text/csv;charset=utf-8;",
    }
  );
  const url =
    window.URL.createObjectURL(
      blob
    );
  const link =
    document.createElement("a");
  link.href = url;
  link.download =
    `orders-report-${Date.now()}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};

  const getCustomerName = (order: Order) => order.user?.name || 'Unknown Customer';
  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch =
    o.orderNumber
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    getCustomerName(o)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "all"
      ? true
      : o.orderStatus === statusFilter;
    const orderDate =new Date(o.createdAt);
    const today =  new Date();
    const daysDifference = (today.getTime() - orderDate.getTime()) /
  (1000 * 60 * 60 * 24);
   const matchesDate = dateFilter === "all" ? true : daysDifference <= Number(dateFilter);
    return ( matchesSearch &&   matchesStatus &&   matchesDate
);
  });

  const getDropdownStyles = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
      case 'CONFIRMED':
        return 'bg-surface-container-highest text-on-surface';
      case 'PROCESSING':
      case 'SHIPPED':
        return 'bg-primary-container text-on-primary-container';
      case 'DELIVERED':
        return 'bg-tertiary-container text-on-tertiary-container';
      case 'CANCELLED':
        return 'bg-error-container text-on-error-container';
      default:
        return 'bg-surface text-on-surface';
    }
  };

  const getCustomerAddress = (order: Order) =>
  [
    order.addressLine,
    order.cityName,
    order.stateName,
    order.countryName,
    order.postalCode,
  ]
    .filter(Boolean)
    .join(', ') || 'No address';
  const getCustomerEmail = (order: Order) => order.user?.email || 'No email';
  const getCustomerPhone = (order: Order) => order.user?.phoneNumber || order.phoneNumber;
  const getItemsCount = (order: Order) =>
    order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const getVariantName = (item: Order['orderItems'][number]) =>
    `${item.frameSize} (${item.mountType? 'Border' : 'No Border'}, ${item.glassType ? 'Glass' : 'No Glass'})`;

  const headers = [
    { key: 'id', label: 'Order ID', w: '24' },
    { key: 'customer', label: 'Customer Details' },
    { key: 'phone', label: 'Phone' },
    { key: 'items', label: 'Items', align: 'right' as const },
    { key: 'amount', label: 'Amount', align: 'right' as const },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Order Date' },
    { key: 'actions', label: 'Actions', align: 'right' as const },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">Orders Management</h2>
          <p className="text-sm text-secondary mt-1">View, track, and manage all customer orders.</p>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-secondary uppercase">Total Orders</span>
            <ShoppingCart className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-xl font-bold text-on-surface">{totalCount.toLocaleString('en-US')}</div>
          <div className="text-[10px] text-tertiary mt-1 flex items-center gap-0.5">
            <span className="font-semibold"></span> Total orders
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-secondary uppercase">Pending</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          </div>
          <div className="text-xl font-bold text-on-surface">{pendingCount}</div>
          <div className="text-[10px] text-secondary mt-1">Requires review</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-secondary uppercase">Processing</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          </div>
          <div className="text-xl font-bold text-on-surface">{processingCount}</div>
          <div className="text-[10px] text-secondary mt-1">In fulfillment</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-secondary uppercase">Delivered</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          </div>
          <div className="text-xl font-bold text-on-surface">{deliveredCount}</div>
          <div className="text-[10px] text-secondary mt-1">Completed</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-secondary uppercase">Cancelled</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
          </div>
          <div className="text-xl font-bold text-on-surface">{cancelledCount}</div>
          <div className="text-[10px] text-secondary mt-1">Refunded</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-outline-variant bg-surface-bright flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="flex items-center bg-surface border border-outline-variant rounded-lg px-3 py-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 w-full sm:w-64 transition-all">
              <Search className="w-4 h-4 text-outline-variant mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-xs text-on-surface placeholder:text-outline-variant/80 p-0 focus:ring-0"
                placeholder="Order ID, Customer, Phone..."
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative w-full sm:w-40">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-1.5 text-xs text-on-surface focus:border-primary outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            {/* Mock Calendar Date */}
         <div className="flex items-center gap-3">

  <div className="relative flex items-center">
    <Calendar className="absolute left-3 w-4 h-4 text-outline-variant pointer-events-none" />

    <select
      value={dateFilter}
      onChange={(e) =>
        setDateFilter(e.target.value)
      }
      className="h-10 pl-10 pr-8 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface outline-none"
    >
      <option value="7">
        Last 7 Days
      </option>

      <option value="30">
        Last 30 Days
      </option>

      <option value="90">
        Last 90 Days
      </option>

      <option value="365">
        Last 1 Year
      </option>

      <option value="all">
        All Time
      </option>
    </select>
  </div>
  <button onClick={exportOrdersReport} className="px-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold hover:bg-surface transition-colors flex items-center gap-1.5">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
</div>
          </div>
        </div>

        {/* Orders Table */}
        <DataTable
          headers={headers}
          items={filteredOrders}
          loading={loading}
          emptyTitle="No orders found"
          emptyMessage="No customer orders match your search filters. Try selecting a different status."
          
          // Desktop Row Renderer
          renderRow={(order) => (
            <tr key= {order.orderNumber} className="border-b border-outline-variant hover:bg-surface/30 transition-colors group">
              <td 
                onClick={() => openOrderDetails(order)}
                className="px-6 py-4 font-semibold text-primary cursor-pointer hover:underline"
              >
                 {order.orderNumber}
              </td>
              <td className="px-6 py-4">
                <div className="font-semibold text-on-surface">{getCustomerName(order)}</div>
                <div className="text-[11px] text-secondary mt-0.5">{getCustomerEmail(order)}</div>
                <div className="text-[10px] text-secondary mt-0.5">{getCustomerAddress(order)}</div>
              </td>
              <td className="px-6 py-4 text-on-surface-variant">{getCustomerPhone(order)}</td>
              <td className="px-6 py-4 text-right font-medium">{getItemsCount(order)}</td>
              <td className="px-6 py-4 text-right font-bold text-on-surface">₹{Number(order.totalAmount).toFixed(2)}</td>
              <td className="px-6 py-4">
                {/* Styled Select Dropdown matching Stitch badge layout */}
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                  className={`text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1 border-none focus:ring-2 focus:ring-primary outline-none cursor-pointer appearance-none text-center ${getDropdownStyles(
                    order.orderStatus
                  )}`}
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </td>
              <td className="px-6 py-4 text-on-surface-variant">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => openOrderDetails(order)}
                  className="text-secondary hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </td>
            </tr>
          )}

          // Mobile Card Renderer
          renderCard={(order) => (
            <div key= {order.orderNumber} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm space-y-3 relative group">
              <div className="flex justify-between items-start">
                <div>
                  <span 
                    onClick={() => openOrderDetails(order)}
                    className="text-xs font-bold text-primary cursor-pointer hover:underline"
                  >
                     {order.orderNumber}
                  </span>
                  <div className="text-sm font-semibold text-on-surface mt-1">{getCustomerName(order)}</div>
                </div>
                {/* Status select dropdown on mobile card */}
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                  className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 border-none focus:ring-2 focus:ring-primary outline-none cursor-pointer ${getDropdownStyles(
                    order.orderStatus
                  )}`}
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant pt-1">
                <div>
                  <span className="block text-[10px] text-on-surface-variant/60 uppercase font-semibold">Date</span>
                  <span className="font-medium text-on-surface">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-on-surface-variant/60 uppercase font-semibold">Total Amount</span>
                  <span className="font-bold text-on-surface">${Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40">
                <span className="text-xs text-on-surface-variant">{getItemsCount(order)} Items purchased</span>
                <button 
                  onClick={() => openOrderDetails(order)}
                  className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                >
                  <span>Details</span> <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ORDER DETAILS MODAL */}
      {/* ------------------------------------------------------------- */}
      <Modal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        title={`Order Details: ${selectedOrder?.orderNumber}`}
      >
        {selectedOrder && (
          <div className="space-y-6">
            
            {/* Customer Info Card */}
            <div className="bg-surface p-4 rounded-xl border border-outline-variant">
              <h4 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-3">Customer Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-xs text-on-surface-variant/70 block">Name</span>
                  <span className="font-semibold text-on-surface mt-0.5 block">{getCustomerName(selectedOrder)}</span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant/70 block">Email Address</span>
                  <span className="font-semibold text-on-surface mt-0.5 block flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-on-surface-variant" />
                    {getCustomerEmail(selectedOrder)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant/70 block">Phone Number</span>
                  <span className="font-semibold text-on-surface mt-0.5 block flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-on-surface-variant" />
                    {getCustomerPhone(selectedOrder)}
                  </span>
                </div>
              </div>
            </div>

            {/* Items Purchased list */}
            <div>
              <h4 className="text-xs font-bold uppercase text-on-surface-variant tracking-wider mb-3">Items Purchased</h4>
              <div className="border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant/40 bg-surface-container-lowest">
                {selectedOrder.orderItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4">
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{item.productName}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">Variant: {getVariantName(item)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-on-surface">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary details */}
            <div className="border-t border-outline-variant pt-4 flex justify-between items-center">
              <div>
                <span className="text-xs text-on-surface-variant block">Order Date</span>
                <span className="text-sm font-medium text-on-surface mt-0.5 block">
                  {new Date(selectedOrder.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-on-surface-variant block">Total Price</span>
                <span className="text-lg font-bold text-primary mt-0.5 block">
                  ${Number(selectedOrder.totalAmount).toFixed(2)}
                </span>
              </div>
            </div>

          </div>
        )}
      </Modal>

      {/* ------------------------------------------------------------- */}
      {/* CREATE ORDER MODAL - Admin don't create order Manually*/}
      {/* ------------------------------------------------------------- */}


    </div>
  );
};

export default OrdersPage;
