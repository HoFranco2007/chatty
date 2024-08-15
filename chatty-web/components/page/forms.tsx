"use client";

import React, { useState, useRef, useEffect } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario enviados:", formData);
    setFormData({
      email: "",
      password: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section>
      <form
        className="flex my-2 flex-col justify-center items-start mx-[0.6vw]"
        onSubmit={handleSubmit}
      >

        <div className="flex-col mb-4">
          <p className="mb-1 ml-1 text-black text-[.95rem]">Email</p>
          <input
            name="email"
            title="EMAIL"
            placeholder="your@email.com"
            value={formData.email}
            className="px-4 py-2 text-sm w-[25vw] bg-transparent border border-[#CCCCCC]/70 focus:outline-none hover:border-white focus:border-white placeholder-[#CCCCCC]/50 focus:placeholder-transparent transition-colors duration-500"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex-col mt-4 mb-2">
          <p className="mb-1 ml-1 text-black text-[.95rem]">Password</p>
          <input
            name="password"
            type="password"
            placeholder="your password"
            value={formData.password}
            onChange={handleInputChange}
            className="px-4 py-2 text-sm w-[25vw] bg-transparent border border-[#CCCCCC]/70 focus:outline-none hover:border-white focus:border-white placeholder-[#CCCCCC]/50 focus:placeholder-transparent transition-colors duration-500"
          />
        </div>

        <button
          type="submit"
          className="py-3 px-6 bg-[#CCCCCC] mt-12 hover:bg-white transition-colors duration-500"
        >
          <p className="">Create Account</p>
        </button>
      </form>
    </section>
  );
};

export default SignUpForm;