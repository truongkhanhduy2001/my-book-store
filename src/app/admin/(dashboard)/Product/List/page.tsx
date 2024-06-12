"use client";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import Paginate from "@/app/components/paginate/paginate";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { useState, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function List() {
  const [products, setProducts] = useState([]) as any;

  useLayoutEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/admin/productAdmin", {
          method: "GET",
        });
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/admin/productAdmin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      const data = await response.json();
      if (data.success) {
        setProducts((prevProducts: any) =>
          prevProducts.filter((product: any) => product._id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Product List" />
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-[var(--title-color)]">
              <thead>
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">Author</th>
                  <th className="p-4 text-left">Genre</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Discount</th>
                  <th className="p-4 text-left">Stock</th>
                  <th className="p-4 text-left">Tags</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr key={product._id} className="border-b">
                    <td className="p-4 !relative">
                      <Image
                        className="max-w-[100px] w-[100%] h-[auto] !relative"
                        src={product.image}
                        alt="Main Image"
                        fill
                        priority={true}
                        sizes="(max-with: 768px)100vw"
                      />
                    </td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.author}</td>
                    <td className="p-4">{product.genre}</td>
                    <td className="p-4">{product.price}</td>
                    <td className="p-4">{product.discount}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4 text-center">
                      {product.isBestSeller && (
                        <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                          Best Seller
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="inline-block px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                          New Arrival
                        </span>
                      )}
                      {product.isDiscount && (
                        <span className="inline-block px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                          Discount
                        </span>
                      )}
                      {!product.isBestSeller &&
                        !product.isNewArrival &&
                        !product.isDiscount && (
                          <span className="inline-block px-2 py-1 bg-gray-300 text-black text-xs font-semibold rounded-full">
                            No Tags
                          </span>
                        )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 justify-center">
                        <Link href={`/admin/Product/List/See/${product._id}`}>
                          <button className="text-green-500 hover:underline ml-2 text-[20px] flex justify-center">
                            <FaEye />
                          </button>
                        </Link>
                        <Link href={`/admin/Product/List/Edit/${product._id}`}>
                          <button className="text-blue-500 hover:underline ml-2 text-[20px] flex justify-center">
                            <FaEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 hover:underline ml-2 text-[17px] mt-[2px]"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Paginate />
      </div>
    </>
  );
}
