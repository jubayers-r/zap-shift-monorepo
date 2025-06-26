import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Home/shared/Navbar/Navbar";
import Footer from "../pages/Home/shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-black">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center my-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
