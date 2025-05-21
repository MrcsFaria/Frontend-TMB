import React from 'react';
import Logo from '../assets/images/logo.png';

const Faixa: React.FC = () => {
  return <div className="flex justify-center items-center bg-black h-[80px] w-full">
    <img src={Logo} alt="Logo" className="h-[55px] w-[120px]" />
  </div>;
};

export { Faixa };
