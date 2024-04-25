"use client"

import { useRouter } from "next/navigation";
import { stytchFingerprintLookup } from "../lib/dfpActions";
import Loading from "../components/Loader";
import React, { useState } from 'react';

const Profile = ({ name, slug }) => {
    const public_token = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN;
    const welcome = name ? `Welcome, ${name}!` : `Welcome!`

    const router = useRouter();
    const [loader, setLoader] = useState(false);

    const checkFingerPrint = async (e) => {
        e.preventDefault();

        try {
            setLoader(true)
            const telemetry_id = await GetTelemetryID(public_token);
            const { verdict } = await stytchFingerprintLookup({ telemetry_id })
            if (verdict?.action === 'ALLOW') {
                router.push(`/${slug}/profile/update`)
            }
            if (verdict?.action === 'BLOCK') {
                router.push(`/login`)
            }
            if (verdict?.action === 'CHALLENGE') {
                router.push(`/challenge?next_path=${slug}/profile/update`)
            }
        } catch (error) {
            setLoader(false)
            router.push(`/${slug}/profile`);
        }
    };

    return loader ? <Loading /> : (

        <div className="w-4/5 m-3 p-8 py-16 justify-center items-center">
            <div className="flex flex-row">
                <div className="media-body px-4 flex flex-col-reverse">
                    <p className="text-2xl">{welcome}</p>
                </div>
            </div>
            <div className="col m-3 p-1 justify-center items-center">
                <div className="col-md-5 mx-auto">
                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="px-4 py-3">
                            <h3 className="text-lg font-semibold align-top mb-6">Bank Information</h3>
                            <div className="flex items-center mt-0">
                                <p className="mr-2 font-semibold">Account type: </p>
                                <p> Savings </p>
                            </div>
                            <div className="flex items-center mb-0">
                                <p className="mr-2 font-semibold">Account number: </p>
                                <p> 00789657 </p>
                            </div>
                            <div className="flex items-center mb-0">
                                <p className="mr-2 font-semibold">Bank name: </p>
                                <p>Top Savings Bank</p>
                            </div>
                        </div>
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mt-6">
                                    <button className="btn btn-outline-dark btn-sm btn-block" onClick={checkFingerPrint}>Edit profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
