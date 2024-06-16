"use client";
import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./login.css";
import Image from "next/image";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (values: any, setSubmitting: any) => {
    setError(null);
    setSubmitting(true);
    try {
      fetch("/api/users/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          setSubmitting(false);
          if (data.success) {
            Cookie.set("TOKEN-USER", data.token, {
              sameSite: "strict",
              secure: true,
              path: "/",
              expires: 7,
            });
            // Check for success flag
            router.push("/");
          } else {
            // Handle login failure
            setError(data.message);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  // validate
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your Email"),
    password: Yup.string().required("Please enter your Password"),
  });

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
            <div className="from-login max-w-[500px] p-[40px] w-[100%] bg-[var(--BG)]">
              <div className="first:flex">
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
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values, setSubmitting);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="infield mb-[20px]">
                      <label className="email mb-[10px] text-[var(--title-color)] block font-bold">
                        E-mail
                      </label>
                      <Field
                        className="w-[100%] p-[10px] border-[1px] border-solid border-[var(--text-color)] rounded-[5px] bg-[var(--white-color)] text-[var(--title-color)] transition-colors duration-[300ms] ease"
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                      />
                      <ErrorMessage
                        className="text-[red]"
                        component="div"
                        name="email"
                      />
                    </div>
                    <div className="infield mb-[20px]">
                      <label className="password-field mb-[10px] text-[var(--title-color)] block font-bold">
                        Password
                      </label>
                      <Field
                        className="w-[100%] p-[10px] border-[1px] border-solid border-[var(--text-color)] rounded-[5px] bg-[var(--white-color)] text-[var(--title-color)] transition-colors duration-[300ms] ease"
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                      <ErrorMessage
                        className="text-[red]"
                        component="div"
                        name="password"
                      />
                    </div>
                    {error && (
                      <div className="text-[red] mb-[20px]">{error}</div>
                    )}
                    <button
                      className="pt-[12px] mt-[50px] pb-[12px] pl-[10px] pr-[10px] bg-[var(--first-color)] text-[var(--white-color)] rounded-[5px] cursor-pointer w-[100%] outline-none hover:bg-[var(--white-color)] hover:text-[var(--first-color)] hover:outline-[1px] hover:outline-[var(--first-color)] hover:rounded-[20px]"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Login..." : "Login"}
                    </button>
                  </Form>
                )}
              </Formik>
              <Link href="/register">
                <div className="btn-register text-center mt-[20px]">
                  <button className="pt-[12px] pb-[12px] pl-[10px] pr-[10px] bg-[var(--white-color)] text-[var(--second-color)] rounded-[5px] cursor-pointer w-[100%] outline-1 outline outline-[var(--second-color)] hover:bg-[var(--second-color)] hover:outline-[var(--white-color)] hover:text-[--white-color] hover:rounded-[20px]">
                    Register
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
