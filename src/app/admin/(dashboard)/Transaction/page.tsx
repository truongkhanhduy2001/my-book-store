import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";

export default function UserTab() {
  const transactions = [
    {
      id: 1,
    },
    // Add more products as needed
  ];

  return (
    <>
      <Breadcrumb pageName="Transaction List" />
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-[var(--title-color)]">
            <thead>
              <tr>
                <th className="p-4 text-left">ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-4">{transaction.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
