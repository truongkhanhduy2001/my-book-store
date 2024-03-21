"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./register.css";
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
              sizes="100vw"
            ></Image>
          </div>
          <div className="overlay-panel-overlay-right">
            <form className="form-register">
              <div>
                <Image
                  className="logo-register"
                  src="/images/logo.png"
                  alt="image"
                  width={100}
                  height={100}
                ></Image>
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
          <h3 className="modal-close">Tat cho nay</h3>
          <p></p>
        </div>
      </div>
    </div>
  );
}
