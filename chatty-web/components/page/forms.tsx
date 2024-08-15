"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from './NumberInput.module.css'
import Link from "next/link";

const Input = ({
  title,
  placeHolder,
  name,
  value,
  className,
  titleClassName,
  onChange,
  disabled
}: {
  title: string;
  placeHolder: string;
  name: string;
  value: string;
  className: string;
  titleClassName: string;
  onChange: (e: React.FormEvent) => void;
  disabled?: boolean
}) => {
  const [isInputSelected, setIsInputSelected] = useState(false);

  const handleInputFocus = () => {
    setIsInputSelected(true);
  }

  const handleInputBlur = () => {
    setIsInputSelected(false);
  }

  return (
    <div className="my-2">
      <h6 className={titleClassName}>{title}</h6>
      <input
        className={`${isInputSelected ? "outline-2 outline-primaryv transition-colors duration-200" : "outline-none"} outline-none transition-all duration-300 flex justify-center w-80 h-12 rounded-md bg-gray-700 text-gray-50 p-2 placeholder:text-gray-50 ${className}`}
        type="text"
        name={name}
        value={value}
        id=""
        placeholder={placeHolder}
        onChange={onChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        disabled={disabled}
      />
    </div>
  );
};

const PasswordInput = ({
  name,
  value,
  onChange,
}: {
  name: string | undefined;
  value: string;
  onChange: (e: React.FormEvent) => void;
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isInputSelected, setIsInputSelected] = useState(false);

  const handleInputFocus = () => {
    setIsInputSelected(true);
  }

  const handleInputBlur = () => {
    setIsInputSelected(false);
  }

  const handleClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="my-2">
      <h6 className="text-xs font-semibold tracking-widest">PASSWORD</h6>
      <div className="flex flex-row relative justify-between">
        <input
          className={`${isInputSelected ? "outline-2 outline-primaryv transition-colors duration-200" : "outline-none"} outline-none flex justify-center mt-1 w-80 h-12 rounded-md bg-gray-700 text-gray-50 placeholder:text-gray-50 p-2 z-0`}
          type={passwordVisible ? "text" : "password"}
          name={name}
          id=""
          placeholder="Enter your Password"
          value={value}
          onChange={onChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <button
          type="button"
          onClick={handleClick}
          className="flex z-10 mt-5 ml-[18rem] absolute"
        >
          <img
            src={
              passwordVisible ? "/svg/ojoCerrado.svg" : "/svg/ojoAbierto.svg"
            }
          />
        </button>
      </div>
    </div>
  );
};

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    selectedOptions: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario enviados:", formData);
    setFormData({
      username: "",
      email: "",
      password: "",
      selectedOptions: [],
    });
  };

  const handleInputChange = (e: React.FormEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section>
      <form
        className="flex my-2 flex-col justify-center items-center mx-8"
        onSubmit={handleSubmit}
      >
        <Input
          name="username"
          title="USERNAME"
          placeHolder="Enter your Username"
          value={formData.username}
          className=""
          titleClassName="text-xs font-semibold tracking-widest font-bebas mb-1"
          onChange={handleInputChange}
        />
        <Input
          name="email"
          title="EMAIL"
          placeHolder="Enter your email"
          value={formData.email}
          className=""
          titleClassName="text-xs font-semibold tracking-widest font-bebas mb-1"
          onChange={handleInputChange}
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <div className="mt-4">
          Peter
        </div>
        <button
          type="submit"
          className="flex items-center justify-center w-72 mt-4 py-3 bg-primaryv rounded-lg"
        >
          <h4 className="text-xl tracking-wide font-[550]">Sign Up</h4>
        </button>
      </form>
    </section>
  );
};

export default SignUpForm;