import React from "react";


const Header = () => {
  
  return (
    <nav className={`z-50 fixed top-0 left-0 right-0  shadow-md flex justify-between items-center p-2 bg-blue-gray-1000 } `}>
      <h1 className={`text-xl font-bold tracking-wide `}></h1>
      <div className="space-x-6">
        <a href="#home" className={`hover:text-blue-400 transition duration-300 text-white}`}>Home</a>
        <a href="#about" className={`hover:text-blue-400 transition duration-300 text-white' }`}>About</a>
        <a href="#projects" className={`hover:text-blue-400 transition duration-300 text-white }`}>Projects</a>
        <a href="#contact" className={`hover:text-blue-400 transition duration-300 text-white }`}>Contact</a>
      </div>
    </nav>
  );
};

export default Header;
