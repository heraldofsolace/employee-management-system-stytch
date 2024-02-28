"use client"

import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import notify from '../lib/toasts';
import 'react-toastify/dist/ReactToastify.css';

const ProfileUpdate = () => {

    const [formData, setFormData] = useState({
        account_name: "",
        account_number: "",
        bank_name: ""
    });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="h-[calc(100vh-60px)] bg-base-300 w-full flex flex-col justify-center items-center space-y-9">
            <div className="w-1/2 p-6 m-auto mt-4 bg-white rounded-md shadow-md flex flex-col justify-center items-center ring-2  ring-gray-800/50 lg:max-w-lg">
                <h3 className='text-lg align-top mb-6'>Update bank details</h3>
                <form className="space-y-4">
                    <div className='flex flex-row justify-center items-center'>
                        <input
                            id="name"
                            name="name"
                            type="name"
                            placeholder="Bank name"
                            className="w-full input input-bordered h-1.7 mr-2"
                            onChange={(e) => handleInputChange('bank_name', e.target.value)}
                        />
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        <input
                            id="name"
                            name="name"
                            type="name"
                            placeholder="Account number"
                            className="w-full input input-bordered h-1.7 mr-2"
                            onChange={(e) => handleInputChange('account_number', e.target.value)}
                        />
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        <input
                            id="name"
                            name="name"
                            type="name"
                            placeholder="Account name"
                            className="w-full input input-bordered h-1.7 mr-2"
                            onChange={(e) => handleInputChange('account_name', e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-md text-sm ml-2">Update</button>
                </form>
            </div >
            <ToastContainer />
        </div >
    )
}

export default ProfileUpdate;
