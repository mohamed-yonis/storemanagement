// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';
import SalesManagement from './pages/SalesManagement';
import Reports from './pages/Reports';

const App = () => {
    return (
        <Router>
            <Routes> {/* Replace Switch with Routes */}
                <Route path="/" element={<Login />} /> {/* Use element prop instead of component */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="/sales" element={<SalesManagement />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </Router>
    );
};

export default App;
