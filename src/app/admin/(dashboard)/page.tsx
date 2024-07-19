"use client";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import { FaLock, FaUnlock } from "react-icons/fa";
import Paginate from "@/app/components/paginate/paginate";
import { useState, useLayoutEffect } from "react";

export default function UserTab() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 7; // Limit for admin page

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `/api/admin/getUser?page=${currentPage}&limit=${limit}`
      );
      const data = await response.json();

      if (data.status === 200) {
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

  const handleLock = async (id: any) => {
    try {
      const response = await fetch("/api/admin/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, action: "lock" }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setUsers((prevUsers: any) =>
          prevUsers.map((user: any) =>
            user._id === id ? { ...user, locked: true } : user
          )
        );
      }
    } catch (error) {
      console.error("Failed to lock user:", error);
    }
  };

  const handleUnlock = async (id: any) => {
    try {
      const response = await fetch("/api/admin/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, action: "unlock" }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setUsers((prevUsers: any) =>
          prevUsers.map((user: any) =>
            user._id === id ? { ...user, locked: false } : user
          )
        );
      }
    } catch (error) {
      console.error("Failed to unlock user:", error);
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
                        {user.locked ? (
                          <button
                            onClick={() => handleUnlock(user._id)}
                            className="text-yellow-500 hover:underline text-[17px] mt-[2px]"
                          >
                            <FaLock />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleLock(user._id)}
                            className="text-green-500 hover:underline text-[17px] mt-[2px]"
                          >
                            <FaUnlock />
                          </button>
                        )}
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
