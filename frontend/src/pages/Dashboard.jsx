import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Dashboard.css';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Dashboard = () => {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Sales',
                data: [100, 200, 150, 300, 250, 400],
                borderColor: '#1e3a8a',
                backgroundColor: 'rgba(30, 58, 138, 0.5)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="main-content">
                    <div className="dashboard-overview">
                        <div className="bg-white rounded-lg shadow p-6 flex-1">
                            <h2 className="text-2xl font-bold text-blue-700 mb-4">Dashboard Overview</h2>
                            <p className="text-gray-700 mb-4">Welcome to the Store Management System Dashboard.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="content-card">
                                    <h3 className="text-xl font-semibold text-blue-800">Products</h3>
                                    <p className="text-gray-700 mt-2">Manage products and stock levels.</p>
                                </div>
                                <div className="content-card">
                                    <h3 className="text-xl font-semibold text-blue-800">Sales</h3>
                                    <p className="text-gray-700 mt-2">Track and process sales transactions.</p>
                                </div>
                                <div className="content-card">
                                    <h3 className="text-xl font-semibold text-blue-800">Reports</h3>
                                    <p className="text-gray-700 mt-2">Generate reports on sales and inventory.</p>
                                </div>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="chart-card">
                            <h3 className="text-xl font-semibold text-blue-800 mb-4">Sales Overview</h3>
                            <div className="chart-container">
                                <Line data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
