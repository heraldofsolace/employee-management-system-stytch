"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../../lib/toasts';
import Profile from '../../../components/Profile';
import { authenticateJwtSession } from '../../../lib/authActions';

const DashboardPage = () => {
    const router = useRouter();
    const [membername, setMemberName] = useState('');
    const [org, setOrg] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { member, organization } = await authenticateJwtSession();
                setMemberName(member.name)
                setOrg(organization)
            } catch (error) {
                notify({
                    message: error.message,
                    display: true,
                    type: "error"
                });

                router.push('/login')

            }
        };
        fetchData();
    }, []);

    return (
        <div className="h-[calc(100vh-60px)] bg-base-300 w-full flex flex-col justify-center items-center space-y-9">
            <Profile name={membername} slug={org.organization_slug}/>
            <ToastContainer />
        </div>
    )
}

export default DashboardPage;