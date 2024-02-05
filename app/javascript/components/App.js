import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import SuppliersList from './SuppliersList';
import UsersList from './UsersList';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';

const App = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/suppliers" element={<SuppliersList />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
  </>
);

export default App;
