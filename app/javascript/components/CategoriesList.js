// app/javasctipt/components/SuppliersList.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faEdit, faTrashAlt, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchCategories, createCategory, deleteCategory, updateCategory } from '../redux/categories/categoriesSlice';
import '../../assets/stylesheets/categories.css';

const CategoriesList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  const [successMessage, setSuccessMessage] = useState('');

  const clearSuccessMessage = () => {
    setSuccessMessage('');
  };

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch the CSRF token from the meta tag
    const token = document.querySelector('meta[name="csrf-token"]').content;
  
    if (successMessage) {
      const timer = setTimeout(clearSuccessMessage, 3000);
      return () => clearTimeout(timer);
    }

    setCsrfToken(token);
    dispatch(fetchCategories());
  }, [dispatch, successMessage]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [newCategory, setNewCategory] = useState({
    category_name: '',
  });

  const [updatedCategory, setUpdatedCategory] = useState({
    id: null,
    category_name: ''
  });

  const handleEditClick = (category) => {
    setUpdatedCategory({
      id: category.id,
      category_name: category.category_name
    });

    // Open the update modal
    const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    updateModal.show();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...updatedCategory,
      authenticity_token: csrfToken, // Include the CSRF token in the form data
    }
    dispatch(updateCategory({ categoryId: updatedCategory.id, formData })).then(() => {
      setUpdatedCategory({
        id: null,
        category_name: ''
      });
    });

    setSuccessMessage('Category updated successfully');
  };

  const handleDeleteClick = (categoryId) => {
    dispatch(deleteCategory(categoryId));
    setSuccessMessage('Category deleted successfully');
  };

  const handleEllipsisClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const closeMenu = () => {
    setSelectedCategoryId(null);
  };

  const handleNewInputChange = (e) => {
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdateInputChange = (e) => {
    setUpdatedCategory((prevCategory) => ({
      ...prevCategory,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...newCategory,
      authenticity_token: csrfToken, // Include the CSRF token in the form data
    }
    dispatch(createCategory(formData)).then(() => {
      setNewCategory({
        category_name: ''
      });
    });

    setSuccessMessage('Category created successfully');
  };

  if (loading) {
    return <div className="loading-status">Loading...</div>;
  }

  if (error) {
    return <div className="loading-status">Error: {error}</div>;
  }

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Categories</h1>

        {successMessage && <div className="success-message">{successMessage}</div>}

        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add New Category</button>
      </div>

      {/* New Category Modal*/}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Add New Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              
              {/* New Category Form */}
              <form className="form-content" onSubmit={handleSubmit}>
                <input type="text" required className="form-control" name="category_name" placeholder="Category Name" value={newCategory.category_name} onChange={handleNewInputChange} />
    
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Category</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Update Category Modal*/}
      <div className="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true" onHide={() => setUpdatedSupplier({ id: null, category_name: '' })}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateModalLabel">Update Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {/* Update Category Form */}
              <form className="form-content" onSubmit={handleEditSubmit}>
                <input type="text" required className="form-control" name="category_name" placeholder="Category Name" value={updatedCategory.category_name} onChange={handleUpdateInputChange} />

                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update Category</button>
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
                      <th>Category Name</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {categories.map((category) => (
                      <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.category_name}</td>

                          <td>
                              {selectedCategoryId === category.id ? (
                                  <div className="menu">
                                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(category)} />
                                  <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteClick(category.id)} />
                                  <FontAwesomeIcon icon={faTimes} onClick={closeMenu} />
                                  </div>
                              ) : (
                                  <FontAwesomeIcon className="ellipsis" icon={faEllipsisV} onClick={() => handleEllipsisClick(category.id)} />
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

export default CategoriesList;