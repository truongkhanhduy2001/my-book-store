"use client";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import Paginate from "@/app/components/paginate/paginate";
import { useState, useLayoutEffect } from "react";

export default function TransactionTab() {
  const [transactions, setTransactions] = useState([]) as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const limit = 4;

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `/api/admin/orderAdmin?page=${currentPage}&limit=${limit}`
      );
      const data = await response.json();

      if (data.status === 200) {
        setTransactions(data.orders);
        setTotalPages(data.totalPages);
        setTotalTransactions(data.totalOrders);
        if (data.orders.length === 0) {
          setCurrentPage(data.totalPages);
        }
      } else {
        console.error("Failed to fetch transactions:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useLayoutEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  return (
    <>
      <Breadcrumb pageName="Transaction List" />
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-[var(--title-color)]">
              <thead>
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">User ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Address</th>
                  <th className="p-4 text-left">City</th>
                  <th className="p-4 text-left">District</th>
                  <th className="p-4 text-left">Ward</th>
                  <th className="p-4 text-left">Telephone</th>
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction: any) => (
                  <tr key={transaction._id} className="border-b">
                    <td className="p-4">{transaction._id}</td>
                    <td className="p-4">{transaction.userId}</td>
                    <td className="p-4">{transaction.name}</td>
                    <td className="p-4">{transaction.address}</td>
                    <td className="p-4">{transaction.city}</td>
                    <td className="p-4">{transaction.district}</td>
                    <td className="p-4">{transaction.ward}</td>
                    <td className="p-4">{transaction.telephone}</td>
                    <td className="p-4">{transaction.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {totalTransactions > limit && (
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
