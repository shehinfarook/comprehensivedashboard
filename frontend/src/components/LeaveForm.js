import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Box, Alert, List, ListItem, ListItemText, Chip } from '@mui/material';

function LeaveForm({ internId }) {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    // Fetch leave history for intern
    if (internId) {
      axios.get(`http://localhost:5000/api/intern/dashboard/${internId}`)
        .then(res => setLeaveHistory(res.data.leaveRequests || []));
    }
  }, [internId, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!date || !reason) {
      setError('Please fill in both date and reason.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/intern/leave', { internId, date, reason });
      setMessage('Leave request submitted.');
      setDate('');
      setReason('');
    } catch {
      setError('Failed to submit leave request.');
    }
    setLoading(false);
  };

  return (
    <Card elevation={4} sx={{ maxWidth: 400, mx: 'auto', mt: 2, borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} color="#8e6be6" gutterBottom>Apply for Leave</Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Reason"
            multiline
            minRows={2}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Enter reason for leave"
            required
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ bgcolor: '#8e6be6' }}>
            {loading ? 'Submitting...' : 'Apply'}
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
        </Box>
        {/* Leave History Section */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight={500} color="#8e6be6" mb={1}>Leave History</Typography>
          <List dense>
            {leaveHistory.length === 0 && <ListItem><ListItemText primary="No leave requests yet." /></ListItem>}
            {leaveHistory.map((leave, idx) => (
              <ListItem key={idx} sx={{ bgcolor: '#f5f5fa', borderRadius: 2, mb: 1 }}>
                <ListItemText
                  primary={leave.date ? new Date(leave.date).toLocaleDateString() : 'N/A'}
                  secondary={leave.reason || 'No reason'}
                />
                <Chip label={leave.status || 'pending'} color={leave.status === 'approved' ? 'success' : leave.status === 'rejected' ? 'error' : 'warning'} size="small" sx={{ ml: 2 }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}
export default LeaveForm;
