import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HiveIcon from '@mui/icons-material/Hive';
import buzzIcon from "../images/buzzChatIcon.png"; 
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import hivesIcon from "../images/hivesIcon.png"; 
import io from "socket.io-client"; //Used to create connection with backend


const drawerWidth = 240;

//Establishes a connection to our backend socket server.
//We can use this to listen to events or emit events.
const socket= io.connect("http://localhost:3010");

export default function ClippedDrawer() {
  const [showHives, setShowHives] = React.useState(false);
  const [showBuzz, setShowBuzz] = React.useState(false);


  const toggleHives = () => {
    setShowHives((prev) => !prev);
  };

  const toggleBuzz = () => {
    setShowBuzz((prev) => !prev);
  };

  const handleCreateHive = () => {
    // Add your logic for the "Create Hive" button here
    console.log('Create Hive clicked');
  };

  const handleCreateBuzz = () => {
    // Add logic for the "Create Buzz" button here
    //Need a modal to pop up to get the values to enter into the database
    //const form= hiveData;

    console.log('Start Buzz clicked');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1B1D21'}}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Unihive
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box', 
            backgroundColor: '#1B1D21', },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto'}}>
          <List>
            {/* Hives */}
            <ListItem disablePadding>
              <ListItemButton onClick={toggleHives}>
                <ListItemIcon>
                <img src={hivesIcon} alt="Hives Icon" style={{ width: '20px', height: '26px' }} />
                </ListItemIcon>
                <ListItemText 
                primaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
                primary="Hives"  />
                {showHives ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
            </ListItem>
            {/* Nested Hives */}
            {showHives && (
              <List component="div" disablePadding>
                {/* Create Hive */}
                <ListItem disablePadding>
                  <ListItemButton onClick={handleCreateHive}>
                    <ListItemIcon>
                      <AddCircleIcon sx={{color:'#ecf4ff'}}/>
                    </ListItemIcon>
                    <ListItemText primary="Create Hive" />
                  </ListItemButton>
                </ListItem>
                {/* Hive 1 */}
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HiveIcon sx={{color:'#FBCB1C'}}/>
                    </ListItemIcon>
                    <ListItemText primary="Hive 1" />
                  </ListItemButton>
                </ListItem>
                {/* Hive 2 */}
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HiveIcon sx={{color:'#FBCB1C'}}/>
                    </ListItemIcon>
                    <ListItemText primary="Hive 2" />
                  </ListItemButton>
                </ListItem>
              </List>
            )}
          </List>
          <Divider />
          <List>
            {/* Buzz */}
            <ListItem disablePadding>
              <ListItemButton onClick={toggleBuzz}>
                <ListItemIcon>
                <img src={buzzIcon} alt="Buzz Icon" style={{ width: '26px', height: '26px' }} />
                </ListItemIcon>
                <ListItemText 
                primaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
                primary="Buzz" />
                {showBuzz ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
            </ListItem>
            {/* Nested Buzz */}
            {showBuzz && (
              <List component="div" disablePadding>
                {/* Create Buzz */}
                <ListItem disablePadding>
                  <ListItemButton onClick={handleCreateBuzz}>
                  <ListItemIcon>
                      <MapsUgcIcon sx={{color:'#ecf4ff'}}/>
                    </ListItemIcon>
                    <ListItemText primary="Start Buzz" />
                  </ListItemButton>
                </ListItem>
                {/* Buzz 1 */}
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Buzz 1" />
                  </ListItemButton>
                </ListItem>
                {/* Buzz 2 */}
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Buzz 2" />
                  </ListItemButton>
                </ListItem>
              </List>
            )}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum
        </Typography>
        <Typography paragraph>
          Consequat
        </Typography>
      </Box>
    </Box>
  );
}
