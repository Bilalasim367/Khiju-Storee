// app/thank-you/page.tsx
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAF7F2] px-4">
      <h1 className="text-4xl font-bold text-black mb-4">🎉 Thank You for Your Order!</h1>
      <p className="text-lg text-black text-center max-w-xl mb-6">
        Your order has been placed successfully. You selected <strong>Cash on Delivery</strong>.
        <br />
        For any queries, contact us on 
        <a href="https://wa.me/03130112279" className="text-blue-600 underline ml-1" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        .
      </p>

      <Link href="/" className="bg-black text-[#FAF7F2] px-6 py-3 rounded-md hover:bg-[#222] transition font-medium">
        Continue Shopping
      </Link>
    </div>
  );
}
