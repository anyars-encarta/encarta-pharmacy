// app/javasctipt/components/ProductsList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faEdit, faTrashAlt, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchProducts, createProduct, deleteProduct, updateProduct } from '../redux/products/productsSlice';
import { fetchCategories } from '../redux/categories/categoriesSlice';
// import '../../assets/stylesheets/products.css';

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories); // Fetch categories from Redux store
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const [successMessage, setSuccessMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State to track the selected category

  const clearSuccessMessage = () => {
    setSuccessMessage('');
  };

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Fetch the CSRF token from the meta tag
    const token = document.querySelector('meta[name="csrf-token"]').content;
    
    if (successMessage) {
      const timer = setTimeout(clearSuccessMessage, 3000);
      return () => clearTimeout(timer);
    }

    setCsrfToken(token);
    dispatch(fetchProducts());
  }, [dispatch, successMessage]);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_code: '',
    category_id: '',
    weight: '',
    pack_quantity: 0,
    unit_packing: 0,
    total_quantity: 0,
    reorder_level: 0,
    unit_cost: 0,
    retail_selling_price: 0,
    wholesale_selling_price: 0,
    expiry_date: '',
    shelving: '',
    search_key: ''
  });

  const [updatedProduct, setUpdatedProduct] = useState({
    id: null,
    product_name: '',
    product_code: '',
    category_id: '',
    weight: '',
    pack_quantity: 0,
    unit_packing: 0,
    total_quantity: 0,
    reorder_level: 0,
    unit_cost: 0,
    retail_selling_price: 0,
    wholesale_selling_price: 0,
    expiry_date: '',
    shelving: '',
    search_key: ''
  });

  const handleEditClick = (product) => {
    setUpdatedProduct({
      id: product.id,
      product_name: product.product_name,
      product_code: product.product_code,
      category_id: product.category_id,
      weight: product.weight,
      pack_quantity: product.pack_quantity,
      unit_packing: product.unit_packing,
      total_quantity: product.total_quantity,
      reorder_level: product.reorder_level,
      unit_cost: product.unit_cost,
      retail_selling_price: product.retail_selling_price,
      wholesale_selling_price: product.wholesale_selling_price,
      expiry_date: product.expiry_date,
      shelving: product.shelving,
      search_key: product.search_key
    });

    // Open the update modal
    const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    updateModal.show();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...updatedProduct,
      category_id: selectedCategory, // Include the selected category ID in the form data
      authenticity_token: csrfToken, // Include the CSRF token in the form data
    }
    dispatch(updateProduct({ productId: updatedProduct.id, formData })).then(() => {
      setUpdatedProduct({
        id: null,
        product_name: '',
        product_code: '',
        category_id: '',
        weight: '',
        pack_quantity: 0,
        unit_packing: 0,
        total_quantity: 0,
        reorder_level: 0,
        unit_cost: 0,
        retail_selling_price: 0,
        wholesale_selling_price: 0,
        expiry_date: '',
        shelving: '',
        search_key: ''
      });
    });

    setSuccessMessage('Product updated successfully');
  };

  const handleDeleteClick = (productId) => {
    dispatch(deleteProduct(productId));
    setSuccessMessage('Product deleted successfully');
  };

  const handleEllipsisClick = (productId) => {
    setSelectedProductId(productId);
  };

  const closeMenu = () => {
    setSelectedProductId(null);
  };

  const handleNewInputChange = (e) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdateInputChange = (e) => {
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...newProduct,
      category_id: selectedCategory, // Include the selected category ID in the form data
      authenticity_token: csrfToken, // Include the CSRF token in the form data
    }
    dispatch(createProduct(formData)).then(() => {
      setNewProduct({
        product_name: '',
        product_code: '',
        category_id: '',
        weight: '',
        pack_quantity: 0,
        unit_packing: 0,
        total_quantity: 0,
        reorder_level: 0,
        unit_cost: 0,
        retail_selling_price: 0,
        wholesale_selling_price: 0,
        expiry_date: '',
        shelving: '',
        search_key: ''
      });
      setSelectedCategory(''); // Reset selected category after submission
    });
   
    setSuccessMessage('Product created successfully');
  };

  if (loading) {
    return <div className="loading-status">Loading...</div>;
  }

  if (error) {
    return <div className="loading-status">Error: {error}</div>;
  }

  return (
    <div className="supplier-container">
      <div className="supplier-header">
        <h1>Products</h1>

        {successMessage && <div className="success-message">{successMessage}</div>}

        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add New Product</button>
      </div>

      {/* New Product Modal*/}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Add New Product</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              
              {/* New Product Form */}
              <form className="form-content" onSubmit={handleSubmit}>
                <input type="text" required className="form-control mb-3" name="product_name" placeholder="Product Name" value={newProduct.product_name} onChange={handleNewInputChange} />
                <input type="text" className="form-control mb-3" name="product_code" placeholder="Product Code" value={newProduct.product_code} onChange={handleNewInputChange}/>
                
                {/* Add a dropdown to select a category */}
                <label htmlFor="category_id" className="form-label">Category:</label>
                <select className="form-control mb-3" name="category_id" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.category_name}</option>
                  ))}
                </select>

                <input type="text" className="form-control mb-3" name="weight" placeholder="Weight" value={newProduct.weight} onChange={handleNewInputChange}/>
                
                <label htmlFor="pack_quantity" className="form-label">Pack Quantity:</label>
                <input type="number" className="form-control mb-3" name="pack_quantity" placeholder="Pack Quantity" value={newProduct.pack_quantity} onChange={handleNewInputChange}/>
                
                <label htmlFor="unit_packing" className="form-label">Unit Packing:</label>
                <input type="number" className="form-control mb-3" name="unit_packing" placeholder="Unit Packing" value={newProduct.unit_packing} onChange={handleNewInputChange}/>
                
                <label htmlFor="total_quantity" className="form-label">Total Quantity:</label>
                <input type="number" className="form-control mb-3" name="total_quantity" placeholder="Total Quantity" value={newProduct.total_quantity} onChange={handleNewInputChange}/>
                
                <label htmlFor="reorder_level" className="form-label">Re-order Level:</label>
                <input type="number" className="form-control mb-3" name="reorder_level" placeholder="Reorder Level" value={newProduct.reorder_level} onChange={handleNewInputChange}/>
                
                <label htmlFor="unit_cost" className="form-label">Unit Cost:</label>
                <input type="number" className="form-control mb-3" name="unit_cost" placeholder="Unit Cost" value={newProduct.unit_cost} onChange={handleNewInputChange}/>
                
                <label htmlFor="retail_selling_price" className="form-label">Retail Selling Price:</label>
                <input type="number" className="form-control mb-3" name="retail_selling_price" placeholder="Retail Selling Price" value={newProduct.retail_selling_price} onChange={handleNewInputChange}/>
                
                <label htmlFor="wholesale_selling_price" className="form-label">Wholesale Selling Price:</label>
                <input type="number" className="form-control mb-3" name="wholesale_selling_price" placeholder="Wholesale Selling Price" value={newProduct.wholesale_selling_price} onChange={handleNewInputChange}/>
                
                <label htmlFor="expiry_date" className="form-label">Expiry Date:</label>
                <input type="date" className="form-control mb-3" name="expiry_date" placeholder="Expiry Date" value={newProduct.expiry_date} onChange={handleNewInputChange}/>
                
                <input type="text" className="form-control mb-3" name="shelving" placeholder="Shelving" value={newProduct.shelving} onChange={handleNewInputChange}/>
                <textarea className="form-control mb-3" name="search_key" placeholder="Search Key" value={newProduct.search_key} onChange={handleNewInputChange}/>

                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Update Product Modal*/}
      <div className="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true" onHide={() => setUpdatedProduct({ id: null, product_name: '',product_code: '', category_id: '', weight: '', pack_quantity: 0, unit_packing: 0, total_quantity: 0, reorder_level: 0, unit_cost: 0, retail_selling_price: 0, wholesale_selling_price: 0, expiry_date: '', shelving: '', search_key: '' })}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateModalLabel">Update Product</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {/* Update Product Form */}
              <form className="form-content" onSubmit={handleEditSubmit}>
                <input type="text" required className="form-control mb-3" name="product_name" placeholder="Product Name" value={updatedProduct.product_name} onChange={handleUpdateInputChange} />
                <input type="text" className="form-control mb-3" name="product_code" placeholder="Product Code" value={updatedProduct.product_code} onChange={handleUpdateInputChange} />
                
                {/* Add a dropdown to select a category */}
                <label htmlFor="category_id" className="form-label">Category:</label>
                <select className="form-control mb-3" name="category_id" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.category_name}</option>
                  ))}
                </select>
                
                <input type="text" className="form-control mb-3" name="weight" placeholder="Weight" value={updatedProduct.weight} onChange={handleUpdateInputChange} />
                
                <label htmlFor="pack_quantity" className="form-label">Pack Quantity:</label>
                <input type="number" className="form-control mb-3" name="pack_quantity" placeholder="Pack Quantity" value={updatedProduct.pack_quantity} onChange={handleUpdateInputChange} />
                
                <label htmlFor="unit_packing" className="form-label">Unit Packing:</label>
                <input type="number" className="form-control mb-3" name="unit_packing" placeholder="Unit Packing" value={updatedProduct.unit_packing} onChange={handleUpdateInputChange} />
                
                <label htmlFor="total_quantity" className="form-label">Total Quantity:</label>
                <input type="number" className="form-control mb-3" name="total_quantity" placeholder="Total Quantity" value={updatedProduct.total_quantity} onChange={handleUpdateInputChange} />
                
                <label htmlFor="reorder_level" className="form-label">Re-order Level:</label>
                <input type="number" className="form-control mb-3" name="reorder_level" placeholder="Reorder Level" value={updatedProduct.reorder_level} onChange={handleUpdateInputChange} />
                
                <label htmlFor="unit_cost" className="form-label">Unit Cost:</label>
                <input type="number" className="form-control mb-3" name="unit_cost" placeholder="Unit Cost" value={updatedProduct.unit_cost} onChange={handleUpdateInputChange} />
                
                <label htmlFor="retail_selling_price" className="form-label">Retail Selling Price:</label>
                <input type="number" className="form-control mb-3" name="retail_selling_price" placeholder="Retail Selling Price" value={updatedProduct.retail_selling_price} onChange={handleUpdateInputChange} />
                
                <label htmlFor="wholesale_selling_price" className="form-label">Wholesale Selling Price:</label>
                <input type="number" className="form-control mb-3" name="wholesale_selling_price" placeholder="Wholesale Selling Price" value={updatedProduct.wholesale_selling_price} onChange={handleUpdateInputChange} />
                
                <label htmlFor="expiry_date" className="form-label">Expiry Date:</label>
                <input type="date" className="form-control mb-3" name="expiry_date" placeholder="Expiry Date" value={updatedProduct.expiry_date} onChange={handleUpdateInputChange} />
                
                <input type="text" className="form-control mb-3" name="shelving" placeholder="Shelving" value={updatedProduct.shelving} onChange={handleUpdateInputChange} />
                <textarea className="form-control mb-3" name="search_key" placeholder="Search Key" value={updatedProduct.search_key} onChange={handleUpdateInputChange} />

                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
          <table className="table table-success table-striped">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      <th>Product Code</th>
                      <th>Category</th>
                      <th>Weight</th>
                      <th>Pack Qty</th>
                      <th>Unit Pack</th>
                      <th>Total Qty</th>
                      <th>Reorder Level</th>
                      <th>Unit Cost</th>
                      <th>R. Selling Px</th>
                      <th>W. Selling Px</th>
                      <th>Expiry Date</th>
                      <th>Shelving</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {products.map((product) => (
                      <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.product_name}</td>
                          <td>{product.product_code}</td>
                          <td>
                            {categories.map((category) => {
                              if (category.id === product.category_id) {
                                return category.category_name;
                              }
                              return null;
                            })}
                          </td>
                          <td>{product.weight}</td>
                          <td>{product.pack_quantity}</td>
                          <td>{product.unit_packing}</td>
                          <td>{product.total_quantity}</td>
                          <td>{product.reorder_level}</td>
                          <td>{product.unit_cost}</td>
                          <td>{product.retail_selling_price}</td>
                          <td>{product.wholesale_selling_price}</td>
                          <td>{product.expiry_date}</td>
                          <td>{product.shelving}</td>

                          <td>
                              {selectedProductId === product.id ? (
                                  <div className="menu">
                                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(product)} />
                                  <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteClick(product.id)} />
                                  <FontAwesomeIcon icon={faTimes} onClick={closeMenu} />
                                  </div>
                              ) : (
                                  <FontAwesomeIcon className="ellipsis" icon={faEllipsisV} onClick={() => handleEllipsisClick(product.id)} />
                              )}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default ProductsList;