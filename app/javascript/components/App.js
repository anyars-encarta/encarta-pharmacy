import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
//import SuppliersList from '../components/SuppliersList';
import UsersList from './UsersList';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UsersList />
      </div>
    </Provider>
  );
};

export default App;
