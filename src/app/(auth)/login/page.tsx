"use client";
import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaBookOpen, FaEyeSlash } from "react-icons/fa";
import InputLogin from "@/app/components/inputLogin/Login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTyped, setPasswordTyped] = useState(false);

  const RefEmail: any = useRef(null);
  useEffect(() => {
    RefEmail.current.focus();
  }, []);

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
    setPasswordTyped(e.target.value !== "");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container-login relative w-[100%] bg-[var(--BG)]">
      <div
        className="overlay-container absolute top-0 left-0 w-[100%] h-[100%]"
        id="overlayCon"
      >
        <div className="overlay relative flex w-[100%] h-[100vh]">
          <div className="overlay-panel-overlay-left flex-1 relative">
            <Image
              className="!relative h-[100%]"
              src="/images/picture1.png"
              alt="image"
              priority={true}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            ></Image>
          </div>
          <div className="overlay-panel-overlay-right flex-1 flex items-center justify-center bg-[var(--BG)]">
            <form className="from-login max-w-[500px] p-[40px] w-[100%] bg-[var(--BG)]">
              <div>
                <i className="flex pb-[20px] m-[auto] text-[100px] text-[var(--first-color)]">
                  <FaBookOpen />
                </i>
              </div>
              <h1 className="text-[var(--title-color)] opacity-[0.7]">
                Welcome back!
              </h1>
              <p className="text-[var(--title-color)] font-bold text-[20px] mt-[5px] mb-[50px]">
                Login to your account
              </p>
              <div className="infield mb-[20px]">
                <label className="email mb-[10px] text-[var(--title-color)] block font-bold">
                  E-mail
                </label>
                <InputLogin
                  value={email}
                  type="email"
                  name="email"
                  placeholder="Email"
                  style=""
                  onChange={handleEmail}
                  RefEmail={RefEmail}
                />
              </div>
              <div className="infield mb-[20px]">
                <label className="password-field mb-[10px] text-[var(--title-color)] block font-bold">
                  Password
                </label>
                <div className="password-container relative">
                  <InputLogin
                    value={password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    style="pd-right "
                    onChange={handlePassword}
                    RefEmail={null}
                  />
                  {passwordTyped && (
                    <button
                      type="button"
                      className="toggle-password absolute top-[50%] right-[26px] translate-y-[-50%] hover:opacity-[0.7]"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  )}
                </div>
              </div>
              <div className="form-checkbox mb-[120px] flex items-center">
                <input className="checkbox mr-[10px]" type="checkbox" />
                <label className="RM text-[var(--first-color)] text-[14px] font-bold">
                  Remember Me
                </label>
              </div>
              <Link href="/">
                <div className="btn-login text-center mb-[10px]">
                  <button className="pt-[12px] pb-[12px] pl-[10px] pr-[10px] bg-[var(--first-color)] text-[var(--white-color)] rounded-[5px] cursor-pointer w-[100%] outline-none hover:bg-[var(--white-color)] hover:text-[var(--first-color)] hover:outline-[1px] hover:outline-[var(--first-color)]">
                    Login
                  </button>
                </div>
              </Link>
              <Link href="/register">
                <div className="btn-register text-center mt-[20px]">
                  <button className="pt-[12px] pb-[12px] pl-[10px] pr-[10px] bg-[var(--white-color)] text-[var(--second-color)] rounded-[5px] cursor-pointer w-[100%] outline-1 outline outline-[var(--second-color)] hover:bg-[var(--second-color)] hover:outline-[var(--white-color)] hover:text-[--white-color]">
                    Register
                  </button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
