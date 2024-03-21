"use client";

import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import Image from "next/legacy/image";
import Link from "next/link";
import InputLogin from "@/app/components/inputLogin/Login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const RefEmail: any = useRef(null);
  useEffect(() => {
    RefEmail.current.focus();
  }, []);

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  return (
    <div className="form-container-login">
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel-overlay-left">
            <Image
              src="/images/picture1.png"
              alt="image"
              layout="fill"
              priority={true}
            ></Image>
          </div>
          <div className="overlay-panel-overlay-right">
            <form className="from-login">
              <div>
                <Image
                  className="logo"
                  src="/images/logo.png"
                  alt="image"
                  layout="fill"
                ></Image>
              </div>
              <h1>Welcome back!</h1>
              <p>Login to your account</p>
              <div className="infield">
                <label className="email">E-mail</label>
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
              <div className="infield">
                <label className="password-field">Password</label>
                <InputLogin
                  value={password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  style=""
                  onChange={handlePassword}
                  RefEmail={null}
                />
              </div>
              <div className="form-checkbox">
                <input className="checkbox" type="checkbox"></input>
                <label className="RM">Remember Me</label>
              </div>
              <div className="btn-login">
                <button>Login</button>
              </div>
              <Link href="/pages/accounts/register">
                <div className="btn-register">
                  <button>Register</button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
