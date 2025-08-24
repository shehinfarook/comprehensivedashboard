import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';
import axios from 'axios';

function AdminLeaveApproval() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/admin/leave-requests').then(res => setRequests(res.data)).catch(() => setError('Failed to fetch leave requests.'));
  }, []);

  const [comments, setComments] = useState({});

  const handleAction = async (id, status) => {
    try {
      const comment = comments[id] || '';
      await axios.post(`http://localhost:5000/admin/leave/${id}`, { status, comment });
      setRequests(reqs => reqs.filter(r => r._id !== id));
      setComments(c => ({ ...c, [id]: '' }));
    } catch {
      setError('Action failed.');
    }
  };

  return (
    <Card elevation={4} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2} color="#8e6be6">Leave Approve/Reject</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {requests.length === 0 ? (
          <Typography>No leave requests.</Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {requests.map(r => (
              <Box key={r._id} display="flex" alignItems="center" justifyContent="space-between" bgcolor="#f5f5fa" p={2} borderRadius={2}>
                <Box>
                  <Typography fontWeight={600}>{r.internId?.name || 'Unknown'}</Typography>
                  <Typography fontSize={14}>Batch: {r.internId?.batchCode || 'N/A'}</Typography>
                  <Typography fontSize={14}>User ID: {r.internId?.userId || 'N/A'}</Typography>
                  <Typography fontSize={14}>Reason: {r.reason}</Typography>
                  <Typography fontSize={14}>Date: {r.date ? new Date(r.date).toLocaleDateString() : 'N/A'}</Typography>
                  <TextField
                    label="Admin Comment"
                    size="small"
                    value={comments[r._id] || ''}
                    onChange={e => setComments(c => ({ ...c, [r._id]: e.target.value }))}
                    sx={{ mt: 1, width: 220 }}
                  />
                </Box>
                <Box display="flex" gap={1}>
                  <Button variant="contained" color="success" onClick={() => handleAction(r._id, 'approved')}>Approve</Button>
                  <Button variant="contained" color="error" onClick={() => handleAction(r._id, 'rejected')}>Reject</Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
export default AdminLeaveApproval;
