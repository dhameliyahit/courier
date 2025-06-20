import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const Branch = () => {
  const { name: center } = useParams();
  const [centerData, setCenterData] = useState(null);

  const fetchCenterDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/centers/${center}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      if (data.centers && data.centers.length > 0) {
        setCenterData(data.centers[0]);
      } else {
        alert("No center found with the provided name.");
      }
    } catch (error) {
      console.error("Error fetching center details:", error);
      alert("Failed to fetch center details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCenterDetail();
  }, [center]);

  return (
    <Layout>
      <div className="bg-gray-100 min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-2xl w-full">
          {/* Header */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-orange-600 uppercase tracking-wide">Center Detail</h1>
          </div>

          {/* Center Details */}
          {centerData ? (
            <div className="space-y-4 text-gray-800 text-base">
              <div>
                <span className="font-semibold">Name:</span>{' '}
                <span className="text-lg text-blue-700 font-bold">{centerData.name}</span>
              </div>
              <div>
                <span className="font-semibold">Address:</span>{' '}
                {centerData.address}
              </div>
              <div>
                <span className="font-semibold">Pincode:</span>{' '}
                {centerData.pincode}
              </div>
              <div>
                <span className="font-semibold">Phone Number:</span>{' '}
                {centerData.phoneNumber}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{' '}
                <a href={`mailto:${centerData.email}`} className="text-blue-600 underline">
                  {centerData.email}
                </a>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading center details...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Branch;
