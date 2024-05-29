import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function List() {
  const products = [
    {
      id: 1,
      title: "Dune",
      author: "Duy",
      genre: "Adventure, Comedy, Comic",
      description:
        "Chào mừng bạn đến với thế giới của Dune, một cuốn sách phiêu lưu, hài hước và truyện tranh. Đây là một câu chuyện về",
      time: "new",
      price: "$100",
      discount: "$20",
      year: "2024",
      stock: "10",
      language: "English",
      pageCount: "316",
      isBestSeller: false,
      isNewArrival: false,
      isDiscount: false,
    },
    // Add more products as needed
  ];

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Product List" />
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-[var(--title-color)]">
              <thead>
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">Author</th>
                  <th className="p-4 text-left">Genre</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Time</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Discount</th>
                  <th className="p-4 text-left">Year</th>
                  <th className="p-4 text-left">Stock</th>
                  <th className="p-4 text-left">Language</th>
                  <th className="p-4 text-left">Count</th>
                  <th className="p-4 text-left">Tags</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-4 !relative">
                      <Image
                        className="max-w-[100px] w-[100%] h-[auto] !relative"
                        src="/images/biasach1.png"
                        alt="Main Image"
                        fill
                        priority={true}
                        sizes="(max-with: 768px)100vw"
                      />
                    </td>
                    <td className="p-4">{product.title}</td>
                    <td className="p-4">{product.author}</td>
                    <td className="p-4">{product.genre}</td>
                    <td className="p-4">
                      <div className="truncate max-w-[200px]">
                        {product.description}
                      </div>
                    </td>
                    <td className="p-4">{product.time}</td>
                    <td className="p-4">{product.price}</td>
                    <td className="p-4">{product.discount}</td>
                    <td className="p-4">{product.year}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">{product.language}</td>
                    <td className="p-4">{product.pageCount}</td>
                    <td className="p-4">
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
                      <Link href="#">
                        <button
                          // onClick={() => handleEdit(product.id)}
                          className="text-blue-500 hover:underline ml-2"
                        >
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        // onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:underline ml-2"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
