"use client";

import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import Image from "next/image";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";
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
              priority={true}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            ></Image>
          </div>
          <div className="overlay-panel-overlay-right">
            <form className="from-login">
              <div>
                <i>
                  <FaBookOpen />
                </i>
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
