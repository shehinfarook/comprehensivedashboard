import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

function AdminInternList({ onSelect }) {
  const [interns, setInterns] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/interns').then(res => setInterns(res.data));
  }, []);

  const handleSelect = (id) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id]);
    if (onSelect) onSelect(id);
  };

  return (
    <Card elevation={4} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2} color="#8e6be6">Registered Interns</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {interns.map(intern => (
            <Box key={intern._id} display="flex" alignItems="center" justifyContent="space-between" bgcolor="#f5f5fa" p={2} borderRadius={2}>
              <Box>
                <Typography fontWeight={600}>{intern.name}</Typography>
                <Typography fontSize={14}>Batch: {intern.batchCode}</Typography>
                <Typography fontSize={14}>User ID: {intern.userId}</Typography>
              </Box>
              <FormControlLabel
                control={<Checkbox checked={selected.includes(intern._id)} onChange={() => handleSelect(intern._id)} />}
                label={<Typography fontSize={14}>Select</Typography>}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
export default AdminInternList;
