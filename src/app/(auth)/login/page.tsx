"use client";

import React, { FormEventHandler, useState } from "react";
import BgGrid from "@/components/background/BgGrid";
import Button from "@/components/common/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", { ...formData, redirect: false });

    if (res?.error) {
      return setError(res?.error);
    }

    router.push("/dashboard");
  };

  return (
    <main className="relative flex min-h-screen flex-col justify-center items-center">
      <BgGrid />
      <div className="flex flex-col backdrop-blur-sm bg-teal-50/30 z-10 justify-center items-center gap-y-8 max-w-[380px] px-8 py-16 rounded-2xl border border-teal-300 shadow-lg shadow-teal-200/50">
        <h2 className="content-title">
          Enter the virtual <span className="span-decoration">classroom</span>.
        </h2>
        <form className="flex flex-col w-full gap-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full items-start justify-between text-gray-800 gap-y-2 font-medium">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className="input-form"
            />
          </div>

          <div className="flex flex-col w-full items-start justify-between text-gray-800 gap-y-2 font-medium">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="***********"
              className="input-form"
            />
          </div>

          <div className="flex justify-end">
            <Button text="Log In" />
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
