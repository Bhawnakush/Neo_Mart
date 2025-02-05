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
import { useLoginUserMutation } from "@/lib/services/auth"; 
import { loginSchema } from "@/validation/schemas";
import {z} from 'zod';


export default function Signin() {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [loginUser] = useLoginUserMutation();

  type FormFields=z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors},
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema), // Use Zod validation schema
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await loginUser(values);
      if (response.data && response.data.status === "success") {
        setServerSuccessMessage(response.data.message);
        setServerErrorMessage("");
        reset();
        setLoading(false);
        router.push("/home");
      }
       if (response.error && "data" in response.error && (response.error.data as any).status === "failed" ){
        setServerErrorMessage(  (response.error.data as { message: string }).message );
        setServerSuccessMessage("");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDF0FD] to-white">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex items-center p-8 ">
          {/* Left Section with Image */}
          <div className="w-1/2 flex items-center justify-center">
            <Image src={loginImage} alt="Login" width={400} height={330} />
          </div>

          {/* Right Section with Form */}
          <div className="w-1/2 flex flex-col space-y-6 px-6">
            <h3 className="text-2xl font-bold text-black">Welcome Back</h3>
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Login to Continue
            </p>

            {serverSuccessMessage && <div className="text-sm text-green-500 font-semibold px-2 text-center">{serverSuccessMessage}</div>}
            {serverErrorMessage && <div className="text-red-500 text-sm">{serverErrorMessage}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Input */}
              <label className="text-sm text-black">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full border border-gray-300 rounded-lg px-3"
                {...register("email")}
              />
            
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>
              )}

              {/* Password Input */}
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
                  className="w-[15.2px] h-[12px] absolute left-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{String(errors.password.message)}</p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 uppercase text-sm font-medium"
              disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Signup Link */}
            <div className="flex justify-center">
              <Link href="/register">
                <span className="text-xs uppercase text-gray-500">
                  New User? <span className="text-blue-600">Signup</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
