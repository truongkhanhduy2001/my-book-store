"use client";
import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function ProductSee({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<any>(null);
  useLayoutEffect(() => {
    try {
      fetch(`/api/admin/productAdmin/?id=${params.productId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProduct(data.product);
          }
        });
    } catch {
      console.log("Error");
    }
  }, [params.productId]);

  if (!product || Object.keys(product).length === 0) {
    return <div className="text-black text-[25px] text-center">Loading...</div>;
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
          Product Detail
        </h1>
        <div className="!relative mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image:
          </label>
          <Image
            className="max-w-[100px] w-[100%] h-[auto] !relative"
            src={product.image}
            alt="Main Image"
            fill
            priority={true}
            sizes="(max-with: 768px)100vw"
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </span>
          <input
            type="text"
            value={product.name}
            name="name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Author:
          </span>
          <input
            type="text"
            value={product.author}
            name="author"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Genre:
          </span>
          <input
            type="text"
            value={product.genre}
            name="genre"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </span>
          <textarea
            value={product.description}
            name="description"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Time:
          </span>
          <input
            type="text"
            value={product.time}
            name="time"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </span>
          <input
            type="text"
            value={product.price}
            name="price"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Discount:
          </span>
          <input
            type="text"
            value={product.discount}
            name="discount"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Year:
          </span>
          <input
            type="text"
            value={product.year}
            name="year"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Stock:
          </span>
          <input
            type="text"
            value={product.stock}
            name="stock"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Language:
          </span>
          <input
            type="text"
            value={product.language}
            name="language"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>
        <div className="mb-6">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Page Count:
          </span>
          <input
            type="text"
            value={product.pageCount}
            name="pageCount"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[black]"
            readOnly
          />
        </div>

        <div className="flex flex-wrap mb-6 justify-center items-center">
          <div className="flex items-center mr-6 w-1/3 px-2">
            <span className="text-gray-700 text-sm font-bold">
              Best Seller:
            </span>
            <input
              type="checkbox"
              checked={product.isBestSeller}
              name="isBestSeller"
              disabled
            />
          </div>
          <div className="flex items-center mr-6 w-1/3 px-2">
            <span className="text-gray-700 text-sm font-bold">
              New Arrival:
            </span>
            <input
              type="checkbox"
              checked={product.isNewArrival}
              name="isNewArrival"
              disabled
            />
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 text-sm font-bold">Discount:</span>
            <input
              type="checkbox"
              checked={product.isDiscount}
              name="isDiscount"
              disabled
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSee;
