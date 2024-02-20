"use client"

import Register from "../components/Register";
import React from 'react';
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
      <Register />
      <ToastContainer />
    </div>
  );
}

export default Home;
