import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Box, Grid, Avatar, Paper } from '@mui/material';
import PerformanceChart from '../components/PerformanceChart';

function Performance() {
  const [interns, setInterns] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/intern/all').then(res => setInterns(res.data));
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={700} color="#8e6be6" mb={4} align="center">Interns Performance</Typography>
      <Grid container spacing={4}>
        {interns.map(intern => (
          <Grid item xs={12} md={6} key={intern._id}>
            <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#f5f5fa', transition: 'box-shadow 0.3s', ':hover': { boxShadow: 8, bgcolor: '#e0e0ff' } }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar src={intern.profilePic} sx={{ width: 56, height: 56, mr: 2, bgcolor: '#8e6be6' }} />
                  <Box>
                    <Typography variant="h6" color="#8e6be6">{intern.name}</Typography>
                    <Typography variant="body2" color="text.secondary">Batch: {intern.batchCode}</Typography>
                  </Box>
                </Box>
                <PerformanceChart data={intern} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default Performance;
