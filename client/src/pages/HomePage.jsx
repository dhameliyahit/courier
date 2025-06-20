import React from 'react'
import Layout from '../components/Layout'
import truckImage from '../asset/truck.jpg'

const  HomePage = () => {
    return (
        <>
            <Layout>
                <div
                    style={{
                        backgroundImage: `url(${truckImage})`,
                        height: "80vh",
                    }}
                    className="relative flex justify-center items-center drop-shadow-2xl bg-cover bg-center bg-no-repeat"
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/70"></div>

                    {/* Foreground content */}
                    <div className="relative z-10 bg-transparent text-white font-sans p-4 sm:p-6 md:p-8 rounded-lg max-w-3xl w-full mx-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">Respected Customers</h2>
                        <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 text-center mb-4">
                            ⚠️ BEWARE OF UPI FRAUD
                        </h3>

                        <p className="font-semibold text-center mb-2 text-sm sm:text-base">
                            Our Company Never Demands Online Payments For Shipment Delivery.
                        </p>

                        <p className="mb-2 text-justify text-sm sm:text-base">
                            <strong>Note:</strong> Some fraudsters are updating their own mobile numbers on Google Maps and other websites as
                            <strong className="text-white"> authorized franchisees of Shree Dhameliya courier</strong>. They call our customers and ask for ₹5–₹10 for shipment delivery.
                        </p>

                        <p className="mb-2 text-justify text-sm sm:text-base">
                            If customers agree, these fraudsters send a fake payment link and steal money from bank accounts.
                        </p>

                        <p className="text-yellow-100 font-semibold mt-4 text-sm sm:text-base">⚠️ Our company never asks for:</p>
                        <ul className="list-disc list-inside text-yellow-100 mb-4 text-sm sm:text-base">
                            <li>Online payments for shipment delivery</li>
                            <li>Bank account details</li>
                            <li>OTP</li>
                            <li>PIN</li>
                        </ul>

                        <p className="text-center text-sm sm:text-base">
                            <strong>Do not trust contact numbers or franchisee details</strong> found on any website other than our
                            <span className="text-white font-semibold"> official website</span>.
                        </p>

                        <div className="flex justify-end">
                            <p className="mt-6 text-2xl sm:text-3xl font-bold text-white">
                                — HD Courier Pvt Ltd
                            </p>
                        </div>
                    </div>
                </div>

            </Layout >
        </>
    )
}

export default HomePage