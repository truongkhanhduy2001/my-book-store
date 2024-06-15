"use client";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import { FaTrashAlt } from "react-icons/fa";
import Paginate from "@/app/components/paginate/paginate";
import { useState, useLayoutEffect } from "react";

export default function UserTab() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 2; // Limit for admin page

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `/api/admin/getUser?page=${currentPage}&limit=${limit}`
      );
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setTotalUsers(data.totalUsers);
        if (data.users.length == 0) {
          setCurrentPage(data.totalPages);
        }
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useLayoutEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/admin/getUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      const data = await response.json();
      if (data.success) {
        setUsers((prevUsers: any) =>
          prevUsers.filter((user: any) => user._id !== id)
        );
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

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
                {users.map((user: any) => (
                  <tr key={user._id} className="border-b">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <div>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-500 hover:underline text-[17px] mt-[2px]"
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
        {totalUsers > limit && (
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
