import { Menu } from "lucide-react";
import React, { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    let mobileMenu = null;
    if (isMenuOpen) {
        mobileMenu = (
            <ul id="mobile-menu" className="absolute top-0 left-0 flex flex-col items-center text-white p-4 space-y-4 md:hidden z-50">
                <li><a href="#" onClick={openMenu}>Home</a></li>
                <li><a href="#expertise" onClick={openMenu}>Expertise</a></li>
                <li><a href="#work" onClick={openMenu}>Work Experience</a></li>
                <li><a href="#projects" onClick={openMenu}>Projects</a></li>
                <li><a href="#contact" onClick={openMenu}>Contact me</a></li>
            </ul>
        );
    }

    return (
        <header>
            <nav className="absolute top-0 left-0 w-full p-5 z-50">
                {/* Burger Menu Button for Mobile View */}
                <button className="md:hidden" onClick={openMenu}>
                    <Menu className="w-10 h-10 text-white mr-5 hover:bg-blue-400 cursor-pointer" />
                </button>

                {/* Desktop Menu */}
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