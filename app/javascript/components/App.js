import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
// import SuppliersList from './SuppliersList';
// import UsersList from './UsersList';
// import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <SuppliersList /> */}
        {/* <UsersList /> */}
        {/* <CategoriesList /> */}
        <ProductsList />
      </div>
    </Provider>
  );
};

export default App;
