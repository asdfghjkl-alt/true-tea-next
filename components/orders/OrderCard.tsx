import { IOrder, IOrderProduct } from "@/database/order.model";
import OrderItem from "./OrderItem";
import OrderStatusButton from "./OrderStatusButton";

interface OrderCardProps {
  order: IOrder & { _id: string };
  isAdmin?: boolean;
}

export default function OrderCard({ order, isAdmin }: OrderCardProps) {
  // Format date to TIME DD/MM/YYYY
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return (
      d.toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }) +
      " " +
      d.toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Header: Buyer & Delivery Info */}
      <div className="p-4 bg-gray-50 border-b border-gray-100 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Billing Info</h4>
            <p>
              {order.buyer.fname} {order.buyer.lname}
            </p>
            <p className="text-gray-500">{order.buyer.email}</p>
            <p className="text-gray-500">{order.buyer.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Delivery</h4>
            <p>
              {order.delivery.fname} {order.delivery.lname}
            </p>
            <p className="text-gray-500 text-xs">
              {order.delivery.address.line1}
              {order.delivery.address.line2 && (
                <>
                  <br />
                  {order.delivery.address.line2}
                </>
              )}
              <br />
              {order.delivery.address.suburb}, {order.delivery.address.state}{" "}
              {order.delivery.address.postcode}
            </p>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="p-4 border-b border-gray-100 text-xs text-gray-500 grid grid-cols-2 gap-y-2">
        <div>
          <span className="font-medium text-gray-700">Order ID:</span>
          <br />
          <span className="font-mono">{order._id.toString()}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Date:</span>
          <br />
          {formatDate(order.paidDate)}
        </div>
        <div>
          <span className="font-medium text-gray-700">Payment ID:</span>
          <br />
          <span
            className="font-mono truncate block w-full"
            title={order.paymentId}
          >
            {order.paymentId}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Receipt:</span>
          <br />
          {order.receiptUrl &&
          order.receiptUrl !== "receipt_url_not_available" ? (
            <a
              href={order.receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline truncate block w-full"
            >
              {order.receipt && order.receipt !== "receipt_number_not_available"
                ? order.receipt
                : "View Receipt"}
            </a>
          ) : order.receipt &&
            order.receipt !== "receipt_number_not_available" ? (
            <span className="text-gray-600 block truncate">
              {order.receipt}{" "}
              <span className="text-gray-400 text-xs italic">(No URL)</span>
            </span>
          ) : (
            <span className="text-gray-400 italic">No Receipt</span>
          )}
        </div>
      </div>

      {/* Products List */}
      <div className="p-4 grow overflow-y-auto max-h-64">
        <h4 className="font-semibold text-gray-700 mb-3 text-sm">Items</h4>
        <div className="space-y-3">
          {order.productList.map((item: IOrderProduct, index: number) => (
            <OrderItem key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Footer: Totals */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto text-sm">
        <div className="flex justify-between items-center mb-1 text-gray-600">
          <span>Postage</span>
          <span>${order.postage.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2 text-gray-600">
          <span>Included GST</span>
          <span>${order.GSTTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2 pt-2 border-t border-gray-200">
          <span className="font-medium text-gray-800">Total</span>
          <span className="text-lg font-bold text-primary">
            ${order.orderTotal.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <OrderStatusButton
              orderId={order._id}
              currentStatus={order.status}
            />
          )}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
              order.status === "paid"
                ? "bg-green-100 text-green-700"
                : order.status === "delivered"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>
    </div>
  );
}
