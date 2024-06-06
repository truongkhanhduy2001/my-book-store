"use client";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import Paginate from "@/app/components/paginate/paginate";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  image: string;
  name: string;
  author: string;
  genre: string;
  description: string;
  time: string;
  price: number;
  discount: number;
  year: number;
  stock: number;
  language: string;
  pageCount: number;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isDiscount: boolean;
}

export default function List() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
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

  const handleViewDetail = (id: string) => {
    router.push(`/admin/Product/Detail/${id}`);
  };

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
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <DefaultLayout>
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
                {products.map((product) => (
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
                    <td className="p-4 flex flex-col justify-center text-center mt-[50px]">
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
                      <div className="flex space-x-2">
                        <button
                          // Xử lý sự kiện khi nút "Xem chi tiết" được nhấn
                          onClick={() => handleViewDetail(product._id)}
                          className="text-green-500 hover:underline ml-2" // Định kiểu cho nút
                        >
                          <FaEye />
                        </button>
                        <Link href="#">
                          <button
                            // onClick={() => handleEdit(product.id)}
                            className="text-blue-500 hover:underline ml-2"
                          >
                            <FaEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 hover:underline ml-2"
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
    </DefaultLayout>
  );
}