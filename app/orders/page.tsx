import { IOrder } from "@/database/order.model";
import Order from "@/database/order.model";
import connectToDatabase from "@/lib/mongodb";
import OrderCard from "@/components/orders/OrderCard";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

// Interface for Order with _id from database
interface OrderWithId extends IOrder {
  _id: string;
}

// Fetch user's orders directly from database (Server Component)
async function getMyOrders(): Promise<OrderWithId[]> {
  const session = await getSession();
  if (!session || !session.userData) return [];

  await connectToDatabase();
  const orders = await Order.find({ owner_id: session.userData._id })
    .sort({ paidDate: -1 })
    .lean();

  // Serialize ObjectId to string
  return JSON.parse(JSON.stringify(orders));
}

export default async function OrderHistoryPage() {
  const session = await getSession();

  // Redirect to login if not authenticated
  if (!session || !session.userData) {
    redirect("/login");
  }

  const orders = await getMyOrders();

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-500 mt-2">View and track your past orders.</p>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="mb-4 text-emerald-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven&apos;t made any purchases yet.
            </p>
            <a
              href="/products"
              className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="h-full">
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
