const express = require("express");
const cors = require("cors");
const { User } = require("./models");
const { post } = require("./models");
const { comment } = require("./models");
const { group } = require("./models");
const { message } = require("./models");
const {
    wrap,
    corsConfig,
  } = require("./serverController");
const session = require("express-session"); //Might not need to use since were using socket.io
const http = require("http"); //Socket.io is created upon a http server so this is the recommended way of establishing it
//We grab the server class from the socket.io libary
const {Server}=require("socket.io")
const sharedSession = require('express-socket.io-session'); // Import the package
const bcrypt=require("bcrypt");
require("dotenv").config();
const app = express();
app.use(express.json());//Allows app to parse JSON bodies
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));//Sets up cors
//Creates the http server with express
const server=http.createServer(app);
const bodyParser= require('body-parser');
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,  //With the generated cookie in the SESSION_SECRET can now use req.session to save and retrieve session data in your route handlers.
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000 // 1 hour
    },
  });
app.use(sessionMiddleware);
app.use(bodyParser.json());
/*
app.use(sharedSession(sessionMiddleware, {
    autoSave: true, // Automatically save session on socket request
  }));
*/
//const app = express();
app.use(
    cors({
      origin: ["*"],
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
const io = new Server(server, {
  cors: {
    origin: '*', // Replace with the actual URL of your client application
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  //credentials: true, // Allow cookies and session data
  },
});


/////////added cookie based authentication for the proteected routes
const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page." });
  }
  next();
};



//Creates the different namespaces for our sockets
//A namespace allows us to separate connections so that they can have different functionalities.
const groupChatNamespace= io.of("/groupchat");
const directMessageNamespace= io.of("/directMessage");
const feedNamespace= io.of("/feed");
//group_name is a unique string, allowing for this to be a unique room for the group.
//Takes a call back function that will join the room and allow the user to listen for and emit events.
/*
groupChatNamespace.on('connection', socket => {
  //Joins the specified room
  socket.join(group_name);
   // Listen for chat message
   socket.on('chatMessage', (msg) => {
    console.log('Message received: ' + msg);
    // Emit event to same room
    chatNamespace.in(group_name).emit('newMessage', msg);
  });
});
*/
//Values used to store the current functionalities
let currentUser={}; // Initialize currentUser to null // Shared data structure to store active user information
let currentGroup=null;
let currentPost=null;
let currentGrouptag=null;
let currentComment=null;
let currentMessage=null;
let clickedhive=0;
/*
//Create groupchat logic
groupChatNamespace.on("connection",(socket)=>{
   // socket.join("Testgroup");
    socket.on("creategroup", async (formData)=>{
        console.log('Received create group(hive) request:', formData);
        try{
            await group.create({
                group_name:formData.hiveName,
                group_description:formData.hiveDescription,
                group_college:formData.selectedCollege,
                college_major:formData.selectedMajor,
             });
        }catch(e){
            //Returns error if group was not successfully made.
            console.error(e);
        }
    })
});
*/
io.use(sharedSession(sessionMiddleware, {
    autoSave: true, // Automatically save session on socket request
  })); //Gives socket.io access to the express session




io.on('connection',(socket)=> {
//Sign up form Logic######################################################################
    socket.on('signup', async (formData) => {
    console.log('Received signup request:', formData);
  // Input validation
 //makes sure that the user inputted the correct confirm password
  if (formData.password !== formData.confirmPassword) {
    console.log('Passwords do not match');
    };
  //Trys to create  a new user based to the recieved values from the client-side
  try {
    // Save user to database
        currentUser = await User.create({
        name: formData.fullName,
        college_level: formData.collegeLevel,
        email: formData.email,
        password: formData.password,
        college: formData.selectedCollege,
        major: formData.selectedMajor,
    });
   // socket.userId = User.id; //Sets the socket.userId to the Id of the users database
    //Returns console message if the user was successfully created
    console.log( 'User created!');
  } catch (err) {
    //Returns an error if the user was not successfully created
    console.error(err);
  }
  console.log("User connected:", User.name);
  // Assuming you have the user's ID available, you can assign it to the socket object
  //socket.userId = User.id; // Replace "123" with the actual user's ID
});

//Socket.io LOGIN LOGIC######################################################
socket.on('login', async (formData) => {
    try {
        //Finds the user based on the username the client has provided
        const user = await User.findOne({ where: { name: formData.username } });
       currentUser = user;  // Store user data in the shared object
        //If not username is found then an error will occur
        if (user === null) {
            console.log("Incorrect credentials");
        }
        //Makes sure that the password the user entered matches the stored password.
        if(formData.password === user.password){
            console.log("Logged in successfully" + user.id);
        } else {
            //Returns an error if the passwords don't match.
            console.log("Incorrect credentials");
        }
    } catch (error) {
        console.error(error);
    }
});
   //Create Group(Hive) Logic############################
   //Gets the form data from the modal on the client side and puts that data into the database.
//Create Group(Hive) Logic############################
//Gets the form data from the modal on the client side and puts that data into the database.
socket.on("creategroup", async (formData) => {
    console.log('Received create group(hive) request:', formData);
    try {
      // Retrieve user data from the shared object using socket.id
       //const user = activeUsers[socket.id];
       console.log('User session data in creategroup event:', currentUser);
        //console.log(sesuser);
        // Create a new group using the user's ID from the session
       currentGroup= await group.create({
            group_name: formData.hiveName,
            group_description: formData.hiveDescription,
            group_college: formData.selectedCollege, //currentUser.college
            college_major: formData.selectedMajor, //currentUser.major
            groupToUser: currentUser.id, // Use the user's ID from the session
        });
        //creates the tag when the table is created
        currentGrouptag=await GroupTag.create({
          groupId: currentGroup.id,
          userId: currentUser.id,
        });
    } catch (e) {
        // Returns error if group was not successfully made.
        console.error(e);
    }
});

//Gets all the groups the signed in user is associated with(The Loader)
app.get('/api/data', async (req, res) => {
    try {
      const data = await group.findAll({ where: { groupToUser: currentUser.id } }); // Query the database using your Sequelize model
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

//GETS all POST ##################################################
 // Listen for a request to fetch a single post by ID
 socket.on('getAllPost', async (postID) => {
  try {
    const postgroup = await group.findAll({ where: { groupToUser: currentUser.id } });
    const allPost = await post.findAll({ where: { groupId: postgroup.id } });
   // currentPost=allPost;
    if (allPost) {
      // Emit the single post data to the client
      socket.emit('allPostData', allPost);
    } 
  } catch (error) {
    // Emit an error message if there's an internal server error
    console.log(error);
    //socket.emit('singlePostError', { message: error.message });
  }
});

//CREATES A POST #############################################################
  // Listen for a request to create a new post
  socket.on('createPost', async (postData) => {
    console.log(currentUser);
    try {
       post.create({
        post_content: postData.postContent,
       // isSwarm: postData.isSwarm,
        //swarmLocation: postData.swarmLocation,
        userId: currentUser.id,
        groupId: clickedhive,
      });

      // Emit the created post data to the client
      //socket.emit('postCreated', newPost);
    } catch (error) {
      // Emit an error message if there's an error creating the post
      socket.emit('postCreationError', { message: error.message });
    }
  });


//UPDATES A POST#######################
 // Listen for a request to update a post
 socket.on('updatePost', async ({ postId, updatedData }) => {
  try {
    const [numAffectedRows, affectedRows] = await post.update(updatedData, {
      where: { id: postId },
      returning: true,
    });

    if (numAffectedRows > 0) {
      // Emit the updated post data to the client
      socket.emit('postUpdated', affectedRows[0]);
    } else {
      // Emit an error message if the post cannot be found
      socket.emit('postUpdateError', { message: 'Post cannot be found' });
    }
  } catch (error) {
    // Emit an error message if there's an error updating the post
    socket.emit('postUpdateError', { message: error.message });
  }
});


/*
app.get("/api/group/:groupId/posts", async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const groupPosts = await post.findAll({ where: { groupId:groupId } });
    res.status(200).json(groupPosts);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.error(error.message);
  }
});

*/  

//////////////////REturns the id of the hive clicked/////////////////////
//We can now use it to get the posts of the hive clicked
socket.on("hiveclicked",async (data)=>{
   clickedhive=await data//Gets the id of the clicked group
  console.log("Current clicked hive ID: "+ clickedhive);
  //data=0;
  try {

     // Gets all the posts of the current hive
     //Uses .the to only execute the emit after the posts have been fetched
     post.findAll({ where: { groupId: clickedhive } })
     .then((postgroup) => {
       currentPost = postgroup;
       console.log(postgroup);
       io.emit("getHivePost", postgroup); // Sends all the found post to the getHivePost listener
       //console.log("Emit Triggered?");
     })
     .catch((error) => {
       console.log(error);
     });
    /*
    //Gets all the posts of the current hive
    const postgroup = await post.findAll({ where: { groupId: clickedhive } });
    currentPost=postgroup;
    console.log(postgroup);
    io.emit("getHivePost",postgroup); //Sends all the found post to the getHivePost listener
    console.log("Emit Triggered?")
    */
  }catch(e){
        console.log(e);
  }
}) 






//////////////////REGULAR EXPRESS ENDPOINTS////////////////////
//////////////////posts table operations///////////////////////

app.get("/posts", authenticateUser, async (req, res) => {
  try {
    const allPosts = await post.findAll();
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.get("/posts/:postID", authenticateUser, async (req, res) => {
  const postID = req.params.postID;
  try {
    const singlepost = await post.findOne({ where: { id: postID } });
    if (singlepost) {
      res.status(200).json(singlepost);
    } else {
      res.status(404).send({ message: "Post cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.post("/posts", authenticateUser, async (req, res) => {
  try {
    let newPost = await post.create({
      post_content: req.body.post_content,
      isSwarm: req.body.isSwarm,
      swarmLocation: req.body.swarmLocation,
      userId: req.body.userId,
      groupId: req.body.groupId,
    });
    console.log(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.patch("/posts/:postID", authenticateUser, async (req, res) => {
  const postId = req.params.postID;
  try {
    const [numAffectedRows, affectedRows] = await post.update(req.body, {
      where: { id: postId },
      returning: true,
    });
    if (numAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Post cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.delete("/posts/:postID", authenticateUser, async (req, res) => {
  const postID = req.params.postID;
  try {
    const deletePost = await post.destroy({ where: { id: postID } });
    if (deletePost > 0) {
      res.status(200).send({ message: "Post was deleted Successfully!" });
    } else {
      res.status(404).send({ message: "Post cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

//////////////////comment table operations///////////////////////

app.get("/comments", authenticateUser, async (req, res) => {
  try {
    const allcomments = await comment.findAll();
    res.status(200).json(allcomments);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.get("/comments/:commentId", authenticateUser, async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const singlecomment = await comment.findOne({ where: { id: commentId } });
    if (singlecomment) {
      res.status(200).json(singlecomment);
    } else {
      res.status(404).send({ message: "Comment cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.post("/comments", authenticateUser, async (req, res) => {
  try {
    let newComment = await comment.create({
      content: req.body.content,
      postId: req.body.postId,
    });
    console.log(newComment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.patch("/comments/:commentId", authenticateUser, async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const [numAffectedRows, affectedRows] = await comment.update(req.body, {
      where: { id: commentId },
      returning: true,
    });
    if (numAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Comment cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.delete("/comments/:commentId", authenticateUser, async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const deleteComment = await comment.destroy({ where: { id: commentId } });
    if (deleteComment > 0) {
      res.status(200).send({ message: "Comment was deleted Successfully!" });
    } else {
      res.status(404).send({ message: "Comment cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

//////////////////group table operations///////////////////////

app.get("/groups", authenticateUser, async (req, res) => {
  try {
    const allgroups = await group.findAll();
    res.status(200).json(allgroups);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.get("/groups/:groupId", authenticateUser, async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const singlegroup = await group.findOne({ where: { id: groupId } });
    if (singlegroup) {
      res.status(200).json(singlegroup);
    } else {
      res.status(404).send({ message: "Group cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.post("/groups", authenticateUser, async (req, res) => {
  try {
    let newgroup = await group.create({
      group_name: req.body.group_name,
      group_description: req.body.group_description,
      group_location: req.body.group_location,
      college_major: req.body.college_major,
      group_college: req.body.group_college,
    });
    console.log(newgroup);
    res.status(201).json(newgroup);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.patch("/groups/:groupId", authenticateUser, async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const [numAffectedRows, affectedRows] = await group.update(req.body, {
      where: { id: groupId },
      returning: true,
    });
    if (numAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Group cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.delete("/groups/:groupId", authenticateUser, async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const deleteGroup = await group.destroy({ where: { id: groupId } });
    if (deleteGroup > 0) {
      res.status(200).send({ message: "Group was deleted Successfully!" });
    } else {
      res.status(404).send({ message: "Group cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

//////////////////message table operations///////////////////////

app.get("/messages", authenticateUser, async (req, res) => {
  try {
    const allmessages = await message.findAll();
    res.status(200).json(allmessages);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.get("/messages/:messageId", authenticateUser, async (req, res) => {
  const messageId = req.params.messageId;
  try {
    const singlemessage = await message.findOne({ where: { id: messageId } });
    if (singlemessage) {
      res.status(200).json(singlemessage);
    } else {
      res.status(404).send({ message: "Message cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.post("/messages", authenticateUser, async (req, res) => {
  try {
    let newMessage = await message.create({
      content: req.body.content,
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
    });
    console.log(newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.patch("/messages/:messageId", authenticateUser, async (req, res) => {
  const messageId = req.params.messageId;
  try {
    const [numAffectedRows, affectedRows] = await message.update(req.body, {
      where: { id: messageId },
      returning: true,
    });
    if (numAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Message cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

app.delete("/messages/:messageId", authenticateUser, async (req, res) => {
  const messageId = req.params.messageId;
  try {
    const deleteMessage = await message.destroy({ where: { id: messageId } });
    if (deleteMessage > 0) {
      res.status(200).send({ message: "Message was deleted Successfully!" });
    } else {
      res.status(404).send({ message: "Message cannot be found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});





























  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(currentUser.name+' disconnected');
  });
});
//Defines the server port and Starts the server
const port = 3010;
app.listen(3011, () => {
    console.log(`Server running on port 3011`);
    //console.log("SERVER IS RUNNING AT "+ server.address().port);
  });
io.listen(port, () => {
  console.log(`Server running on port ${port}`);
  //console.log("SERVER IS RUNNING AT "+ server.address().port);
});