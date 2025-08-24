import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

function ForgotUserId() {
  const [name, setName] = useState('');
  const [batchCode, setBatchCode] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-userid', { name, batchCode });
      setUserId(res.data.userId);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to retrieve User ID.');
      setUserId('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{padding:30, marginTop:30}}>
        <Typography variant="h5" gutterBottom>Forgot User ID</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Full Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
          <TextField label="Batch Code" fullWidth margin="normal" value={batchCode} onChange={e => setBatchCode(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth>Retrieve User ID</Button>
        </form>
        {userId && <Typography color="primary" style={{marginTop:10}}>Your User ID: {userId}</Typography>}
        {error && <Typography color="error" style={{marginTop:10}}>{error}</Typography>}
      </Paper>
    </Container>
  );
}
export default ForgotUserId;
