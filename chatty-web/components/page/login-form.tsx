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
        className="flex my-[2vh] flex-col justify-center items-end mx-[.6vw]"
        onSubmit={handleSubmit}
      >

        <div className="flex-col mb-[1.5vh] mt-[1.5vh]">
          <p className="ml-1 mb-1 text-white text-[.95rem]">Email</p>
          <input
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            className="px-4 py-[1.5vh] rounded text-sm text-[#CCCCCC]/50 w-[35vw] bg-transparent border border-[#CCCCCC]/70 focus:outline-none hover:border-white focus:border-white placeholder-[#CCCCCC]/50 focus:placeholder-transparent transition-colors duration-500"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex-col mt-[1.5vh] mb-[2vh]">
          <p className="ml-1 mb-1 text-white text-[.95rem]">Password</p>
          <input
            name="password"
            type="password"
            placeholder="your password"
            value={formData.password}
            onChange={handleInputChange}
            className="px-4 py-[1.5vh] mb-[.5vh] rounded text-sm text-[#CCCCCC]/50 w-[35vw] bg-transparent border border-[#CCCCCC]/70 focus:outline-none hover:border-white focus:border-white placeholder-[#CCCCCC]/50 focus:placeholder-transparent transition-colors duration-500"
          />
        </div>

        <button
          type="submit"
          className="py-[1.5vh] text-white px-[2.5vw] bg-[#700079]/70 mt-[3vh] hover:bg-[#700079]/90 transition-colors duration-500 rounded-full"
        >
          <p className="">Create Account</p>
        </button>
      </form>
    </section>
  );
};

export default SignUpForm;