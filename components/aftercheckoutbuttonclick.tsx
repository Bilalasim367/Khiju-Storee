"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const aftercheckoutbuttonclick = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedMethod, setSelectedMethod] = useState("cod");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethod: selectedMethod }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Order placed successfully!");
        // Optional: Redirect to order confirmation page
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Select Payment Method</h2>
      <div className="space-y-3">
        {[
          { label: "Cash on Delivery", value: "cod" },
          { label: "EasyPaisa", value: "easypaisa" },
          { label: "JazzCash", value: "jazzcash" },
          { label: "Bank Transfer", value: "bank" },
        ].map(({ label, value }) => (
          <label key={value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value={value}
              checked={selectedMethod === value}
              onChange={() => setSelectedMethod(value)}
              className="accent-black"
            />
            {label}
          </label>
        ))}
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition"
      >
        {loading ? "Placing Order..." : "Pay"}
      </button>
    </div>
  );
};

export default aftercheckoutbuttonclick;
