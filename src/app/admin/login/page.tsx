"use client";
import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaBookOpen } from "react-icons/fa";

export default function LoginPage() {
  // validate
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <div className="flex items-center justify-center bg-[var(--BG)]">
      <div className="max-w-[500px] p-[40px] w-[100%] bg-[var(--BG)]">
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
            name: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="infield mb-[20px]">
                <label className="name mb-[10px] text-[var(--title-color)] block font-bold">
                  User Name
                </label>
                <Field
                  className="w-[100%] p-[10px] border-[1px] border-solid border-[var(--text-color)] rounded-[5px] bg-[var(--white-color)] text-[var(--title-color)] transition-colors duration-[300ms] ease"
                  type="text"
                  name="name"
                  placeholder="User name"
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
                />
                <ErrorMessage
                  className="text-[red]"
                  component="div"
                  name="password"
                />
              </div>
              <button
                className="pt-[12px] mt-[50px] pb-[12px] pl-[10px] pr-[10px] bg-[var(--first-color)] text-[var(--white-color)] rounded-[5px] cursor-pointer w-[100%] outline-none hover:bg-[var(--white-color)] hover:text-[var(--first-color)] hover:outline-[1px] hover:outline-[var(--first-color)] hover:rounded-[20px]"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
