import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Home/shared/Navbar/Navbar";
import Footer from "../pages/Home/shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#eaeced] dark:bg-black py-7  w-10/11 mx-auto ">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center my-10">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
