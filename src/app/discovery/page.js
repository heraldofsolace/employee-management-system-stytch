'use client'

import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { getOrganizations } from "../../lib/authActions";
import { useRouter } from "next/navigation";

import notify from '../../lib/toasts';
import 'react-toastify/dist/ReactToastify.css';

const DiscoveryPage = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({ organization_name: "" });
  const [discoveredOrganizations, setDiscoveredOrganizations] = useState([]);
  const [newOrg, setNewOrg]= useState(discoveredOrganizations.length)

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { discovered_organizations } = await getOrganizations();
        setDiscoveredOrganizations(discovered_organizations);
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
  }, [newOrg]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let res = await fetch('http://localhost:3000/api/discovery/create', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json'
        }
      })
      if (res.ok) {
        notify({
          message: "Organization successfully created!",
          display: true,
          type: "success"
        });
        setNewOrg(discoveredOrganizations.length+1);
      } else {
        let data = await res.json();
        notify({
          message: data.message || "Unable to create new organization.",
          display: true,
          type: "error"
        });
      }
    } catch (error) {
      router.push('/login')
    }
    document.getElementById("SubmitForm").reset();
  }

  return (
    <div className="h-[calc(100vh-60px)] bg-base-300 w-full flex flex-col justify-center items-center ">
      <div className="w-1/2 p-6 max-h-80 m-auto mb-4 bg-white rounded-md shadow-md flex flex-col justify-center items-center ring-2 ring-gray-800/50 lg:max-w-lg">
        <h3 className='text-lg align-top mb-6'>Your Organizations</h3>
        <div className="overflow-x-auto">
          <table className="table w-80">
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              {discoveredOrganizations.map(({ organization }) => (
                <tr key={organization.organization_id} className=" font-medium hover">
                  <Link href={`/api/discovery/${organization.organization_id}`}>
                    <td className='text-justify'>{organization.organization_name}</td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-1/2 p-6 m-auto mt-4 bg-white rounded-md shadow-md flex flex-col justify-center items-center ring-2 ring-gray-800/50 lg:max-w-lg">
        <h3 className='text-lg align-top mb-6'>Create new organization</h3>
        <form id='SubmitForm' autoComplete='off' className="space-y-4" onSubmit={handleSubmit}>
          <div className='flex flex-row justify-center items-center'>
            <input
              id="name"
              name="name"
              placeholder="Organization name"
              className="w-full input input-bordered h-1.7 mr-2"
              onChange={(e) => handleInputChange('organization_name', e.target.value)}
            />
            <button disabled={formData.organization_name.length < 3} type="submit" className="btn btn-md text-sm ml-2">Create</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default DiscoveryPage;
