import { Menu } from "lucide-react";
import React, { useState } from "react";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("MenuOpen: " + isMenuOpen);
  }

  let mobileMenu = null;
  if (isMenuOpen){
    mobileMenu = (
      <ul className="flex flex-col items-center bg-gray-800 text-white p-4 space-y-4 md:hidden">
        <li><a href="#">Home</a></li>
        <li><a href="#expertise">Expertise</a></li>
        <li><a href="#work">Work Experience</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact me</a></li>
      </ul>
    );
  }

  return (
    <header>
      <nav className="p-10">

        <button className="md:hidden" onClick={openMenu}>
          <Menu className="w-10 h-10 text-white mr-5 hover:bg-blue-400 cursor-pointer"></Menu>
        </button>

        <ul className="hidden md:flex justify-center list-none">
          <li className="mx-[30px] my-0"><a href="#">Home</a></li>
          <li className="mx-[30px] my-0"><a href="#expertise">Expertise</a></li>
          <li className="mx-[30px] my-0"><a href="#work">Work Experience</a></li>
          <li className="mx-[30px] my-0"><a href="#projects">Projects</a></li>
          <li className="mx-[30px] my-0"><a href="#contact">Contact me</a></li>
        </ul>
      </nav>

      {mobileMenu}
    </header>
  );
}
  
export default Header;