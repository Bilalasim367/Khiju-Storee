"use client";
import { SectionTitle } from "@/components";
import { useProductStore } from "../_zustand/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isValidCardNumber, isValidCreditCardCVVOrCVC, isValidCreditCardExpirationDate, isValidEmailAddressFormat, isValidNameOrLastname } from "@/lib/utils";
import Link from "next/link";

const CheckoutPage = () => {
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    company: "",
    adress: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    orderNotice: "",
  });
  const { products, total, clearCart } = useProductStore();
  const router = useRouter();

  const makePurchase = async () => {
    if (
      checkoutForm.name.length > 0 &&
      checkoutForm.lastname.length > 0 &&
      checkoutForm.phone.length > 0 &&
      checkoutForm.email.length > 0 &&
      checkoutForm.cardName.length > 0 &&
      checkoutForm.expirationDate.length > 0 &&
      checkoutForm.cvc.length > 0 &&
      checkoutForm.company.length > 0 &&
      checkoutForm.adress.length > 0 &&
      checkoutForm.apartment.length > 0 &&
      checkoutForm.city.length > 0 &&
      checkoutForm.country.length > 0 &&
      checkoutForm.postalCode.length > 0
    ) {
      if (!isValidNameOrLastname(checkoutForm.name)) {
        toast.error("You entered invalid format for name");
        return;
      }

      if (!isValidNameOrLastname(checkoutForm.lastname)) {
        toast.error("You entered invalid format for lastname");
        return;
      }

      if (!isValidEmailAddressFormat(checkoutForm.email)) {
        toast.error("You entered invalid format for email address");
        return;
      }

      if (!isValidNameOrLastname(checkoutForm.cardName)) {
        toast.error("You entered invalid format for card name");
        return;
      }

      if (!isValidCardNumber(checkoutForm.cardNumber)) {
        toast.error("You entered invalid format for credit card number");
        return;
      }

      if (!isValidCreditCardExpirationDate(checkoutForm.expirationDate)) {
        toast.error(
          "You entered invalid format for credit card expiration date"
        );
        return;
      }

      if (!isValidCreditCardCVVOrCVC(checkoutForm.cvc)) {
        toast.error("You entered invalid format for credit card CVC or CVV");
        return;
      }

      // sending API request for creating a order
      const response = fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: checkoutForm.name,
          lastname: checkoutForm.lastname,
          phone: checkoutForm.phone,
          email: checkoutForm.email,
          company: checkoutForm.company,
          adress: checkoutForm.adress,
          apartment: checkoutForm.apartment,
          postalCode: checkoutForm.postalCode,
          status: "processing",
          total: total,
          city: checkoutForm.city,
          country: checkoutForm.country,
          orderNotice: checkoutForm.orderNotice,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const orderId: string = data.id;
          // for every product in the order we are calling addOrderProduct function that adds fields to the customer_order_product table
          for (let i = 0; i < products.length; i++) {
            let productId: string = products[i].id;
            addOrderProduct(orderId, products[i].id, products[i].amount);
          }
        })
        .then(() => {
          setCheckoutForm({
            name: "",
            lastname: "",
            phone: "",
            email: "",
            cardName: "",
            cardNumber: "",
            expirationDate: "",
            cvc: "",
            company: "",
            adress: "",
            apartment: "",
            city: "",
            country: "",
            postalCode: "",
            orderNotice: "",
          });
          clearCart();
          toast.success("Order created successfuly");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        });
    } else {
      toast.error("You need to enter values in the input fields");
    }
  };

  const addOrderProduct = async (
    orderId: string,
    productId: string,
    productQuantity: number
  ) => {
    // sending API POST request for the table customer_order_product that does many to many relatioship for order and product
    const response = await fetch("http://localhost:3001/api/order-product", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerOrderId: orderId,
        productId: productId,
        quantity: productQuantity,
      }),
    });
  };

  

  useEffect(() => {
    if (products.length === 0) {
      toast.error("You don't have items in your cart");
      router.push("/cart");
    }
  }, []);

  return (
    <div className="bg-[#FAF7F2] ">
      <SectionTitle title="Checkout" path="Home | Cart | Checkout" />
      {/* Background color split screen for large screens */}
      <div
        className="hidden h-full w-1/2 bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="hidden h-full w-1/2 bg-gray-50 lg:block"
        aria-hidden="true"
      />

      <main className="relative mx-auto grid max-w-screen-2xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

  <section
  aria-labelledby="summary-heading"
  className="bg-[#FAF7F2] px-4 py-14 sm:px-6 lg:px-0"
>
  <div className="mx-auto max-w-2xl lg:max-w-3xl bg-white/60 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-[#e2ddd3]">
    <h2
      id="summary-heading"
      className="text-3xl font-extrabold text-black mb-8 tracking-tight"
    >
      🧾 Your Order Summary
    </h2>

    {/* Products List */}
    <ul className="divide-y divide-[#e6e1d8]">
      {products.map((product) => (
        <li key={product?.id} className="flex items-center gap-6 py-6">
          <Image
            src={product?.image ? `/${product?.image}` : "/product_placeholder.jpg"}
            alt={product?.title}
            width={80}
            height={80}
            className="h-20 w-20 rounded-xl object-cover ring-1 ring-[#e0dbd2]"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{product?.title}</h3>
            <p className="text-gray-500 text-sm">Quantity: {product?.amount}</p>
          </div>
          <div className="text-lg font-medium text-black">
            ${product.price.toFixed(2)}
          </div>
        </li>
      ))}
    </ul>

    {/* Pricing Summary */}
    <div className="mt-8 space-y-4 text-gray-700 text-base">
      <div className="flex justify-between">
        <span className="text-gray-500">Subtotal</span>
        <span className="font-medium">${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Shipping</span>
        <span className="font-medium">$5.00</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Estimated Tax</span>
        <span className="font-medium">${(total / 5).toFixed(2)}</span>
      </div>
    </div>

    {/* Grand Total */}
    <div className="mt-6 pt-6 border-t border-[#d5d0c6] flex justify-between items-center text-xl font-bold text-black">
      <span>Total</span>
      <span>
        $
        {total === 0
          ? "0.00"
          : (Math.round(total + total / 5 + 5)).toFixed(2)}
      </span>
    </div>

    {/* CTA Button */}
    <div className="mt-10">
      <button
        type="button"
        className="w-full rounded-xl bg-black hover:bg-[#333] transition-all text-white py-3 text-lg font-semibold tracking-wide shadow-md"
      >
        Proceed to Checkout
      </button>
    </div>
  </div>
</section>




        <form className="px-4 bg-[#FAF7F2]  pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0">
          <div className="mx-auto max-w-lg lg:max-w-none">
        <section
  aria-labelledby="contact-info-heading"
  className="bg-[#FAF7F2] p-6 sm:p-10 rounded-2xl shadow-md border border-[#e6dfd2]"
>
  <h2
    id="contact-info-heading"
    className="text-xl font-semibold text-[#251919] tracking-wide mb-6"
  >
    Contact Information
  </h2>

  {/* Name */}
  <div className="mb-5">
    <label
      htmlFor="name-input"
      className="block text-sm font-medium text-[#251919]"
    >
      First Name
    </label>
    <input
      value={checkoutForm.name}
      onChange={(e) =>
        setCheckoutForm({
          ...checkoutForm,
          name: e.target.value,
        })
      }
      type="text"
      id="name-input"
      name="name-input"
      autoComplete="text"
      placeholder="Enter your first name"
      className="mt-1 w-full rounded-lg border border-[#d8cfc0] bg-white px-4 py-2 text-[#251919] placeholder-[#b6a79a] shadow-sm focus:border-[#E3B36A] focus:ring-[#E3B36A] focus:outline-none sm:text-sm"
    />
  </div>

  {/* Lastname */}
  <div className="mb-5">
    <label
      htmlFor="lastname-input"
      className="block text-sm font-medium text-[#251919]"
    >
      Last Name
    </label>
    <input
      value={checkoutForm.lastname}
      onChange={(e) =>
        setCheckoutForm({
          ...checkoutForm,
          lastname: e.target.value,
        })
      }
      type="text"
      id="lastname-input"
      name="lastname-input"
      autoComplete="text"
      placeholder="Enter your last name"
      className="mt-1 w-full rounded-lg border border-[#d8cfc0] bg-white px-4 py-2 text-[#251919] placeholder-[#b6a79a] shadow-sm focus:border-[#E3B36A] focus:ring-[#E3B36A] focus:outline-none sm:text-sm"
    />
  </div>

  {/* Phone */}
  <div className="mb-5">
    <label
      htmlFor="phone-input"
      className="block text-sm font-medium text-[#251919]"
    >
      Phone Number
    </label>
    <input
      value={checkoutForm.phone}
      onChange={(e) =>
        setCheckoutForm({
          ...checkoutForm,
          phone: e.target.value,
        })
      }
      type="tel"
      id="phone-input"
      name="phone-input"
      autoComplete="tel"
      placeholder="+92 3XX XXXXXXX"
      className="mt-1 w-full rounded-lg border border-[#d8cfc0] bg-white px-4 py-2 text-[#251919] placeholder-[#b6a79a] shadow-sm focus:border-[#E3B36A] focus:ring-[#E3B36A] focus:outline-none sm:text-sm"
    />
  </div>

  {/* Email */}
  <div className="mb-2">
    <label
      htmlFor="email-address"
      className="block text-sm font-medium text-[#251919]"
    >
      Email Address
    </label>
    <input
      value={checkoutForm.email}
      onChange={(e) =>
        setCheckoutForm({
          ...checkoutForm,
          email: e.target.value,
        })
      }
      type="email"
      id="email-address"
      name="email-address"
      autoComplete="email"
      placeholder="you@example.com"
      className="mt-1 w-full rounded-lg border border-[#d8cfc0] bg-white px-4 py-2 text-[#251919] placeholder-[#b6a79a] shadow-sm focus:border-[#E3B36A] focus:ring-[#E3B36A] focus:outline-none sm:text-sm"
    />
  </div>
</section>



      <section aria-labelledby="payment-heading" className="mt-10 bg-[#FAF7F2] p-6 rounded-xl shadow-lg">
  <h2
    id="payment-heading"
    className="text-xl font-semibold text-black border-b border-black pb-2"
  >
    Payment Details
  </h2>

  <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
    {/* Name on card */}
    <div className="col-span-3 sm:col-span-4">
      <label
        htmlFor="name-on-card"
        className="block text-sm font-medium text-black"
      >
        Name on Card
      </label>
      <div className="mt-1">
        <input
          type="text"
          id="name-on-card"
          name="name-on-card"
          autoComplete="cc-name"
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.cardName}
          onChange={(e) =>
            setCheckoutForm({
              ...checkoutForm,
              cardName: e.target.value,
            })
          }
        />
      </div>
    </div>

    {/* Card number */}
    <div className="col-span-3 sm:col-span-4">
      <label
        htmlFor="card-number"
        className="block text-sm font-medium text-black"
      >
        Card Number
      </label>
      <div className="mt-1">
        <input
          type="text"
          id="card-number"
          name="card-number"
          autoComplete="cc-number"
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.cardNumber}
          onChange={(e) =>
            setCheckoutForm({
              ...checkoutForm,
              cardNumber: e.target.value,
            })
          }
        />
      </div>
    </div>

    {/* Expiration date */}
    <div className="col-span-2 sm:col-span-3">
      <label
        htmlFor="expiration-date"
        className="block text-sm font-medium text-black"
      >
        Expiration Date (MM/YY)
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="expiration-date"
          id="expiration-date"
          autoComplete="cc-exp"
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.expirationDate}
          onChange={(e) =>
            setCheckoutForm({
              ...checkoutForm,
              expirationDate: e.target.value,
            })
          }
        />
      </div>
    </div>

    {/* CVC */}
    <div>
      <label
        htmlFor="cvc"
        className="block text-sm font-medium text-black"
      >
        CVC or CVV
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="cvc"
          id="cvc"
          autoComplete="csc"
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.cvc}
          onChange={(e) =>
            setCheckoutForm({
              ...checkoutForm,
              cvc: e.target.value,
            })
          }
        />
      </div>
    </div>
  </div>
</section>


          <section
  aria-labelledby="shipping-heading"
  className="mt-10 bg-[#FAF7F2] p-6 rounded-xl shadow-md"
>
  <h2
    id="shipping-heading"
    className="text-xl font-semibold text-black border-b border-black pb-2"
  >
    Shipping Address
  </h2>

  <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
    {/* Company */}
    <div className="sm:col-span-3">
      <label htmlFor="company" className="block text-sm font-medium text-black">
        Company
      </label>
      <div className="mt-1">
        <input
          type="text"
          id="company"
          name="company"
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.company}
          onChange={(e) =>
            setCheckoutForm({ ...checkoutForm, company: e.target.value })
          }
        />
      </div>
    </div>

    {/* Address */}
    <div className="sm:col-span-3">
      <label htmlFor="address" className="block text-sm font-medium text-black">
        Address
      </label>
      <div className="mt-1">
        <input
          type="text"
          id="address"
          name="address"
          autoComplete="street-address"
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.adress}
          onChange={(e) =>
            setCheckoutForm({ ...checkoutForm, adress: e.target.value })
          }
        />
      </div>
    </div>

    {/* Apartment */}
    <div className="sm:col-span-3">
      <label htmlFor="apartment" className="block text-sm font-medium text-black">
        Apartment, suite, etc.
      </label>
      <div className="mt-1">
        <input
          type="text"
          id="apartment"
          name="apartment"
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.apartment}
          onChange={(e) =>
            setCheckoutForm({ ...checkoutForm, apartment: e.target.value })
          }
        />
      </div>
    </div>

    {/* City */}
    <div>
      <label htmlFor="city" className="block text-sm font-medium text-black">
        City
      </label>
      <div className="mt-1">
        <input
          type="text"
          id="city"
          name="city"
          autoComplete="address-level2"
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.city}
          onChange={(e) =>
            setCheckoutForm({ ...checkoutForm, city: e.target.value })
          }
        />
      </div>
    </div>

    {/* Country */}
    <div>
      <label htmlFor="region" className="block text-sm font-medium text-black">
        Country
      </label>
      <div className="mt-1">
        <input
          type="text"
          id="region"
          name="region"
          autoComplete="address-level1"
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.country}
          onChange={(e) =>
            setCheckoutForm({ ...checkoutForm, country: e.target.value })
          }
        />
      </div>
    </div>

    {/* Postal Code */}
    <div>
      <label htmlFor="postal-code" className="block text-sm font-medium text-black">
        Postal Code
      </label>
      <div className="mt-1">
        <input
          type="text"
          id="postal-code"
          name="postal-code"
          autoComplete="postal-code"
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.postalCode}
          onChange={(e) =>
            setCheckoutForm({ ...checkoutForm, postalCode: e.target.value })
          }
        />
      </div>
    </div>

    {/* Order Notice */}
    <div className="sm:col-span-3">
      <label htmlFor="order-notice" className="block text-sm font-medium text-black">
        Order Notice
      </label>
      <div className="mt-1">
        <textarea
          id="order-notice"
          name="order-notice"
          autoComplete="order-notice"
          rows={4}
          className="block w-full rounded-md border border-black bg-white px-3 py-2 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          value={checkoutForm.orderNotice}
          onChange={(e) =>
            setCheckoutForm({ ...checkoutForm, orderNotice: e.target.value })
          }
        ></textarea>
      </div>
    </div>
  </div>
</section>


          <div className="mt-10 border-t border-black pt-6">
<Link href='/aftercheckoutbuttonclick'>
  <button
    type="button"
    onClick={makePurchase}
    className="w-full rounded-lg bg-black px-20 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#d8cfc0] hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
  >

    Pay Now
  </button>
  </Link>
</div>

          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;
