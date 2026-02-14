"use client";

interface OrderSummaryProps {
  totals: {
    subtotal: number;
    gstTotal: number;
    savings: number;
  };
}

export default function OrderSummary({ totals }: OrderSummaryProps) {
  return (
    <div className="min-w-[300px] lg:w-1/3">
      <div className="sticky top-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 border-b pb-2 text-xl font-bold">Order Summary</h2>

        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>GST (included)</span>
            <span>${totals.gstTotal.toFixed(2)}</span>
          </div>

          {totals.savings > 0 && (
            <div className="flex justify-between font-medium text-emerald-600">
              <span>Total Savings</span>
              <span>-${totals.savings.toFixed(2)}</span>
            </div>
          )}

          <div className="mt-4 flex justify-between border-t pt-4 items-center">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-primary">
              ${totals.subtotal.toFixed(2)}
            </span>
          </div>
        </div>

        <button className="btn btn-submit mt-6 w-full py-3 text-lg font-semibold shadow-md transition-all hover:shadow-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
