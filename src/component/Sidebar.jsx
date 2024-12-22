import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import ButtonList from './ButtonList';

const drawerWidth = 250;

const icons = [      <SvgIcon>
  <path d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z"></path>
</SvgIcon>, <SvgIcon>
<path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path>
      </SvgIcon>, <SvgIcon>
        <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path>
      </SvgIcon>, <SvgIcon>
        <path d="M10 9.35 15 12l-5 2.65zM12 7a5 5 0 105 5 5 5 0 00-5-5m0-1a6 6 0 11-6 6 6 6 0 016-6zm0-3a9 9 0 109 9 9 9 0 00-9-9m0-1A10 10 0 112 12 10 10 0 0112 2z"></path>
      </SvgIcon>, <SvgIcon>
        <path d="M11 7l6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"></path>
      </SvgIcon>, <SvgIcon>
        <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
      </SvgIcon>,
     <SvgIcon>
      <path d="M4 20h14v1H3V6h1v14zM6 3v15h15V3H6zm2.02 14c.36-2.13 1.93-4.1 5.48-4.1s5.12 1.97 5.48 4.1H8.02zM11 8.5a2.5 2.5 0 015 0 2.5 2.5 0 01-5 0zm3.21 3.43A3.507 3.507 0 0017 8.5C17 6.57 15.43 5 13.5 5S10 6.57 10 8.5c0 1.69 1.2 3.1 2.79 3.43-3.48.26-5.4 2.42-5.78 5.07H7V4h13v13h-.01c-.38-2.65-2.31-4.81-5.78-5.07z"></path>
    </SvgIcon>,
    <SvgIcon>
      <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z"></path>
      </SvgIcon>
      ];


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer({open, handleDrawerToggle}) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);


  const handleSearchFocus = () => {
    setIsFocused(true);
  };

  const handleSearchBlur = () => {
    setIsFocused(false);
  };

  const items = [
    'Trang chủ', 
    'Shorts', 
    'Kênh đăng ký', 
    'Youtube Music', 
    'Bạn', 
    'Nội dung tải xuống',
    'Kênh của bạn',
    'Video đã xem',
    'Danh sách phát',
    'Video của bạn',
    'Xem sau',
    'Video đã thích',
    'Thịnh thành',
    'Âm nhạc',
    'Trò chơi',
    'Tin tức',
    'Thể thao',
    'Youtube Studio',
    'Youtube Music',
    'Youtube Kids',
  ];

 
  const displayedItems = open ? items : items.slice(0, 6);
  const dividerIndices = [3,11,16]; // Dividers after Item no
  const drawheader = [11]; // Dividers after Item no
  const drawheader1 = [3]; // Dividers after Item no
  const drawheader2 = [16]; // Dividers after Item no

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer variant="permanent" open={open} 
        sx={{
          '& .MuiDrawer-paper': {
            borderRight: 'none',
          },
        }}
      >
        <DrawerHeader />
       
        <List> 
          {displayedItems.map((text, index) => (
            <React.Fragment key={text}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    flexDirection: open ? 'row' : 'column',
                    alignItems: 'center',
                  }}
                >
                  <ListItemIcon sx={{ 
                    justifyContent: 'center', 
                    minWidth: 0, 
                    mr: open ? 3 : 'auto',
                    mb: open ? 0 : 1,
                    width: open ? '2' : '100%', // Add this line
                  }}>
                    {icons[index % icons.length]}
                  </ListItemIcon>
                  {open ? (
                    <ListItemText primary={text} />
                  ) : (
                    <Typography variant="caption" sx={{ 
                      fontSize: '0.6rem',
                      textAlign: 'center',
                      width:65,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {text}
                    </Typography>
                  )}
                </ListItemButton>
              </ListItem>
              
              {/* Add Divider between list items */}
             {open && dividerIndices.includes(index) && <Divider />}
             {open && drawheader.includes(index) && <DrawerHeader sx={{mb:-2 }}> <Typography sx={{ 
              ml:2,
                fontWeight: 'bold', 
                textAlign: 'left', 
                flex: 1 
              }} > Khám phá </Typography> </DrawerHeader>}

        {open && drawheader1.includes(index) && <DrawerHeader sx={{mb:-2 }}> <Typography sx={{ 
              ml:2,
                fontWeight: 'bold', 
                textAlign: 'left', 
                flex: 1 
              }} > Bạn </Typography> </DrawerHeader>}

        {open && drawheader2.includes(index) && <DrawerHeader sx={{mb:-2 }}> <Typography sx={{ 
              ml:2,
                fontWeight: 'bold', 
                textAlign: 'left', 
                flex: 1 
              }} > Dịch vụ khác của youtube </Typography> </DrawerHeader>}
            </React.Fragment>
          ))} 
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1}}>
        <DrawerHeader />
        <Box
  sx={{
    pl:3,
    pt: 1,
    position: "fixed",   // Stick to the viewport
    top: 64,             // This ensures it's below the AppBar (default AppBar height is 64px)
    width: '100%',
    zIndex: 1100,        // Make sure it's above other content but below the AppBar
    bgcolor: "white",    // Background color to match the AppBar

  }}
>
      {/* Add your buttons or content here for the second row */}
      <ButtonList/>
      
    </Box>

        
      </Box>
    </Box>
  );
}