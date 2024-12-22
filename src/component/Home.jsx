import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import MiniDrawer from './Sidebar';
import Content from './Content';
import VideoResults from './ContentResult'; // Import the new VideoResults component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Home() {
  const [videos, setVideos] = useState([]); // State for videos

  const handleSearchResults = (results) => {
    setVideos(results); // Update videos state with search results
  }
  const [open, setOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open); // Toggle drawer open/close
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    
      <Header  handleDrawerToggle={handleDrawerToggle} handleSearchResults={handleSearchResults}/>
      

      {/* Drawer Component */}
      <MiniDrawer open={open}  />

      {/* Main Content */}

        <Box sx={{ mt: 14, p: 3 }}>
          
          <Routes>  
          <Route path="/" element={<Content open={open} />} /> 
        <Route path="/results" element={<VideoResults/>} />      
      </Routes>
        </Box>
      </Box>
    
  );
}
