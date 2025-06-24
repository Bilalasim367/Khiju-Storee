"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AfterCheckoutButtonClick = () => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("cod");
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
        router.push("/thank-you");
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
    <div className="max-w-xl mx-auto bg-[#FAF7F2] p-6 rounded-2xl border border-black shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4">Choose Payment Method</h2>
      <div className="space-y-3">
        {[
          { label: "Cash on Delivery", value: "cod" },
          { label: "EasyPaisa", value: "easypaisa" },
          { label: "JazzCash", value: "jazzcash" },
          { label: "Bank Transfer", value: "bank" },
        ].map(({ label, value }) => (
          <label key={value} className="flex items-center gap-3 cursor-pointer text-black">
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
        className="mt-6 bg-black text-[#FAF7F2] px-6 py-3 rounded-md hover:bg-[#222] transition w-full font-semibold text-lg"
      >
        {loading ? "Placing Order..." : "Pay"}
      </button>
    </div>
  );
};

export default AfterCheckoutButtonClick;
