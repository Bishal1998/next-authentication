import Slider from "@/components/Carousel";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center my-8 gap-20">
      {children}
      <Slider />
    </div>
  );
};

export default AuthLayout;
