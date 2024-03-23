"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./register.css";
import { IoDocumentTextOutline, IoClose } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import InputRegister from "@/app/components/inputRegister/register";

export default function Register() {
  const [Text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

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
  };
  const handleConfirmPassword = (e: any) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <div className="form-container-register">
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel-overlay-left">
            <Image
              src="/images/picture1.png"
              alt="image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            ></Image>
          </div>
          <div className="overlay-panel-overlay-right">
            <form className="form-register">
              <div>
                <i>
                  <FaBookOpen />
                </i>
              </div>
              <h1>Create an account</h1>
              <div className="infield">
                <label className="name">Full Name</label>
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
              <div className="infield">
                <label className="email">E-mail</label>
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
              <div className="infield">
                <label className="password-field">Password</label>
                <InputRegister
                  value={password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  style=""
                  onChange={handlePassword}
                  RefName={null}
                />
              </div>
              <div className="infield">
                <label className="confirm-password-field">
                  Confirm Password
                </label>
                <InputRegister
                  value={ConfirmPassword}
                  type="password"
                  name="Confirm password"
                  placeholder="Confirm Password"
                  style=""
                  onChange={handleConfirmPassword}
                  RefName={null}
                />
              </div>
              <div className="form-checkbox">
                <input className="checkbox" type="checkbox"></input>
                <label className="terms-conditions RM">
                  I agree to the Terms & Conditions
                </label>
              </div>
              <div className="btn-register">
                <button>Register</button>
              </div>
              <Link href="/pages/accounts/login">
                <div className="btn-login">
                  <button>Login</button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className="modal">
        <div className="modalContainer">
          <h3 className="modal-close">
            <i>
              <IoClose />
            </i>
          </h3>
          <h2>
            <i>
              <IoDocumentTextOutline />
            </i>
            Term and conditions
          </h2>
          <h1>
            Please read these terms and conditions carefully before using our
            services:
          </h1>
          <p>
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
