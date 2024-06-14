"use client";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import { FaTrashAlt } from "react-icons/fa";
import Paginate from "@/app/components/paginate/paginate";

export default function UserTab() {
  const users = [
    {
      id: 1,
      name: "Trương Khánh Duy",
      email: "truongkhanhduy@gmail.com",
    },
    // Add more products as needed
  ];

  return (
    <>
      <Breadcrumb pageName="User List" />
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-[var(--title-color)]">
              <thead>
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
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
        <Paginate />
      </div>
    </>
  );
}
