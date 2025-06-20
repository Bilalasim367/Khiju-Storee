"use client";
import { CustomButton, SectionTitle } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmailAddressFormat(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      toast.error("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    } else {
      setError("");
      toast.success("Login successful");
    }
  };

  if (sessionStatus === "loading") return <h1 className="text-center py-20">Loading...</h1>;

  return (
    <div className="bg-[#F9F6F1] min-h-screen">
      <SectionTitle title="Login" path="Home | Login" />
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="w-full max-w-lg bg-white/60 backdrop-blur-md border border-[#E8E2D8] rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center text-[#1F1F1F] mb-6">
            Welcome Back
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-[#998F81] mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-[#E0DAD0] rounded-md bg-white text-[#1F1F1F] focus:ring-2 focus:ring-[#C0A882] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#998F81] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-[#E0DAD0] rounded-md bg-white text-[#1F1F1F] focus:ring-2 focus:ring-[#C0A882] outline-none"
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm text-[#998F81]">
                <input type="checkbox" className="accent-[#C0A882]" />
                Remember me
              </label>
              <a href="#" className="text-sm text-[#C0A882] hover:underline">
                Forgot password?
              </a>
            </div>

            <CustomButton
              buttonType="submit"
              text="Sign In"
              paddingX={4}
              paddingY={2}
              customWidth="full"
              textSize="base"
              background="#C0A882"
              hoverBackground="#b2956f"
              textColor="black"
            />
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E0DAD0]"></div>
            </div>
            <div className="relative flex justify-center text-sm text-[#998F81] bg-white/60 px-4">
              Or continue with
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-2 rounded-md border border-[#E0DAD0] bg-white text-[#1F1F1F] py-2 hover:shadow-sm transition"
            >
              <FcGoogle size={20} />
              Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="flex items-center justify-center gap-2 rounded-md bg-[#24292F] text-white py-2 hover:bg-black transition"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017..."
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </button>
          </div>

          {error && (
            <p className="text-center text-sm text-red-600 mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
