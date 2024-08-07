"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import "./register.css";
import { FaBookOpen } from "react-icons/fa";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Please enter your Name")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your Email"),
    password: Yup.string()
      .required("Please enter your Password")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please enter your Confirm Password"),
  });

  const handleSuccessfulAuth = () => {
    const previousUrl = localStorage.getItem("previousUrl");
    if (previousUrl) {
      localStorage.removeItem("previousUrl");
      router.push(previousUrl);
    } else {
      router.push("/");
    }
  };

  // Handle form submission
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setError(null);
    setSubmitting(true);

    try {
      // Register user
      const res = await fetch("/api/users/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      setSubmitting(false);

      if (res.status === 200) {
        Cookie.set("TOKEN-USER", data.token, {
          sameSite: "strict",
          secure: true,
          path: "/",
          expires: 7,
        });

        // Send confirmation email
        await fetch("/api/sendMail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: values.email,
            subject: "Registration Confirmation",
            body: `<p>Hi ${values.name},</p><p>Thank you for registering. Welcome to our platform!</p>`,
          }),
        });

        handleSuccessfulAuth();
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
      setSubmitting(false);
    }
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
            <div className="form-register max-w-[500px] p-[40px] w-[100%] bg-[var(--BG)]">
              <div className="first:flex">
                <i className="flex pb-[20px] m-[auto] text-[100px] text-[var(--first-color)]">
                  <FaBookOpen />
                </i>
              </div>
              <h1 className="text-[var(--title-color)] opacity-[0.7] text-[24px] mb-[20px] text-center">
                Create an account
              </h1>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="infield mb-[20px]">
                      <label className="name mb-[10px] text-[var(--title-color)] block font-bold">
                        Full Name
                      </label>
                      <Field
                        className="w-[100%] p-[10px] border-[1px] border-solid border-[var(--text-color)] rounded-[5px] bg-[var(--white-color)] text-[var(--title-color)] transition-colors duration-[300ms] ease"
                        type="text"
                        name="name"
                        placeholder="Full name"
                        autoComplete="name"
                      />
                      <ErrorMessage
                        className="text-[red]"
                        component="div"
                        name="name"
                      />
                    </div>
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
                      {error && (
                        <div className="text-[red] mb-[20px]">{error}</div>
                      )}
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
                        autoComplete="new-password"
                      />
                      <ErrorMessage
                        className="text-[red]"
                        component="div"
                        name="password"
                      />
                    </div>
                    <div className="infield mb-[20px]">
                      <label className="confirm-password-field mb-[10px] text-[var(--title-color)] block font-bold ">
                        Confirm Password
                      </label>
                      <Field
                        className="w-[100%] p-[10px] border-[1px] border-solid border-[var(--text-color)] rounded-[5px] bg-[var(--white-color)] text-[var(--title-color)] transition-colors duration-[300ms] ease"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                      />
                      <ErrorMessage
                        className="text-[red]"
                        component="div"
                        name="confirmPassword"
                      />
                    </div>
                    <button
                      className="mt-[50px] pt-[12px] pb-[12px] pl-[10px] pr-[10px] bg-[var(--first-color)] text-[var(--white-color)] rounded-[5px] cursor-pointer w-[100%] outline-none hover:bg-[var(--white-color)] hover:text-[var(--first-color)] hover:outline-[1px] hover:outline-[var(--first-color)] hover:rounded-[20px]"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Register..." : "Register"}
                    </button>
                  </Form>
                )}
              </Formik>
              <Link href="/login">
                <div className="btn-login text-center mt-[20px]">
                  <button className="pt-[12px] pb-[12px] pl-[10px] pr-[10px] bg-[var(--white-color)] text-[var(--second-color)] rounded-[5px] cursor-pointer w-[100%] outline-1 outline outline-[var(--second-color)] hover:bg-[var(--second-color)] hover:outline-[var(--white-color)] hover:text-[--white-color] hover:rounded-[20px]">
                    Login
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
