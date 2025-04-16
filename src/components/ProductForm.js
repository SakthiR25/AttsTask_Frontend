import React, { useState, useEffect } from 'react';
import './ProductForm.css'; // Ensure this is included
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa'; // For edit, delete, and preview icons
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        category: '',
        manufactureDate: '',
        image: null,
    });

    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const [products, setProducts] = useState([]); // Initialize with an empty array
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Define how many items per page to show
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' }); // Sorting state
    const BASE_URL = 'http://localhost:5000/api/products'; // API base URL
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Fetch products from backend when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(BASE_URL);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        // Allow only alphabets and spaces
        const namePattern = /^[A-Za-z\s]*$/;

        if (name === "name") {
            if (!namePattern.test(value)) {
                return; // Don't update state if input is invalid
            }
        }
        // Allow only numbers (including decimals if needed)
        if (name === "price" && !/^\d*\.?\d*$/.test(value)) {
            return; // Don't update state if input is invalid
        }
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('price', formData.price);
        formDataToSubmit.append('stock', formData.stock);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('category', formData.category);
        formDataToSubmit.append('manufactureDate', formData.manufactureDate);
        if (formData.image) {
            formDataToSubmit.append('image', formData.image);
        }

        try {
            if (isEditing) {
                // EDIT logic
                const response = await axios.put(`${BASE_URL}/${editId}`, formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setProducts(products.map((p) => (p._id === editId ? response.data : p)));
                setIsEditing(false);
                setEditId(null);
            } else {
                // CREATE logic
                const response = await axios.post(BASE_URL, formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setProducts([...products, response.data]);
            }

            setFormData({
                name: '',
                price: '',
                stock: '',
                description: '',
                category: '',
                manufactureDate: '',
                image: null,
            });
            setShowForm(false);

            Swal.fire({
                title: 'Success!',
                text: `Product ${isEditing ? 'updated' : 'created'} successfully.`,
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page when search changes
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Pagination Logic
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const currentItems = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleEdit = async (product) => {
        setFormData(product);
        setEditId(product._id);
        setIsEditing(true);
        setShowForm(true);

    };

    const handleDelete = async (productId) => {
        Swal.fire({
            title: 'Deleted!',
            text: 'Product deleted successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        try {
            await axios.delete(`${BASE_URL}/${productId}`);
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="product-form-container">
            <h3>Jewellery Products</h3>

            {/* Button to show form */}
            <button
                className="btn btn-primary add-product-btn"
                onClick={() => setShowForm(true)} // Show form when clicked
            >
                Add Product
            </button>

            {/* Modal Popup */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowForm(false)}>
                            &times; {/* Close button */}
                        </button>
                        <h4>{isEditing ? 'Edit Product' : 'Create Product'}</h4>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-row">
                                <label>Product Name:</label>
                                <input name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <label>Price:</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <label>Stock:</label>
                                <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <label>Category:</label>
                                <input name="category" value={formData.category} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <label>Manufacturing:</label>
                                <input type="date" name="manufactureDate" value={formData.manufactureDate} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <label>Image:</label>
                                <input type="file" name="image" onChange={handleChange} accept="image/*" />
                            </div>
                            <div className="form-row">
                                <label>Description:</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} required />
                            </div>
                            <button className="btn btn-success" type="submit">{isEditing ? 'Update' : 'Submit'}</button>
                        </form>

                    </div>
                </div>
            )}

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search Products"
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            {/* Product Table */}
            <div className="product-table-container">
                <h4>Product List</h4>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')}>Name</th>    
                            <th onClick={() => handleSort('price')}>Price</th>
                            <th onClick={() => handleSort('stock')}>Stock</th>
                            <th onClick={() => handleSort('category')}>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>{product.category}</td>
                               
                                <td style={{ position: "relative" }}>
                                    {product.imageUrl && (
                                        <div className="image-hover-container">
                                            <img
                                                src={`http://localhost:5000/uploads/${product.imageUrl}`}
                                                alt={product.name}
                                                width="50"
                                            />
                                            <div className="image-hover-preview">
                                                
                                                <img
                                                    src={`http://localhost:5000/uploads/${product.imageUrl}`}
                                                    alt={product.name}
                                                    width="200"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </td>

                                <td>
                                    {/* <FaEye className="icon" /> */}
                                    <FaEdit className="icon" onClick={() => handleEdit(product)} />
                                    <FaTrashAlt className="icon" onClick={() => handleDelete(product._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        &#8249;
                    </button>

                    {currentPage > 3 && (
                        <>
                            <button onClick={() => setCurrentPage(1)}>1</button>
                            {currentPage > 4 && <span className="dots">...</span>}
                        </>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                            page =>
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 2 && page <= currentPage + 2)
                        )
                        .map(page => (
                            <button
                                key={page}
                                className={currentPage === page ? 'active-page' : ''}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                    {currentPage < totalPages - 2 && (
                        <>
                            {currentPage < totalPages - 3 && <span className="dots">...</span>}
                            <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
                        </>
                    )}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        &#8250;
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductForm;
