import React, {  useEffect,useState,} from 'react';
import {  useParams,} from 'react-router-dom';
import {customerService,} from '../../services/customer.service';

const CustomerDetailsPage = () => {

  const { id } = useParams();
  const [customer, setCustomer] =useState<any>(null);
  const [loading, setLoading] =useState(true);
  const [expandedOrder, setExpandedOrder] =
  useState<string | null>(null);

  useEffect(() => {
    const loadCustomer =
      async () => {
        try {
          const data =
            await customerService.getCustomerById(
              id as string
            );
          setCustomer(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    loadCustomer();
  }, [id]);
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!customer) {
    return (
      <div>
        Customer not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
<div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
  <div className="flex items-center gap-4">
    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
      {customer.name.charAt(0)}
    </div>

    <div>
      <h1 className="text-3xl font-bold text-on-surface">
        {customer.name}
      </h1>

      <p className="text-sm text-on-surface-variant">
        Customer ID: {customer.id.slice(0, 8)}
      </p>

      <p className="text-sm text-on-surface-variant">
        Joined {new Date(customer.createdAt).toLocaleDateString("en-IN")}
      </p>
    </div>
  </div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-4">
  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
    <p className="text-xs text-on-surface-variant uppercase">
      Total Orders
    </p>

    <p className="text-3xl font-bold text-primary mt-2">
      {customer.orders.length}
    </p>
  </div>

  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
    <p className="text-xs text-on-surface-variant uppercase">
      Total Spent
    </p>

    <p className="text-3xl font-bold text-secondary mt-2">
      ₹
      {customer.orders.reduce(
        (sum: number, order: any) =>
          sum + Number(order.totalAmount),
        0
      )}
    </p>
  </div>
</div>
        <div className="border rounded-xl p-4">
          <h3 className="font-bold mb-3">
            Statistics
          </h3>
           <p className="text-xs text-on-surface-variant">
            Total Orders:
            {" "}
            {customer.orders.length}
          </p>
           <p className="text-xs text-on-surface-variant">
            Total Spent:
            {" "}
            ₹
            {customer.orders.reduce(
              (
                sum: number,
                order: any
              ) =>
                sum +
                Number(
                  order.totalAmount
                ),
              0
            )}
          </p>
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
  <h3 className="text-lg font-semibold mb-4">
    Orders
  </h3>
  {customer.orders.length === 0 ? (
    <p className="text-on-surface-variant">
      No orders found.
    </p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
  <th className="text-left py-3">
    Order Number
  </th>

  <th className="text-left py-3">
    Status
  </th>

  <th className="text-left py-3">
    Total
  </th>

  <th className="text-left py-3">
    Date
  </th>

  <th className="text-right py-3">
  </th>
</tr>
        </thead>
        <tbody>
          {customer.orders.map((order: any) => (
            <React.Fragment key={order.id}>
              <tr
                className="border-b cursor-pointer hover:bg-surface-container transition-colors"
                onClick={() =>
                  setExpandedOrder(
                    expandedOrder === order.id
                      ? null
                      : order.id
                  )
                }
              >
                <td className="py-3 font-medium text-primary">
                  {order.orderNumber}
                </td>

                <td>
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      order.orderStatus === "DELIVERED"
        ? "text-green-600"
        : order.orderStatus === "PROCESSING"
        ? "text-blue-600"
        : order.orderStatus === "PENDING"
        ? "text-amber-600"
        : "text-red-600"
    }`}
  >
    {order.orderStatus}
  </span>
</td>
                <td className="py-3">
                  ₹{Number(order.totalAmount)}
                </td>

                <td className="py-3">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString(
                    "en-IN"
                  )}
                </td>
                <td className="py-3 text-right text-primary font-semibold">
  {expandedOrder === order.id ? "▲" : "▼"}
</td>
              </tr>

              {expandedOrder === order.id && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 bg-surface-container-low"
                  >
                    <div className="rounded-lg border border-outline-variant p-4">
                      <h4 className="font-semibold mb-4">
                        Order Items
                      </h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">
                              Product
                            </th>
                            <th className="text-left py-2">
                              Frame Size
                            </th>
                            <th className="text-left py-2">
                              Mount Type
                            </th>
                            <th className="text-left py-2">
                              Glass Type
                            </th>
                            <th className="text-left py-2">
                              Qty
                            </th>
                            <th className="text-left py-2">
                              Price
                            </th>
                            <th className="text-left py-2">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItems.map(
                            (item: any) => (
                              <tr
                                key={item.id}
                                className="border-b"
                              >
                                <td className="py-2">
                                  {item.productName}
                                </td>

                                <td className="py-2">
                                  {item.frameSize}
                                </td>

                                <td className="py-2">
                                  {item.mountType}
                                </td>

                                <td className="py-2">
                                  {item.glassType}
                                </td>

                                <td className="py-2">
                                  {item.quantity}
                                </td>

                                <td className="py-2">
                                  ₹{Number(item.price)}
                                </td>

                                <td className="py-2 font-semibold">
                                  ₹{Number(item.subtotal)}
                                </td>
                              </tr>
                            )
                          )}

                        </tbody>

                      </table>

                    </div>

                  </td>
                </tr>
              )}

            </React.Fragment>
          ))}

        </tbody>

      </table>

    </div>
  )}

</div>
    </div>
  );
};

export default CustomerDetailsPage;