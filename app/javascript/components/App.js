import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import SuppliersList from './CategoriesList';
import UsersList from './UsersList';
import CategoriesList from './CategoriesList';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <CategoriesList />
      </div>
    </Provider>
  );
};

export default App;
