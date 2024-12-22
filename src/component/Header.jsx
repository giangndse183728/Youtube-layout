import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SvgIcon from '@mui/material/SvgIcon';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, AppBar, Toolbar, Avatar, IconButton, InputAdornment, Button, Typography, Autocomplete } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import fetchVideos from '../api/youtubeService';
import { useSelector, useDispatch } from 'react-redux';
import { addSearchHistory } from '../actions';

export default function Header({ handleDrawerToggle }) {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history);
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearchFocus = () => {
    setIsFocused(true);
  };

  const handleSearchBlur = () => {
    setIsFocused(false);
  };

  const handleSearchClick = async () => {
    if (searchQuery.trim()) {
      dispatch(addSearchHistory(searchQuery));
      try {
        const { videoItems } = await fetchVideos(searchQuery);
        navigate('/results', { state: { videos: videoItems, query: searchQuery } });
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ bgcolor: 'white', boxShadow: 'none', zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo and Menu Button */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
              alt="YouTube Logo"
              style={{ width: '101px' }}
            />
            </IconButton>
          </Box>

          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Autocomplete
              freeSolo
              options={Array.isArray(history) ? history : []}
              onInputChange={(event, value) => {
                setSearchQuery(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search"
                  variant="outlined"
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  sx={{
                    width: '540px',
                    borderRadius: '9999px 0 0 9999px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '9999px 0 0 9999px',
                      '& fieldset': {
                        borderRight: 'none',
                      },
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      height: 40,
                      paddingRight: 1,
                    },
                    startAdornment: isFocused && (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: null, // Remove the endAdornment from here
                  }}
                />
              )}
            />
            <Button
              onClick={handleSearchClick}
              variant='outlined'
              sx={{
                height: 40,
                borderRadius: '0 9999px 9999px 0',
                boxShadow: 'none',
                minWidth: 64,
                borderColor: '#d4d5d6',
                bgcolor: '#f8f8f8',
                color: '#606060',
                '&:hover': {
                  bgcolor: '#e8e8e8',
                },
              }}
            >
              <SearchIcon />
            </Button>
            
            <IconButton sx={{ ml: 1 }}>
              <Avatar>
                <MicIcon />
              </Avatar>
            </IconButton>
          </Box>

          {/* Profile and Icons */}
          <Box>
            <IconButton size="large" color="black">
              <SvgIcon>
                <path d="M17 18v1H6v-1ZM6.49 9l.71.71 3.8-3.8V16h1V5.91l3.8 3.81.71-.72-5-5Z"></path>
              </SvgIcon>
            </IconButton>
            <IconButton size="large" color="black">
              <SvgIcon>
                <path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z"></path>
              </SvgIcon>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Avatar
                alt="User Avatar"
                src="https://cdn0.iconfinder.com/data/icons/diverse-cartoon-men-avatars/300/51-512.png"
                sx={{ width: 37, height: 37 }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
