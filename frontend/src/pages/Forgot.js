import React, { useState } from 'react';
import axios from 'axios';

function Forgot() {
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { userId, newPassword });
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.error);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgot}>
        <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" />
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" />
        <button type="submit">Reset Password</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {message && <p style={{color:'green'}}>{message}</p>}
      <a href="/">Login</a>
    </div>
  );
}
export default Forgot;
