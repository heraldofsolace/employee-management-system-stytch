import Link from "next/link";
import React from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex-1">
        <a className="font-black font-mono text-xl">EMS-STYTCH</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
