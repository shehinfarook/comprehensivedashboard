import React, { useState, useRef } from 'react';
import { Box, Typography, Avatar, Button, TextField, Divider } from '@mui/material';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage'; // Utility to crop image
import axios from 'axios';

function Settings({ intern }) {
  if (!intern) {
    return (
      <Box maxWidth={420} mx="auto" mt={6} p={4} bgcolor="#fff" borderRadius={6} boxShadow={8}>
        <Typography variant="h5" color="error" textAlign="center">No profile data found. Please access settings from your dashboard.</Typography>
      </Box>
    );
  }
  const [profilePic, setProfilePic] = useState(intern.profilePic);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const inputRef = useRef();

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Upload original photo to backend before cropping
      const formData = new FormData();
      formData.append('userId', intern.userId);
      formData.append('image', file);
      try {
        const res = await axios.post('http://localhost:5000/api/intern/profile-pic-original', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        // Use backend response (URL or base64) for cropping
        setImageSrc(res.data.imageUrl || res.data.image || '');
        setShowCropper(true);
      } catch (err) {
        alert('Failed to upload image.');
      }
    }
  };

  const handleSaveCrop = async () => {
    const croppedImageBase64 = await getCroppedImg(imageSrc, croppedAreaPixels);
    setProfilePic(croppedImageBase64);
    setShowCropper(false);
    // Upload cropped image to server as base64 string
    await axios.post('http://localhost:5000/api/intern/profile-pic', { userId: intern.userId, image: croppedImageBase64 });
  };

  return (
    <Box maxWidth={420} mx="auto" mt={6} p={4} bgcolor="#fff" borderRadius={6} boxShadow={8}>
      <Typography variant="h4" fontWeight={700} mb={2} color="#8e6be6">Profile Settings</Typography>
      <Divider sx={{ mb: 3 }} />
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Avatar src={typeof profilePic === 'string' ? profilePic : ''} sx={{ width: 120, height: 120, mb: 2, boxShadow: 4 }} />
        <Button variant="outlined" onClick={() => inputRef.current.click()} sx={{ mb: 2 }}>Edit Profile Picture</Button>
        <input type="file" accept="image/*" ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      </Box>
      <Typography variant="body1" fontWeight={600} mb={1}>User ID: <span style={{ color: '#8e6be6' }}>{intern.userId}</span></Typography>
      <Typography variant="body1" fontWeight={600} mb={1}>Batch Code: <span style={{ color: '#8e6be6' }}>{intern.batchCode}</span></Typography>
      {showCropper && (
        <Box position="fixed" top={0} left={0} width="100vw" height="100vh" bgcolor="rgba(0,0,0,0.7)" zIndex={9999} display="flex" alignItems="center" justifyContent="center">
          <Box bgcolor="#fff" p={3} borderRadius={4} boxShadow={8}>
            <Typography mb={2}>Crop your profile picture</Typography>
            <Box position="relative" width={300} height={300}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary" onClick={handleSaveCrop}>Save</Button>
              <Button variant="outlined" color="secondary" onClick={() => setShowCropper(false)}>Cancel</Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Settings;
