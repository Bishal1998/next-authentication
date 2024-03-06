import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between items-center my-8">
      {children}
      <div>Hello World</div>
    </div>
  );
};

export default AuthLayout;
