import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalesManagement.css';

const SalesManagement = () => {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state

    useEffect(() => {
        fetchProducts();
        fetchSales();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true); // Start loading
            const response = await axios.get('http://localhost:5000/api/products', {
                headers: { Authorization: localStorage.getItem('token') }
            });
            setProducts(response.data);
            setLoading(false); // Stop loading
        } catch (err) {
            setLoading(false); // Stop loading on error
            setError('Failed to fetch products');
        }
    };

    const fetchSales = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/sales', {
                headers: { Authorization: localStorage.getItem('token') }
            });
            setSales(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError('Failed to fetch sales');
        }
    };
    const handleSale = async (e) => {
        e.preventDefault();
    
        const product = products.find((prod) => prod._id === selectedProduct);
        if (!product) {
            setError('Selected product not found');
            return;
        }
    
        const totalPrice = product.price * parseInt(quantity, 10); // Ensure quantity is an integer
    
        const newSale = {
            product_id: selectedProduct,
            quantity: parseInt(quantity, 10), // Ensure quantity is a number
            total_price: totalPrice, // Calculated total price
        };
    
        console.log('Sending new sale data:', newSale); // Log payload for inspection
    
        try {
            await axios.post('http://localhost:5000/api/sales', newSale, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            fetchSales(); // Refresh sales history
            setSelectedProduct('');
            setQuantity(1);
        } catch (err) {
            setError('Failed to add sale');
            console.error('Error:', err); // Log error for further inspection
        }
    };
    
    
    
    return (
        <div className="sales-management-container">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Sales Management</h2>
            <p className="text-gray-700 mb-6">Process sales, manage inventory, and generate receipts.</p>

            {/* Show error if present */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Loading indicator */}
            {loading && <p className="text-blue-500 mb-4">Loading...</p>}

            {/* Sale Form */}
            <form onSubmit={handleSale} className="sale-form mb-8">
                <h3 className="text-xl font-semibold mb-4">Add New Sale</h3>
                <div className="flex items-center space-x-4 mb-4">
                    <select
                        className="p-2 border rounded"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        required
                    >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                            <option key={product._id} value={product._id}>
                                {product.name} - ${product.price}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        min="1"
                        className="p-2 border rounded"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                        Add Sale
                    </button>
                </div>
            </form>

            {/* Sales History */}
            <div className="sales-table-container">
                <h3 className="text-xl font-semibold mb-4">Sales History</h3>
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th className="border-b p-2">Product</th>
                            <th className="border-b p-2">Quantity</th>
                            <th className="border-b p-2">Total Price</th>
                            <th className="border-b p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale._id}>
                                <td className="border-b p-2">{sale.product_id?.name || 'N/A'}</td>
                                <td className="border-b p-2">{sale.quantity}</td>
                                <td className="border-b p-2">${sale.total_price?.toFixed(2)}</td>
                                <td className="border-b p-2">{new Date(sale.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesManagement;
