"use client";
import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (values: any, setSubmitting: any) => {
    setError(null);
    try {
      fetch("/api/admin/loginAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          setSubmitting(false);
          if (data.status === 200) {
            Cookie.set("TOKEN-ADMIN", data.token, {
              sameSite: "strict",
              secure: true,
              path: "/",
              expires: 7,
            });
            // Check for success flag
            router.push("/admin");
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
    name: Yup.string().required("Please enter your Name"),
    password: Yup.string()
      .required("Please enter your Password")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <div className="flex items-center justify-center bg-[var(--BG)] h-[100vh]">
      <div className="max-w-[500px] p-[40px] w-[100%] bg-[var(--white-color)] border-[1px] border-solid border-[var(--title-color)] rounded-[5px]">
        <p className="text-[var(--title-color)] font-bold text-[20px] mt-[5px] mb-[50px] text-center">
          Login to admin account
        </p>
        <Formik
          initialValues={{
            name: "",
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
                <label className="name mb-[10px] text-[var(--title-color)] block font-bold">
                  User name
                </label>
                <Field
                  className="w-[100%] p-[10px] border-[1px] border-solid border-[var(--text-color)] rounded-[5px] bg-[var(--white-color)] text-[var(--title-color)] transition-colors duration-[300ms] ease"
                  type="text"
                  name="name"
                  placeholder="User name"
                  autoComplete="username"
                />
                <ErrorMessage
                  className="text-[red]"
                  component="div"
                  name="name"
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
              {error && <div className="text-[red] mb-[20px]">{error}</div>}
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
      </div>
    </div>
  );
}
