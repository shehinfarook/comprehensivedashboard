import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';
import axios from 'axios';

function AdminScheduleUpload() {
  const [file, setFile] = useState(null);
  const [batchCode, setBatchCode] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !batchCode) {
      setError('Please select a file and enter batch code.');
      return;
    }
    const formData = new FormData();
    formData.append('schedule', file);
    formData.append('batchCode', batchCode);
    try {
      await axios.post('http://localhost:5000/api/admin/upload-schedule', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Schedule uploaded successfully!');
      setError('');
    } catch (err) {
      setError('Upload failed.');
      setSuccess('');
    }
  };

  return (
    <Card elevation={4} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2} color="#8e6be6">Upload Weekly Schedule (Batchwise)</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Batch Code" value={batchCode} onChange={e => setBatchCode(e.target.value)} fullWidth />
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <Button variant="contained" sx={{ bgcolor: '#8e6be6', color: '#fff' }} onClick={handleUpload}>Upload</Button>
          {success && <Typography color="primary">{success}</Typography>}
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </CardContent>
    </Card>
  );
}
export default AdminScheduleUpload;
