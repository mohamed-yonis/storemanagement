// frontend/src/pages/Reports.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
    const [salesReports, setSalesReports] = useState([]);

    useEffect(() => {
        fetchSalesReports();
    }, []);

    const fetchSalesReports = async () => {
        const response = await axios.get('http://localhost:5000/api/reports/sales', {
            headers: { Authorization: localStorage.getItem('token') }
        });
        setSalesReports(response.data);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-blue-600">Reports</h2>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Sales Reports</h3>
            <ul>
                {salesReports.map((report, index) => (
                    <li key={index} className="p-4 bg-gray-100 rounded mb-2 shadow-md">
                        Product ID: {report.product_id}, Quantity Sold: {report.quantity}, Total Price: {report.total_price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reports;
