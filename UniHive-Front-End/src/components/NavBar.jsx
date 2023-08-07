import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from '../assets/Logo.svg';
import Bell from '../assets/Bell.svg';
import Discover from '../assets/Discover.svg';
import Faqs from '../assets/Faqs.svg';
import Swarms from '../assets/Swarms.svg';
import { createTheme } from '@mui/material/styles';


import '../styles/NavBar.css';



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    
    <AppBar position="static" sx={{backgroundColor:'#1B1D21'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, ml: 10 }} /> */}
          {/* <img
            src={Logo}
            alt="Logo"
            style={{ display: { xs: 'none', md: 'flex' },width: '150px', height: 'auto',}} 
            
          /> */}
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar/>
              </IconButton>
              
            </Tooltip>
            {/* <Avatar
  alt="Remy Sharp"
  src="/static/images/avatar/1.jpg"
  sx={{ width: 24, height: 24 }}
/>
<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
{/* <Avatar
  alt="Remy Sharp"
  src="/static/images/avatar/1.jpg"
  sx={{ width: 56, height: 56 }}
/> */}
            <Menu
              sx={{ mt: '50px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

  
          <Typography
          
            variant="h6"
            fontFamily="Horta"
            noWrap
            component="a"
            href="/"
            
            // for pages
            sx={{
              ml:50,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              
              
              
            }}
          >
            UNIHIVE
             
            {/* <Typography className="logo-text"variant="h1" fontSize="30px"  fontFamily="YourCustomFont" sx={{ml:50, marginBottom:''}}>
                
            </Typography>        */}
          
          </Typography>
          <img
           src={Logo}
           alt="Logo"
           style={{ width: '150px', height: 'auto', marginLeft: '-35px' }}
            />    
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            // for pages
            sx={{
              ml:'200px',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
            src={Bell}
            alt="Bell"
            style={{ display: { xs: 'none', md: 'flex' },width: '95px', height: 'auto',}} 
            
          />
                    <img
            src={Swarms}
            alt="Swarms"
            style={{ display: { xs: 'none', md: 'flex' },width: '80px', height: 'auto',}} 
            
          />  
          <img
            src={Discover}
            alt="Discover"
            style={{ display: { xs: 'none', md: 'flex' },width: '105px', height: 'auto',}} 
            
          />

          <img
            src={Faqs}
            alt="Faqs"
            style={{ display: { xs: 'none', md: 'flex' },width: '80px', height: 'auto',}} 
            
          />  
          </Typography>
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem key={Logo} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{Logo}</Typography>
                </MenuItem>
                <MenuItem key={Bell} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{Bell}</Typography>
                </MenuItem>
                <MenuItem key={Discover} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{Discover}</Typography>
                </MenuItem>
                <MenuItem key={Faqs} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{Faqs}</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UNIHIVE
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;