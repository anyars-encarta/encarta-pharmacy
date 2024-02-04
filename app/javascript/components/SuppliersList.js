// app/javasctipt/components/SuppliersList.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faEdit, faTrashAlt, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchSuppliers, createSupplier, deleteSupplier, updateSupplier } from '../redux/suppliers/suppliersSlice';
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

  const [updatedSupplier, setUpdatedSupplier] = useState({
    id: null,
    supplier_name: '',
    address: '',
    phone_number: '',
    supplier_email: ''
  });

  const handleEditClick = (supplier) => {
    setUpdatedSupplier({
      id: supplier.id,
      supplier_name: supplier.supplier_name,
      address: supplier.address,
      phone_number: supplier.phone_number,
      supplier_email: supplier.supplier_email
    });

    // Open the update modal
    const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    updateModal.show();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...updatedSupplier,
      authenticity_token: csrfToken, // Include the CSRF token in the form data
    }
    dispatch(updateSupplier({ supplierId: updatedSupplier.id, formData })).then(() => {
      setUpdatedSupplier({
        id: null,
        supplier_name: '',
        address: '',
        phone_number: '',
        supplier_email: ''
      });
    });
  };

  const handleDeleteClick = (supplierId) => {
    dispatch(deleteSupplier(supplierId));
  };

  const handleEllipsisClick = (supplierId) => {
    setSelectedSupplierId(supplierId);
  };

  const closeMenu = () => {
    setSelectedSupplierId(null);
  };

  const handleNewInputChange = (e) => {
    setNewSupplier((prevSupplier) => ({
      ...prevSupplier,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdateInputChange = (e) => {
    setUpdatedSupplier((prevSupplier) => ({
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
    return <div className="loading-status">Error: {error}</div>;
  }

  return (
    <div className="supplier-container">
      <div className="supplier-header">
        <h1>Suppliers</h1>
        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add New Supplier</button>
      </div>

      {/* New Supplier Modal*/}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Add New Supplier</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              
              {/* New Supplier Form */}
              <form className="form-content" onSubmit={handleSubmit}>
                <input type="text" required className="form-control" name="supplier_name" placeholder="Supplier Name" value={newSupplier.supplier_name} onChange={handleNewInputChange} />
                <input type="text" className="form-control" name="address" placeholder="Address" value={newSupplier.address} onChange={handleNewInputChange}/>
                <input type="text" className="form-control" name="phone_number" placeholder="Phone Number" value={newSupplier.phone_number} onChange={handleNewInputChange}/>
                <input type="email" className="form-control" name="supplier_email" placeholder="Email" value={newSupplier.supplier_email} onChange={handleNewInputChange}/>
      
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Supplier</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Update Supplier Modal*/}
      <div className="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true" onHide={() => setUpdatedSupplier({ id: null, supplier_name: '', address: '', phone_number: '', supplier_email: '' })}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateModalLabel">Update Supplier</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {/* Updated Supplier Form */}
              <form className="form-content" onSubmit={handleEditSubmit}>
                <input type="text" required className="form-control" name="supplier_name" placeholder="Supplier Name" value={updatedSupplier.supplier_name} onChange={handleUpdateInputChange} />
                <input type="text" className="form-control" name="address" placeholder="Address" value={updatedSupplier.address} onChange={handleUpdateInputChange} />
                <input type="text" className="form-control" name="phone_number" placeholder="Phone Number" value={updatedSupplier.phone_number} onChange={handleUpdateInputChange} />
                <input type="email" className="form-control" name="supplier_email" placeholder="Email" value={updatedSupplier.supplier_email} onChange={handleUpdateInputChange} />

                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update Supplier</button>
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
                                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(supplier)} />
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