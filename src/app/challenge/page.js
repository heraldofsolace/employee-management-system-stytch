'use client'

import { ToastContainer } from 'react-toastify';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

import notify from '../../lib/toasts';
import 'react-toastify/dist/ReactToastify.css';

const ChallengePage = () => {

    const searchParams = useSearchParams();
    const page = searchParams.get('next_path');
    const router = useRouter();
    const [data, setData] = useState({ random_text: "" });

    const handleInputChange = (name, value) => {
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.random_text === "Q89Pc7") {
            router.push(page);
        } else {
            notify({
                message: "Verification failed. Try again.",
                display: true,
                type: "error"
            });
        }
    }

    return (
        <div className="hero min-h-[calc(100vh-60px)] bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className='flex flex-col space-y-4 justify-center items-center'>
                            <p className="font-mono">Type the following words to continue: </p>
                            <p className='font-bold line-through italic'>Q89Pc7</p>
                            <input
                                id="random_text"
                                name="random_text"
                                type="text"
                                placeholder="random_text"
                                className="w-full input input-bordered h-1.7 mr-2"
                                onChange={(e) => handleInputChange('random_text', e.target.value)}
                            />
                            <button disabled={data.random_text.length < 1} type="submit" className="btn btn-md btn-outline btn-primary text-sm ml-2">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ChallengePage;
