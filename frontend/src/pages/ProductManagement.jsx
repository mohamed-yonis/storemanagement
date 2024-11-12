import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductManagement.css';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/products', {
            headers: { Authorization: localStorage.getItem('token') }
        });
        setProducts(response.data);
    };

    const addProduct = async (e) => {
        e.preventDefault();
        const newProduct = { name, price };
        await axios.post('http://localhost:5000/api/products', newProduct, {
            headers: { Authorization: localStorage.getItem('token') }
        });
        fetchProducts();
        setName('');
        setPrice('');
    };

    return (
        <div className="product-management-container">
            <h2 className="text-3xl font-bold text-blue-600">Product Management</h2>
            <form onSubmit={addProduct} className="product-form mb-4 flex">
                <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <button type="submit">Add Product</button>
            </form>

            <button className="bg-blue-600 text-white p-2 rounded" onClick={() => setShowModal(true)}>
                View All Products
            </button>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-semibold mb-4">Product List</h3>
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            className="bg-red-500 text-white p-2 rounded mt-4"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
