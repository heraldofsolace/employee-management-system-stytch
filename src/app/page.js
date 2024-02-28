"use client"

import Link from "next/link";
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  return (
    <div className="h-[calc(100vh-60px)] bg-base-300 w-full flex flex-row justify-center items-center space-y-9">
      <div className="w-1/2 p-6 m-auto lg:max-w-lg">
        <h2 className="font-mono text-2xl text-right">Streamlining workforce management with our powerful Employee Management System.</h2>
        <p className='font-light text-sm italic text-right leading-loose'>Protected by Stytch's Device Fingerprinting (DFP)</p>
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div className="w-1/2 p-6 m-auto bg-white rounded-md shadow-md flex flex-col space-y-4 justify-center items-center ring-2 ring-gray-800/50 lg:max-w-lg">
        <a href={"/login"}><button className="btn btn-wide">Log in</button></a>
        <Link className="btn btn-wide" href={"/register"}>Sign Up</Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
