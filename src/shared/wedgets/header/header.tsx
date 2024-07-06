
"use client"
import Link from 'next/link';
import React from 'react';
import Logo from './logo';
import NavItems from './navs-items';
import Toolbar from './Toolbar';

function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md flex items-center justify-between h-16 px-10 text-black">
      <div>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <nav className="hidden md:flex">
        <NavItems />
      </nav>
      <div className="md:flex items-center">
        <Toolbar />
      </div>
    </header>
  );
}

export default Header;
