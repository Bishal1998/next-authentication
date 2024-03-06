import React from "react";

interface IHeader {
  title: string;
  subtitle: string;
}

const Header: React.FC<IHeader> = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="font-semibold text-[40px] text-[#313131] pt-8">{title}</h2>
      <p className="text-base text-[#7b7a7a] pb-8">{subtitle}</p>
    </div>
  );
};

export default Header;
