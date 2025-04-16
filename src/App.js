import React, { useState } from 'react';
import Login from './components/Login';
import ProductForm from './components/ProductForm';
import axios from 'axios';
import Swal from 'sweetalert2';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setToken(null);
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          showConfirmButton: false,
          timer: 1200,
        });
      }
    });
  };

  return (
    <div className="container mt-5">
      {token ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', marginRight: '12rem', marginTop: '2rem' }}>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              Logout
            </button>
          </div>
          <ProductForm token={token} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
