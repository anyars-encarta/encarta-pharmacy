// app/javasctipt/components/SuppliersList.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faEdit, faTrashAlt, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchSuppliers, createSupplier } from '../redux/suppliers/suppliersSlice';
import '../../assets/stylesheets/suppliers.css';

const SuppliersList = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const loading = useSelector((state) => state.suppliers.loading);
  const error = useSelector((state) => state.suppliers.error);

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch the CSRF token from the meta tag
    const token = document.querySelector('meta[name="csrf-token"]').content;
  
    setCsrfToken(token);
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  const [newSupplier, setNewSupplier] = useState({
    supplier_name: '',
    address: '',
    phone_number: '',
    supplier_email: ''
  });

  const handleEditClick = (supplierId) => {
    // Handle edit logic here
    console.log('Edit Supplier ID:', supplierId);
  };

  const handleDeleteClick = (supplierId) => {
    // Handle delete logic here
    console.log('Delete Supplier ID:', supplierId);
  };

  const handleEllipsisClick = (supplierId) => {
    setSelectedSupplierId(supplierId);
  };

  const closeMenu = () => {
    setSelectedSupplierId(null);
  };

  const handleInputChange = (e) => {
    setNewSupplier((prevSupplier) => ({
      ...prevSupplier,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...newSupplier,
      authenticity_token: csrfToken, // Include the CSRF token in the form data
    }
    dispatch(createSupplier(formData)).then(() => {
      setNewSupplier({
        supplier_name: '',
        address: '',
        phone_number: '',
        supplier_email: ''
      });
    });
  };

  if (loading) {
    return <div className="loading-status">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="supplier-container">
      <div className="supplier-header">
        <h1>Suppliers</h1>
        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add New Supplier</button>
      </div>

      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Add New Supplier</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <form className="form-content" onSubmit={handleSubmit}>
                <input type="text" required className="form-control" name="supplier_name" placeholder="Supplier Name" value={newSupplier.supplier_name} onChange={handleInputChange} />
                <input type="text" className="form-control" name="address" placeholder="Address" value={newSupplier.address} onChange={handleInputChange}/>
                <input type="text" className="form-control" name="phone_number" placeholder="Phone Number" value={newSupplier.phone_number} onChange={handleInputChange}/>
                <input type="email" className="form-control" name="supplier_email" placeholder="Email" value={newSupplier.supplier_email} onChange={handleInputChange}/>
      
                <button type="submit" class="btn btn-primary">Add Supplier</button>
              </form>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
          <table className="table table-success table-striped">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Supplier Name</th>
                      <th>Address</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {suppliers.map((supplier) => (
                      <tr key={supplier.id}>
                          <td>{supplier.id}</td>
                          <td>{supplier.supplier_name}</td>
                          <td>{supplier.address}</td>
                          <td>{supplier.phone_number}</td>
                          <td>{supplier.supplier_email}</td>

                          <td>
                              {selectedSupplierId === supplier.id ? (
                                  <div className="menu">
                                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(supplier.id)} />
                                  <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteClick(supplier.id)} />
                                  <FontAwesomeIcon icon={faTimes} onClick={closeMenu} />
                                  </div>
                              ) : (
                                  <FontAwesomeIcon className="ellipsis" icon={faEllipsisV} onClick={() => handleEllipsisClick(supplier.id)} />
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

export default SuppliersList;