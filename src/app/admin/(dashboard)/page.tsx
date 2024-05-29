import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import UserTab from "@/app/components/UserTab/UserTab";

export default function HomeAdmin() {
  return (
    <>
      <DefaultLayout>
        <UserTab />
      </DefaultLayout>
    </>
  );
}
