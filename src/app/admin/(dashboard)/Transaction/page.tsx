import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import TransactionTab from "@/app/components/TransactionTab/TransactionTab";
export default function Transaction() {
  return (
    <>
      <DefaultLayout>
        <TransactionTab />
      </DefaultLayout>
    </>
  );
}
