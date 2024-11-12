import React from 'react';
import { Link } from 'react-router-dom';
// import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <nav className="flex flex-col space-y-4">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/products">Products</Link>
                <Link to="/sales">Sales</Link>
                <Link to="/reports">Reports</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
