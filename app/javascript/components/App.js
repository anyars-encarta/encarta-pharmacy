import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import SuppliersList from '../components/SuppliersList';
// import User from './User';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <SuppliersList />
      </div>
    </Provider>
  );
};

export default App;
