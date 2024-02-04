import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
// import SuppliersList from './SuppliersList';
import UsersList from './UsersList';
// import CategoriesList from './CategoriesList';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UsersList />
        {/* <CategoriesList /> */}
        {/* <SuppliersList /> */}
      </div>
    </Provider>
  );
};

export default App;
