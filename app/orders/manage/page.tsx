import { IOrder } from "@/database/order.model";
import Order from "@/database/order.model";
import connectToDatabase from "@/lib/mongodb";
import OrderCard from "@/components/orders/OrderCard";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";

// Interface for Order with _id from database
interface OrderWithId extends IOrder {
  _id: string;
}

export default async function OrderManagePage() {
  const session = await getSession();

  if (!session || !session.userData?.admin) {
    notFound();
  }

  await connectToDatabase();
  const orders = await Order.find({}).sort({ paidDate: -1 }).lean();
  const serializedOrders: OrderWithId[] = JSON.parse(JSON.stringify(orders));

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
          <div className="bg-white px-4 py-2 rounded shadow-sm text-sm text-gray-600">
            Total Orders:{" "}
            <span className="font-bold text-primary">
              {serializedOrders.length}
            </span>
          </div>
        </header>

        {serializedOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">No orders found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {serializedOrders.map((order) => (
              <div key={order._id} className="h-full">
                <OrderCard order={order} isAdmin={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
