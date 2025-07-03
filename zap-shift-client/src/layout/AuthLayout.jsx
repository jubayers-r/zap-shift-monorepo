import React from "react";
import authImg from "../assets/authImage.png";
import { Outlet } from "react-router";
import Logo from "../pages/Home/shared/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className=" grid grid-cols-2 items-center ">
      <div className="h-screen w-10/11 mx-auto ">
        <Logo/>
        <Outlet />
      </div>
      <div className="bg-[#fafdf0] w-full h-screen flex items-center justify-center">
        <img src={authImg} className="w-150 " />
      </div>
    </div>
  );
};

export default AuthLayout;
