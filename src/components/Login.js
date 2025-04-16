// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import './Login.css'; // <-- Make sure this is included

// // const Login = ({ onLogin }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
// //       onLogin(res.data.token);
// //     } catch (err) {
// //       alert('Login failed');
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <div className="login-card">
// //         <h3>Login</h3>
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-3">
// //             <label>Email</label>
// //             <input
// //               type="email"
// //               className="form-control"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="mb-3">
// //             <label>Password</label>
// //             <input
// //               type="password"
// //               className="form-control"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <button className="btn btn-primary" type="submit">Login</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState } from 'react';
// import './Login.css'; 
// import Swal from 'sweetalert2'; 

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Dummy login logic
//     if (email === 'sk@gmail.com' && password === 'sk') {
//       const Token = 'e83qieyryrvnfdbvikSDHDUGFJBQQWEOXCVHDSJ37492843e83qieyryrvnfdbvikSDHDUGFJBQQWEOXCVHDSJ37492843e83qieyryrvnfdbvikSDHDUGFJBQQWEOXCVHDSJ37492843e83qieyryrvnfdbvikSDHDUGFJBQQWEOXCVHDSJ37492843';
//       onLogin(Token);
//     } else {
// // Using SweetAlert for error message instead of alert
// Swal.fire({
//     icon: 'error',
//     title: 'Login Failed',
//     text: 'Please check your credentials.',
//     confirmButtonText: 'OK',
//     confirmButtonColor: '#3085d6',
//   });    }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h3>Login</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label>Email</label>
//             <input
//               type="email"
//               className="form-control"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button className="btn btn-primary" type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import './Login.css';
import Swal from 'sweetalert2';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login check
    if (email === 'sk@gmail.com' && password === 'sk') {
      const Token = 'e83qieyryrvnfdbvikSDHDUGFJBQQWEOXCVHDSJ37492843e83qieyryrvnfdbvikSDHDUGFJBQQWEOXCVHDSJ37492843e83qieyryrvnfdbvikSDHDUGFJBQQWEOXCVHDSJ37492843';

      // SweetAlert success popup
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        timer: 2000,
        showConfirmButton: false,
        background: '#ecf6fc', // light blue background
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      

      // Call the login handler after a delay (wait for animation)
      setTimeout(() => {
        onLogin(Token);
      }, 2000);

    } else {
      // SweetAlert error popup
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your credentials.',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#e74c3c',
        footer: '<a href="#">Forgot your password?</a>',
        showClass: {
          popup: 'animate__animated animate__shakeX'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut'
        }
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
