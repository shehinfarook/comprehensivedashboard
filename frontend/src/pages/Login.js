import React, { useState } from 'react';
import axios from 'axios';
import '../styles/GlassyBg.css';
import { Container, Box, Typography, TextField, Button, Checkbox, FormControlLabel, Divider, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';


function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);

  // ...existing code...

  return (
    <div className="glassy-bg">
      <Box minHeight="100vh" display="flex" alignItems="stretch" bgcolor="#faf7fc">
        {/* Left Side: Form */}
        <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={6} py={8} bgcolor="#fff">
          {/* Removed logo and brand name for cleaner look */}
          <Typography variant="h4" fontWeight={700} mb={1}>Welcome back</Typography>
          <Typography color="text.secondary" mb={3}>Please enter your details</Typography>
          <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 360 }}>
            <TextField label="Email address or User ID" value={userId} onChange={e => setUserId(e.target.value)} fullWidth margin="normal" autoComplete="username" />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" autoComplete="current-password" />
            <Box display="flex" alignItems="center" justifyContent="space-between" mt={1} mb={2}>
              <FormControlLabel control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} />} label={<Typography fontSize={14}>Remember for 30 days</Typography>} />
              <a href="/forgot" style={{ color: '#8e6be6', fontSize: 14, textDecoration: 'underline' }}>Forgot password</a>
            </Box>
            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#8e6be6', color: '#fff', fontWeight: 600, py: 1.5, fontSize: 16, borderRadius: 2, boxShadow: 2, mb: 2 }}>Sign in</Button>
            <Button variant="outlined" fullWidth sx={{ color: '#8e6be6', borderColor: '#8e6be6', fontWeight: 600, py: 1.5, fontSize: 16, borderRadius: 2, boxShadow: 1, mb: 2 }} href="/admin-login">Admin Login</Button>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          </form>
          <Typography mt={2} color="text.secondary" fontSize={15}>
            Don't have an account? <a href="/signup" style={{ color: '#8e6be6', textDecoration: 'underline' }}>Sign up</a>
          </Typography>
        </Box>
        {/* Right Side: Illustration */}
        <Box flex={1} display="flex" alignItems="center" justifyContent="center" bgcolor="#8e6be6">
          <Box width="80%" maxWidth={420}>
            {/* Simple SVG illustration matching reference */}
            <svg viewBox="0 0 420 420" width="100%" height="320" fill="none">
              <rect x="0" y="0" width="420" height="420" rx="32" fill="#8e6be6" />
              <circle cx="210" cy="210" r="90" fill="#fff" opacity="0.12" />
              <circle cx="210" cy="210" r="70" fill="#fff" opacity="0.18" />
              <ellipse cx="210" cy="320" rx="120" ry="30" fill="#fff" opacity="0.08" />
              <rect x="120" y="120" width="180" height="120" rx="32" fill="#fff" opacity="0.18" />
              <ellipse cx="210" cy="210" rx="60" ry="80" fill="#fff" opacity="0.18" />
              <circle cx="210" cy="210" r="50" fill="#fff" opacity="0.22" />
              <rect x="160" y="180" width="100" height="80" rx="24" fill="#fff" opacity="0.22" />
              <ellipse cx="210" cy="210" rx="40" ry="60" fill="#fff" opacity="0.22" />
              <circle cx="210" cy="210" r="30" fill="#fff" opacity="0.25" />
              <ellipse cx="210" cy="210" rx="20" ry="30" fill="#fff" opacity="0.25" />
              <rect x="180" y="200" width="60" height="40" rx="12" fill="#fff" opacity="0.25" />
              <ellipse cx="210" cy="210" rx="10" ry="15" fill="#fff" opacity="0.25" />
              <rect x="200" y="210" width="20" height="10" rx="4" fill="#fff" opacity="0.25" />
              {/* Abstract person illustration */}
              <ellipse cx="210" cy="270" rx="40" ry="18" fill="#fff" />
              <ellipse cx="210" cy="210" rx="32" ry="40" fill="#fff" />
              <ellipse cx="210" cy="180" rx="18" ry="24" fill="#fff" />
              <ellipse cx="210" cy="170" rx="10" ry="12" fill="#8e6be6" />
              <ellipse cx="210" cy="170" rx="6" ry="8" fill="#fff" />
              <rect x="200" y="190" width="20" height="40" rx="8" fill="#fff" />
            </svg>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
export default Login;
