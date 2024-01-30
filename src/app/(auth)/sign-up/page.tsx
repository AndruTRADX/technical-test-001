"use client";

import React, { useState } from "react";
import BgGrid from "@/components/background/BgGrid";
import Button from "@/components/common/Button";
import { endpoints } from "@/config/env";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? "teacher" : "student") : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(endpoints.user.logIn, {
      method: "POST",
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    console.log(res);

    setLoading(false);
  };

  return (
    <main className="relative flex min-h-screen flex-col justify-center items-center">
      <BgGrid />
      <div className="flex flex-col backdrop-blur-sm bg-teal-50/30 z-10 justify-center items-center gap-y-8 max-w-[420px] px-8 py-16 rounded-2xl border border-teal-300 shadow-lg shadow-teal-200/50">
        <h2 className="content-title">
          Join the <span className="span-decoration">community</span>.
        </h2>
        <form className="flex flex-col w-full gap-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full items-start justify-between text-gray-800 gap-y-2 font-medium">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-form"
            />
          </div>

          <div className="flex flex-col w-full items-start justify-between text-gray-800 gap-y-2 font-medium">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-form"
            />
          </div>

          <div className="flex flex-col w-full items-start justify-between text-gray-800 gap-y-2 font-medium">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              className="input-form"
            />
          </div>

          <div className="flex items-center text-gray-800 gap-y-2 font-medium">
            <input
              type="checkbox"
              id="role"
              name="role"
              checked={formData.role === "teacher"}
              onChange={handleChange}
            />
            <label htmlFor="role" className="ml-2">
              I am a teacher
            </label>
          </div>

          <div className="flex justify-end">
            <Button
              text="Sign Up"
              state={loading}
              textState="Creating user..."
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
