"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UpdateProduct({
  params,
}: {
  params: { productId: string };
}) {
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(null);
  const filesRef: any = useRef();
  const router = useRouter();
  const formdata = new FormData();

  useEffect(() => {
    fetch(`/api/admin/productAdmin/?id=${params.productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProduct(data.product);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Error fetching product");
      });
  }, [params.productId]);

  const handleSubmit = (values: any, setSubmitting: any) => {
    setError(null);
    setSubmitting(true);
    formdata.append("file", values.image);
    formdata.append("name", values.name);
    formdata.append("author", values.author);
    formdata.append("genre", values.genre);
    formdata.append("description", values.description);
    formdata.append("time", values.time);
    formdata.append("price", values.price.toString());
    formdata.append("discount", values.discount.toString());
    formdata.append("year", values.year.toString());
    formdata.append("stock", values.stock.toString());
    formdata.append("language", values.language);
    formdata.append("pageCount", values.pageCount.toString());
    formdata.append("isBestSeller", values.isBestSeller ? "true" : "false");
    formdata.append("isNewArrival", values.isNewArrival ? "true" : "false");
    formdata.append("isDiscount", values.isDiscount ? "true" : "false");
    try {
      fetch(`/api/admin/productAdmin/?id=${params.productId}`, {
        method: "PUT",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify({
        //   _id: params.productId, // Ensure the correct _id is being sent
        //   updateData: values,
        // }),
        body: formdata,
      })
        .then((res) => res.json())
        .then((data) => {
          setSubmitting(false);
          if (data.status === 201) {
            setProduct(data.product);
            router.push("/admin/Product/List");
          } else {
            setError(data.message);
          }
        });
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product");
    }
  };

  // Validate
  const productSchema = Yup.object({
    image: Yup.mixed().required("Please choose Book Image"),
    name: Yup.string().required("Please enter Book Title"),
    author: Yup.string().required("Please enter Author Name"),
    genre: Yup.string().required("Please enter Genre"),
    description: Yup.string().required("Please enter Description"),
    time: Yup.string()
      .required("Please enter Time")
      .oneOf(["new", "old"], "Time must be 'new' or 'old'"),
    price: Yup.number()
      .required("Please enter Price")
      .min(0, "Price must be at least 0"),
    discount: Yup.number()
      .required("Please enter Discount Price")
      .min(0, "Discount Price must be at least 0"),
    year: Yup.number()
      .required("Please enter Publication Year")
      .min(1000, "Invalid year")
      .max(new Date().getFullYear(), "Invalid year"),
    stock: Yup.number()
      .required("Please enter Stock Quantity")
      .min(0, "Stock must be at least 0"),
    language: Yup.string().required("Please select Languages"),
    pageCount: Yup.number()
      .required("Please enter Page Count")
      .min(1, "Page Count must be at least 1"),
    isBestSeller: Yup.boolean(),
    isNewArrival: Yup.boolean(),
    isDiscount: Yup.boolean(),
  });

  // Upload
  const handleFileChange = (e: any, setFieldValue: any) => {
    const file = e.target.files[0];
    // const reader: any = new FileReader();
    // reader.onloadend = () => {
    //   setFieldValue("image", reader.result); // Convert to base64 and set to formik state
    // };
    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    setFieldValue("image", file);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav>
          <ol className="flex items-center gap-2">
            <li className="font-medium text-[var(--first-color)] text-[18px]">
              <Link
                href="/admin/Product/List"
                className="text-[20px] text-[var(-first--color)]"
              >
                Back to product list
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="mb-6 text-black text-[18px] text-center font-bold">
          Update product
        </h1>
        <Formik
          initialValues={{
            image: product.image || "",
            name: product.name || "",
            author: product.author || "",
            genre: product.genre || "",
            description: product.description || "",
            time: product.time || "",
            price: product.price || "",
            discount: product.discount || "",
            year: product.year || "",
            stock: product.stock || "",
            language: product.language || "",
            pageCount: product.pageCount || "",
            isBestSeller: product.isBestSeller || false,
            isNewArrival: product.isNewArrival || false,
            isDiscount: product.isDiscount || false,
          }}
          validationSchema={productSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              {/* Book Image */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Book Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  ref={filesRef}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                  onChange={(e: any) => handleFileChange(e, setFieldValue)}
                  accept=".png,.jpg,.jpeg"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
                {product.image && (
                  <div className="mt-[10px] !relative">
                    <Image
                      className="max-w-[100px] w-[100%] h-[auto] !relative"
                      src={product.image}
                      alt="Main Image"
                      fill
                      priority={true}
                      sizes="(max-with: 768px)100vw"
                    />
                  </div>
                )}
              </div>
              {/* Book Title */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Book Title
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Author Name */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="author"
                >
                  Author Name
                </label>
                <Field
                  type="text"
                  id="author"
                  name="author"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Genre */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="genre"
                >
                  Genre
                </label>
                <Field
                  type="text"
                  id="genre"
                  name="genre"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                  placeholder="e.g., Adventure, Comedy, Horror"
                />
                <ErrorMessage
                  name="genre"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                  rows={10}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Time new or old */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="time"
                >
                  Time
                </label>
                <Field
                  type="text"
                  id="time"
                  name="time"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Price */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Discount Price */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="discount"
                >
                  Discount Price
                </label>
                <Field
                  type="number"
                  id="discount"
                  name="discount"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                />
                <ErrorMessage
                  name="discount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Publication Year */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="year"
                >
                  Publication Year
                </label>
                <Field
                  type="number"
                  id="year"
                  name="year"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Stock Quantity */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stock"
                >
                  Stock Quantity
                </label>
                <Field
                  type="number"
                  id="stock"
                  name="stock"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Language */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="language"
                >
                  Language
                </label>
                <Field
                  as="select"
                  id="language"
                  name="language"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                >
                  <option value="" disabled>
                    Choose Languages
                  </option>
                  <option value="English">English</option>
                  <option value="Vietnamese">Vietnamese</option>
                  <option value="Chinese">Chinese</option>
                </Field>
                <ErrorMessage
                  name="language"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Page Count */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="pageCount"
                >
                  Page Count
                </label>
                <Field
                  type="number"
                  id="pageCount"
                  name="pageCount"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
                />
                <ErrorMessage
                  name="pageCount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-wrap mb-6 justify-center items-center">
                {/* Best Seller */}
                <div className="flex items-center mr-6 w-1/3 px-2">
                  <Field
                    type="checkbox"
                    id="isBestSeller"
                    name="isBestSeller"
                    className="mr-2"
                  />
                  <label
                    htmlFor="isBestSeller"
                    className="text-gray-700 text-sm font-bold"
                  >
                    Best Seller
                  </label>
                </div>

                {/* New Arrival */}
                <div className="flex items-center mr-6 w-1/3 px-2">
                  <Field
                    type="checkbox"
                    id="isNewArrival"
                    name="isNewArrival"
                    className="mr-2"
                  />
                  <label
                    htmlFor="isNewArrival"
                    className="text-gray-700 text-sm font-bold"
                  >
                    New Arrival
                  </label>
                </div>

                {/* Discount */}
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    id="isDiscount"
                    name="isDiscount"
                    className="mr-2"
                  />
                  <label
                    htmlFor="isDiscount"
                    className="text-gray-700 text-sm font-bold"
                  >
                    Discount
                  </label>
                </div>
              </div>
              {error && <div className="text-[red]">{error}</div>}
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update book"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
