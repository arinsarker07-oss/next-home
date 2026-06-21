import HeroBanner from "@/components/Home/banner";
import CustomerReviews from "@/components/Home/CustomerReviews";
import TopLocations from "@/components/Home/TopLocations";
import TrustedOwners from "@/components/Home/TrustedOwners";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div >
      <HeroBanner />
      <WhyChooseUs />
      <CustomerReviews />
      <TopLocations />
      <TrustedOwners />
    </div>
  );
}
