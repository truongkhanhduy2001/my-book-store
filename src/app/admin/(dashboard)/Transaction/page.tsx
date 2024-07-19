"use client";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import Paginate from "@/app/components/paginate/paginate";
import { useState, useLayoutEffect } from "react";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import Modal from "@/app/components/modal/modal";

export default function TransactionTab() {
  const [transactions, setTransactions] = useState([]) as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null) as any;
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const response = await fetch(`/api/admin/orderAdmin?id=${id}`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (data.status === 200) {
          alert("Transaction deleted successfully");
          fetchTransactions(); // Refresh the list after deletion
        } else {
          console.error("Failed to delete transaction:", data.message);
          alert("Failed to delete transaction");
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("An error occurred while deleting the transaction");
      }
    }
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

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
                    <td className="p-4">
                      <div className="flex justify-center items-center space-x-4">
                        <button
                          onClick={() => handleViewOrder(transaction)}
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                        >
                          <FaEye className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction._id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </div>
                    </td>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedOrder && (
          <div className="text-[var(--title-color)]">
            <h3 className="text-lg font-bold mt-4 mb-2">Ordered Items:</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Product</th>
                  <th className="text-left">Quantity</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.listOrder.map((item: any) => (
                  <tr key={item._id}>
                    <td>{item.productId.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  );
}
