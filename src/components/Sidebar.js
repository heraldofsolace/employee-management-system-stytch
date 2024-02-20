import Link from "next/link";
import React from "react";

const Sidebar = () => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex-none">
                <label htmlFor="my-drawer" className="btn btn-ghost drawer-button flex-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link href="/requests">Requests</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Sidebar;
