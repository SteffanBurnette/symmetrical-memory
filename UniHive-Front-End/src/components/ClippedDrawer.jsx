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
import buzzIcon from "../images/ChatIcon.svg"; 
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import hivesIcon from "../images/hivesIcon.svg"; 
import io from "socket.io-client"; //Used to create connection with backend
import ResponsiveAppBar from '../components/NavBar';
import CreateHive from '../components/CreateHive'; // Import the CreateHive component
import {useLoaderData} from "react-router-dom";
//import ResponsiveAppBar from '../components/NavBar'; mohammads navbar, need the unihive svg
import RecipeReviewCard from "../components/Post";
import Button from "@mui/material/Button";
  import CreatePost from '../components/CreatePost'
  import EditNoteIcon from "@mui/icons-material/EditNote";
  import StartBuzz from "../components/StartBuzz";
  import { createClient } from '@supabase/supabase-js';

const drawerWidth = 240;


//configuring the supabase client, and establishing the connection 



//Establishes a connection to our backend socket server.
//We can use this to listen to events or emit events.

/*
export const dataLoader = async () => {
  try {
    const response = await fetch('http://localhost:3011/api/data');
    if (!response.ok) {
      throw new Error('Data was not properly fetched');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching data');
  }
};*/


const socket= io("http://localhost:3010");

export default function ClippedDrawer() {
  const [showHives, setShowHives] = React.useState(false);
  const [showBuzz, setShowBuzz] = React.useState(false);
  const [showCreateHive, setShowCreateHive] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedGroupPosts, setSelectedGroupPosts] = React.useState([]);
  const [showCreatePost, setShowCreatePost] = React.useState(false);
  const [postContent, setPostContent] = React.useState('');
  const [clickedId, setClickedId] = React.useState();
  //const [showCreatePost, setShowCreatePost] = React.useState(false);
  const [showStartBuzz, setShowStartBuzz] = React.useState(false);
  //create buzz
    const handleStartBuzz = () => {
      setShowStartBuzz(true);
      console.log("Start Buzz clicked");
    };
    //const loaderData = useLoaderData();
  
    const handleCloseStartBuzz = () => {
      setShowStartBuzz(false);
    };

    /*
  React.useEffect(() => {
    async function fetchData() {
      const loadedData = await dataLoader();
      setData(loadedData);
    }

    fetchData();
  }, []);*/
  
   /*  
  React.useEffect(() => {
    async function fetchData() {
      const loadedData = await dataLoader();
      setData(loadedData);
    }

    fetchData();
  }, []);*/
  


  const toggleHives = () => {
    setShowHives((prev) => !prev);
  };

  const toggleBuzz = () => {
    setShowBuzz((prev) => !prev);
  };

  const handleCreateHive = () => {
    // Add your logic for the "Create Hive" button here
    console.log('Create Hive clicked');
    setShowCreateHive(true);
  };
  
  const handleCloseCreateHive = () => {
    setShowCreateHive(false);
  };

  const handleCreateBuzz = () => {
    // Add logic for the "Create Buzz" button here
    //Need a modal to pop up to get the values to enter into the database
    //const form= hiveData;

    console.log('Start Buzz clicked');
  };

 


const handleHiveClick = async (id) => {
 
 setClickedId(id);
  /*
  try {
    const response = await fetch(`http://localhost:3010/api/group/${key}/posts`);
    if (!response.ok) {
      throw new Error('Posts data was not properly fetched');
    }
    const postsData = await response.json();
    setSelectedGroupPosts(postsData); // Set the posts data to state
  } catch (error) {
    console.error(error);
  }*/
   socket.emit("hiveclicked",clickedId);
   socket.emit("getHivePost");
  // socket.emit("getPostComments"); //Used to get the comments of a specific post
};

 


const handleCreatePost = () => {
  // Add your logic here for the button click event
  console.log('Button clicked!');
  // You can perform any action you want when the button is clicked
  // socket.emit("createPost", postContent);
  setShowCreatePost(true);
};

const handleCloseCreatePost = () => {
  // Add your logic here for the button click event
  console.log('Button clicked!');
  // You can perform any action you want when the button is clicked
  setShowCreatePost(false);
};

socket.on("loadData", (data)=>{
    setData(data);
})
  

    
  return (
    <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1B1D21",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
      <Button
              variant="contained"
              color="primary"
              startIcon={<EditNoteIcon />}
              onClick={handleCreatePost}
            >
              Post
            </Button>
        <List>
          {/* Hives */}
          <ListItem disablePadding>
            <ListItemButton onClick={toggleHives}>
              <ListItemIcon
                style={{
                  width: "24px",
                  height: "24px",
                  transform: "scale(1.5)",
                }}
              >
                <img
                  src={hivesIcon}
                  alt="Hives Icon"
                  style={{ width: "100%", height: "100%" }}
                />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
                primary="Hives"
              />
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
                    <AddCircleIcon sx={{ color: "#ECF4FF" }} />
                  </ListItemIcon>
                  <ListItemText primary="Create Hive" />
                </ListItemButton>
              </ListItem>
              {/* Render hive names */}
              {
                data.map((hiveName) => (
                  <ListItem key={hiveName.id} id={hiveName.id} onClick={()=>{handleHiveClick(hiveName.id)}}>
                    <ListItemButton>
                      <ListItemIcon>
                        <HiveIcon />
                      </ListItemIcon>
                      <ListItemText primary={hiveName.group_name}/>
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          )}
        </List>
        <Divider />
        <List>
          {/* Buzz */}
          <ListItem disablePadding>
            <ListItemButton onClick={toggleBuzz}>
              <ListItemIcon
                style={{
                  width: "24px",
                  height: "24px",
                  transform: "scale(1.5)",
                }}
              >
                <img
                  src={buzzIcon}
                  alt="Buzz Icon"
                  style={{ width: "100%", height: "100%" }}
                />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
                primary="Buzz"
              />
              {showBuzz ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          {/* Nested Buzz */}
            {showBuzz && (
              <List component="div" disablePadding>
                {/* Create Buzz */}
                <ListItem disablePadding>
                  <ListItemButton onClick={handleStartBuzz}>
                    <ListItemIcon>
                      <MapsUgcIcon sx={{ color: "#ECF4FF" }} />
                    </ListItemIcon>
                    <ListItemText primary="Start Buzz" />
                  </ListItemButton>
                </ListItem>
            </List>
          )}
        </List>
      </Box>
    </Drawer>
   
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
     
    

  {/* Render the selected group's posts */}
  {selectedGroupPosts.map((post) => (
    <RecipeReviewCard key={post.id} post={post} />
  ))}


</Box>

    {/* Render the CreateHive component */}
    <CreateHive open={showCreateHive} onClose={handleCloseCreateHive} />
    <CreatePost open={showCreatePost} onClose={handleCloseCreatePost}/>
    <StartBuzz open={showStartBuzz} onClose={handleCloseStartBuzz} />
  </Box>
  );
}

/**<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        {selectedGroupPosts.map((post) => (
          <RecipeReviewCard key={post.id} post={post} />
        ))}
      </Box>
      
      */