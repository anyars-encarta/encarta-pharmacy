// app/javasctipt/components/SuppliersList.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faEdit, faTrashAlt, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchUsers, createUser, deleteUser, updateUser } from '../redux/users/usersSlice';
import '../../assets/stylesheets/users.css';

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch the CSRF token from the meta tag
    const token = document.querySelector('meta[name="csrf-token"]').content;
  
    setCsrfToken(token);
    dispatch(fetchUsers());
  }, [dispatch]);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const [newUser, setNewUser] = useState({
    full_name: '',
    username: '',
    access_level_id: ''
  });

  const [updatedUser, setUpdatedUser] = useState({
    id: null,
    full_name: '',
    username: '',
    access_level_id: ''
  });

  const handleEditClick = (user) => {
    setUpdatedUser({
      id: user.id,
      full_name: user.full_name,
      username: user.username,
      access_level_id: user.access_level_id
    });

    // Open the update modal
    const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    updateModal.show();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...updatedUser,
      authenticity_token: csrfToken, // Include the CSRF token in the form data
    }
    dispatch(updateUser({ userId: updatedUser.id, formData })).then(() => {
      setUpdatedUser({
        id: null,
        full_name: '',
        username: '',
        access_level_id: ''
      });
    });
  };

  const handleDeleteClick = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEllipsisClick = (userId) => {
    setSelectedUserId(userId);
  };

  const closeMenu = () => {
    setSelectedUserId(null);
  };

  const handleNewInputChange = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdateInputChange = (e) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...newUser,
      authenticity_token: csrfToken, // Include the CSRF token in the form data
    }
    dispatch(createUser(formData)).then(() => {
      setNewUser({
        full_name: '',
        username: '',
        access_level_id: ''
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
    <div className="user-container">
      <div className="user-header">
        <h1>Users</h1>
        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add New User</button>
      </div>

      {/* New User Modal*/}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Add New User</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              
              {/* New User Form */}
              <form className="form-content" onSubmit={handleSubmit}>
                <input type="text" required className="form-control" name="full_name" placeholder="Full Name" value={newUser.full_name} onChange={handleNewInputChange} />
                <input type="text" className="form-control" name="username" placeholder="Username" value={newUser.username} onChange={handleNewInputChange}/>
                <input type="number" className="form-control" name="access_level_id" placeholder="Access Level ID" value={newUser.access_level_id} onChange={handleNewInputChange}/>
      
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add User</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Update User Modal*/}
      <div className="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true" onHide={() => setUpdatedSupplier({ id: null, full_name: '', username: '', access_level_id: '' })}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateModalLabel">Update User</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {/* Update User Form */}
              <form className="form-content" onSubmit={handleEditSubmit}>
                <input type="text" required className="form-control" name="full_name" placeholder="Full Name" value={updatedUser.full_name} onChange={handleUpdateInputChange} />
                <input type="text" className="form-control" name="username" placeholder="Username" value={updatedUser.username} onChange={handleUpdateInputChange} />
                <input type="number" className="form-control" name="access_level_id" placeholder="Access Level ID" value={updatedUser.access_level_id} onChange={handleUpdateInputChange} />

                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update User</button>
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
                      <th>Full Name</th>
                      <th>Username</th>
                      <th>Access Level</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((user) => (
                      <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.full_name}</td>
                          <td>{user.username}</td>
                          <td>{user.access_level_id}</td>

                          <td>
                              {selectedUserId === user.id ? (
                                  <div className="menu">
                                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(user)} />
                                  <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteClick(user.id)} />
                                  <FontAwesomeIcon icon={faTimes} onClick={closeMenu} />
                                  </div>
                              ) : (
                                  <FontAwesomeIcon className="ellipsis" icon={faEllipsisV} onClick={() => handleEllipsisClick(user.id)} />
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

export default UsersList;