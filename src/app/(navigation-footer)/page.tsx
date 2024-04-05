import Banner from "../components/banner/banner";
import Services from "../components/serviced/services";
import Seller from "../components/seller/seller";
import Arrival from "../components/arrival/arrival";
import Discount from "../components/discount/discount";
import Newsletter from "../components/newsletter/newsletter";

export default function Home() {
  return (
    <>
      <Banner />
      <Services />
      {/* Best Seller */}
      <Seller />
      {/* End Best Seller */}
      {/* New Arrivals */}
      <Arrival />
      {/* End Arrivals */}
      {/* Books list */}
      <Discount />
      {/* End Books List */}
      <Newsletter />
    </>
  );
}
