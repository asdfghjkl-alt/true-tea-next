import { IOrder } from "@/database/order.model";
import Order from "@/database/order.model";
import connectToDatabase from "@/lib/mongodb";
import OrderCard from "@/components/orders/OrderCard";
import { getSession } from "@/lib/session";

// Interface for Order with _id from database
interface OrderWithId extends IOrder {
  _id: string;
}

async function getOrders(): Promise<OrderWithId[]> {
  await connectToDatabase();
  const orders = await Order.find({}).sort({ paidDate: -1 }).lean();

  // Serialize ObjectId to string
  return JSON.parse(JSON.stringify(orders));
}

export default async function OrderManagePage() {
  const orders = await getOrders();
  const session = await getSession();
  const isAdmin = session?.userData?.admin === true;

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
          <div className="bg-white px-4 py-2 rounded shadow-sm text-sm text-gray-600">
            Total Orders:{" "}
            <span className="font-bold text-primary">{orders.length}</span>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">No orders found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="h-full">
                <OrderCard order={order} isAdmin={isAdmin} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
