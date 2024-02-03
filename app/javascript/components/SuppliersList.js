// app/javasctipt/components/SuppliersList.js

import React, { useEffect } from 'react';
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuppliersList;