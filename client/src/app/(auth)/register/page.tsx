'use client';

import React, { useState } from "react";
import Image from "next/image";
import loginImage from "@/../public/images/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validation/schemas"; // Replace with your Zod schema
import { useCreateUserMutation } from "@/lib/services/auth"; // Replace with your Redux service

export default function Signup() {
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [registerUser] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const response = await registerUser(values);
      console.log("Response from loginUser:", response)
      if (response.data && response.data.status === "success") {
        setServerSuccessMessage(response.data.message);
        setServerErrorMessage("");
        reset();
        setLoading(false);
        router.push("/login");
      }
      if (response.error && "data" in response.error && (response.error.data as any ).status === "failed" ){
        setServerErrorMessage(  (response.error.data as { message: string }).message );
        setServerSuccessMessage("");
        setLoading(false);
      }
    } catch (error) {
      setServerErrorMessage("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDF0FD] to-white">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex">
          {/* Left Section with Image */}
          <div className="w-1/2 flex items-center justify-center">
            <Image src={loginImage} alt="Signup" width={400} height={330} />
          </div>

          {/* Right Section with Form */}
          <div className="w-1/2 flex flex-col p-8 space-y-3">
            <h3 className="text-2xl font-bold text-black">Register</h3>
            <p className="text-sm uppercase tracking-wide text-gray-500">Join us</p>

            {serverSuccessMessage && <div className="text-sm text-green-500 font-semibold px-2 text-center">{serverSuccessMessage}</div>}
            {serverErrorMessage && <div className="text-red-500 text-sm">{serverErrorMessage}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="text-sm text-black">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="h-11 w-full border border-gray-300 rounded-lg px-3"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}

              <label className="text-sm text-black">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full border border-gray-300 rounded-lg px-3"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}

              <label className="text-sm text-black">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 w-full border border-gray-300 rounded-lg pl-10"
                  {...register("password")}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}

              <label className="text-sm text-black">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="h-11 w-full border border-gray-300 rounded-lg pl-10"
                  {...register("confirmPassword")}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 uppercase text-sm font-medium"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            {/* Already a user link */}
            <div className="text-center">
              <Link href="/login">
                <span className="text-xs uppercase text-gray-500">
                  Already user? <span className="text-blue-600">LOGIN here</span>
                </span>
              </Link>
            </div>

            {/* OR Divider */}
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:border-gray-400 hover:shadow transition"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                width={24}
                height={24}
              />
              <span>Sign up with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
