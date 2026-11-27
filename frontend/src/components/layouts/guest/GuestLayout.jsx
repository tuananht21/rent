import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "../../common/Loading";

const GuestLayout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Outlet />
      <Footer />
    </Suspense>
  );
};

export default GuestLayout;