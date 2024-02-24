'use client'

import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { getOrganizations, createNewOrganizationn } from "../../lib/authActions";
import notify from '../../lib/toasts';
import 'react-toastify/dist/ReactToastify.css';

const DiscoveryPage = () => {

  const [formData, setFormData] = useState({ organization_name: "" });
  const [discoveredOrganizations, setDiscoveredOrganizations] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { discovered_organizations } = await getOrganizations();
        setDiscoveredOrganizations(discovered_organizations)
      } catch (error) {
        notify({
          message: error.message,
          display: true,
          type: "error"
        });
      }
    };
    fetchData();
  }, []);

  const createOrganization = async (event) => {
    event.preventDefault();
    try {
      await createNewOrganizationn(formData)
    } catch (e) {
      notify({
        message: e.message,
        display: true,
        type: "error"
      })
    }
  }

  return (
    <div className="h-[calc(100vh-60px)] bg-base-300 w-full flex flex-col justify-center items-center ">
      <div className="w-1/2 p-6 m-auto mb-4 bg-white rounded-md shadow-md flex flex-col justify-center items-center ring-2 ring-gray-800/50 lg:max-w-lg">
        <h3 className='text-lg align-top mb-6'>Your Organizations</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Membership</th>
              </tr>
            </thead>
            <tbody>
              {discoveredOrganizations.map(({ organization }) => (
                <tr key={organization.organization_id} className="text-right hover">
                  <Link href={`/api/discovery/${organization.organization_id}`}>
                    <td>{organization.organization_name}</td>
                    <td className="text-right">{organization.organization_name}</td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-1/2 p-6 m-auto mt-4 bg-white rounded-md shadow-md flex flex-col justify-center items-center ring-2 ring-gray-800/50 lg:max-w-lg">
        <h3 className='text-lg align-top mb-6'>Create new organization</h3>
        <form className="space-y-4">
          <div className='flex flex-row justify-center items-center'>
            <input
              id="name"
              name="name"
              type="name"
              placeholder="Organization name"
              className="w-full input input-bordered h-1.7 mr-2"
              onChange={(e) => handleInputChange('organization_name', e.target.value)}
            />
            <button className="btn btn-md text-sm ml-2" onClick={createOrganization}>Create</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default DiscoveryPage;
