// app/javasctipt/components/SuppliersList.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuppliers } from '../redux/suppliers/suppliersSlice';

const SuppliersList = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const loading = useSelector((state) => state.suppliers.loading);
  const error = useSelector((state) => state.suppliers.error);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Suppliers</h1>
      <table>
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
                    <button onClick={() => handleEditClick(supplier.id)}>Edit</button>
                    <button onClick={() => handleDeleteClick(supplier.id)}>Delete</button>
                    <button onClick={closeMenu}>Close</button>
                  </div>
                ) : (
                  <button onClick={() => handleEllipsisClick(supplier.id)}>&#8942;</button>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuppliersList;