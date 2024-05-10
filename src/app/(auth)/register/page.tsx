"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./register.css";
import { IoDocumentTextOutline, IoClose } from "react-icons/io5";
import { FaEye, FaBookOpen, FaEyeSlash } from "react-icons/fa";
import InputRegister from "@/app/components/inputRegister/register";

export default function Register() {
  const [Text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordTyped, setPasswordTyped] = useState(false);
  const [ConfirmpasswordTyped, setConfirmPasswordTyped] = useState(false);

  const RefName: any = useRef(null);
  useEffect(() => {
    const iconClose = document.querySelector(".modal-close");
    const modal = document.querySelector(".modal");
    const termsConditions = document.querySelector(".terms-conditions");

    iconClose?.addEventListener("click", () => {
      modal?.classList.remove("show-modal");
    });

    termsConditions?.addEventListener("click", () => {
      modal?.classList.add("show-modal");
    });

    RefName.current.focus();
  }, []);

  const handleText = (e: any) => {
    setText(e.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
    setPasswordTyped(e.target.value !== "");
  };
  const handleConfirmPassword = (e: any) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordTyped(e.target.value !== "");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="form-container-register relative w-[100%] bg-[var(--BG)]">
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
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            ></Image>
          </div>
          <div className="overlay-panel-overlay-right flex-1 flex items-center justify-center bg-[var(--BG)]">
            <form className="form-register max-w-[500px] p-[40px] w-[100%] bg-[var(--BG)]">
              <div>
                <i className="flex pb-[20px] m-[auto] text-[100px] text-[var(--first-color)]">
                  <FaBookOpen />
                </i>
              </div>
              <h1 className="text-[var(--title-color)] opacity-[0.7] text-[24px] mb-[20px] text-center">
                Create an account
              </h1>
              <div className="infield mb-[20px]">
                <label className="name mb-[10px] text-[var(--title-color)] block font-bold">
                  Full Name
                </label>
                <InputRegister
                  value={Text}
                  type="text"
                  placeholder="Your Full Name"
                  name="name"
                  style=""
                  onChange={handleText}
                  RefName={RefName}
                />
              </div>
              <div className="infield mb-[20px]">
                <label className="email mb-[10px] text-[var(--title-color)] block font-bold">
                  E-mail
                </label>
                <InputRegister
                  value={email}
                  type="email"
                  placeholder="Example@gmail.com"
                  name="email"
                  style=""
                  onChange={handleEmail}
                  RefName={null}
                />
              </div>
              <div className="infield mb-[20px]">
                <label className="password-field mb-[10px] text-[var(--title-color)] block font-bold">
                  Password
                </label>
                <div className="password-container relative">
                  <InputRegister
                    value={password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    style="pd-right"
                    onChange={handlePassword}
                    RefName={null}
                  />
                  {passwordTyped && (
                    <button
                      type="button"
                      className="toggle-password absolute top-[50%] translate-y-[-50%] right-[26px] hover:opacity-[0.7]"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  )}
                </div>
              </div>
              <div className="infield mb-[20px]">
                <label className="confirm-password-field mb-[10px] text-[var(--title-color)] block font-bold ">
                  Confirm Password
                </label>
                <div className="confirm-password-container relative">
                  <InputRegister
                    value={ConfirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    name="Confirm password"
                    placeholder="Confirm Password"
                    style="pd-right"
                    onChange={handleConfirmPassword}
                    RefName={null}
                  />
                  {ConfirmpasswordTyped && (
                    <button
                      type="button"
                      className="toggle-confirm-password absolute top-[50%] translate-y-[-50%] right-[26px] hover:opacity-[0.7]"
                      onClick={toggleShowConfirmPassword}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  )}
                </div>
              </div>
              <div className="form-checkbox mb-[120px] flex items-center">
                <input className="checkbox mr-[10px]" type="checkbox" />
                <label className="terms-conditions RM text-[var(--first-color)] text-[14px] font-bold cursor-pointer">
                  I agree to the Terms & Conditions
                </label>
              </div>
              <Link href="#">
                <div className="btn-register text-center mb-[20px]">
                  <button className="pt-[12px] pb-[12px] pl-[10px] pr-[10px] bg-[var(--first-color)] text-[var(--white-color)] rounded-[5px] cursor-pointer w-[100%] outline-none hover:bg-[var(--white-color)] hover:text-[var(--first-color)] hover:outline-[1px] hover:outline-[var(--first-color)]">
                    Register
                  </button>
                </div>
              </Link>
              <Link href="/login">
                <div className="btn-login text-center mt-[20px]">
                  <button className="pt-[12px] pb-[12px] pl-[10px] pr-[10px] bg-[var(--white-color)] text-[var(--second-color)] rounded-[5px] cursor-pointer w-[100%] outline-1 outline outline-[var(--second-color)] hover:bg-[var(--second-color)] hover:outline-[var(--white-color)] hover:text-[--white-color]">
                    Login
                  </button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0, 0, 0, 0.6)] hidden">
        <div className="modalContainer w-[500px] h-[500px] m-[auto] bg-[var(--white-color)] rounded-[5px]">
          <h3 className="modal-close">
            <i className="flex text-right justify-end cursor-pointer text-[var(--title-color)] text-[35px] p-[10px]">
              <IoClose />
            </i>
          </h3>
          <h2 className="text-[20px] font-bold text-[var(--first-color)] flex text-center justify-center">
            <i className="text-[30px] pr-[10px]">
              <IoDocumentTextOutline />
            </i>
            Term and conditions
          </h2>
          <h1 className="text-[var(--title-color)] p-[10px]">
            Please read these terms and conditions carefully before using our
            services:
          </h1>
          <p className="text-[var(--title-color)] p-[10px]">
            1. Acceptance of Terms: By accessing or using any part of our
            service, you agree to abide by these terms and conditions. If you do
            not agree to any part of these terms, please refrain from using the
            service immediately.<br></br> 2. Compliance with Laws: You agree to
            comply with all applicable laws when using our service and accept
            responsibility for your own conduct.<br></br> 3. Privacy: We are
            committed to protecting your personal information in accordance with
            our Privacy Policy. By using our service, you consent to the
            collection, use, and disclosure of your personal information as
            outlined in the Privacy Policy.<br></br> 4. Changes to Terms: We
            reserve the right to change or update these terms and conditions at
            any time without prior notice.
          </p>
        </div>
      </div>
    </div>
  );
}
