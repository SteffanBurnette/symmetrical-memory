const express = require("express");
const cors = require("cors");
const path = require("path");
const { User } = require("./models");
const { post } = require("./models");
const { comment } = require("./models");
const { group } = require("./models");
const { message } = require("./models");
const { GroupTag } = require("./models");
const { wrap, corsConfig } = require("./serverController");
const session = require("express-session"); //Might not need to use since were using socket.io
const http = require("http"); //Socket.io is created upon a http server so this is the recommended way of establishing it
//We grab the server class from the socket.io libary
const { Server } = require("socket.io");
const sharedSession = require("express-socket.io-session"); // Import the package
const bcrypt = require("bcrypt");
const { createClient } = require("@supabase/supabase-js"); //Established supabase connection
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json()); //Allows app to parse JSON bodies
app.use(cors({ origin: "*", methods: ["GET", "POST"] })); //Sets up cors
//Creates the http server with express
const server = http.createServer(app);
const bodyParser = require("body-parser");
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET, //With the generated cookie in the SESSION_SECRET can now use req.session to save and retrieve session data in your route handlers.
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, // 1 hour
  },  
});
const cookie = require("cookie");
app.use(sessionMiddleware);
app.use(bodyParser.json());
/*
app.use(sharedSession(sessionMiddleware, {
    autoSave: true, // Automatically save session on socket request
  }));
*/
//const app = express();

//configuring the supabase client, and establishing the connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with the actual URL of your client application
    methods: ["GET", "POST", "PATCH", "DELETE"],
    //credentials: true, // Allow cookies and session data
  },
});

app.use((req, res, next) => {
  //
  if (req.session.userId) {
    // Fetch user data from your database using req.session.userId
    // Example: req.user = await User.findById(req.session.userId);
    // Replace the above line with your actual code to fetch user data
  }
  next();
});
//Allows app to use cookie middleware to store user session
app.use(cookieParser());

/////////added cookie based authentication for the proteected routes
const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page." });
  }
  next();
};

const getUser = () => {
  return currentUser;
};

//Creates the different namespaces for our sockets
//A namespace allows us to separate connections so that they can have different functionalities.
const groupChatNamespace = io.of("/groupchat");
const directMessageNamespace = io.of("/directMessage");
const feedNamespace = io.of("/feed");
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
let currentUser; // Initialize currentUser to null // Shared data structure to store active user information
let currentGroup;
let currentPost;
let currentGrouptag = null;
let currentComment;
let currentMessage;
let clickedhive = 0;
let thereceiver;
let recID;
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
io.use(
  sharedSession(sessionMiddleware, {
    autoSave: true, // Automatically save session on socket request
  })
); //Gives socket.io access to the express session

groupChatNamespace.use(
  sharedSession(sessionMiddleware, {
    autoSave: true, // Automatically save session on socket request
  })
);

groupChatNamespace.on("connection", (socket) => {
  /////////////////CREATE COMMENT/////////////////////////
  /*
let postId;
socket.on("clickedPost", (data)=>{
     postId= data; //Wats for the data to be returned
})
*/
  //Listens for the createComment event:
});

io.on("connection", (socket) => {
  //Sign up form Logic######################################################################
  socket.on("signup", async (formData) => {
    console.log("Received signup request:", formData);
    // Input validation
    //makes sure that the user inputted the correct confirm password
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
    }
    //Trys to create  a new user based to the recieved values from the client-side
    try {
      // Create a new user on the supabase site
      currentUser = await supabase.from("User").insert({
        name: formData.fullName,
        college_level: formData.collegeLevel,
        email: formData.email,
        password: formData.password,
        college: formData.selectedCollege,
        major: formData.selectedMajor,
      });
      /*
    // Save user to database
        currentUser = await User.create({
        name: formData.fullName,
        college_level: formData.collegeLevel,
        email: formData.email,
        password: formData.password,
        college: formData.selectedCollege,
        major: formData.selectedMajor,
    });*/
      // socket.userId = User.id; //Sets the socket.userId to the Id of the users database
      //Returns console message if the user was successfully created
      console.log("User created!");
    } catch (err) {
      //Returns an error if the user was not successfully created
      console.error(err);
    }
    console.log("User connected:", currentUser.name);
    // Assuming you have the user's ID available, you can assign it to the socket object
    //socket.userId = User.id; // Replace "123" with the actual user's ID
  });

  //Socket.io LOGIN LOGIC######################################################

  socket.on("login", async (formData) => {
    try {
      //Finds the user based on the username the client has provided
      // const user = await User.findOne({ where: { name: formData.username } });
      //Finds the user based on the passed in variables
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("email", formData.email)
        .single();
      //console.log("This is the data ", +data);

      currentUser = {
        id: data.id,
        name: data.name,
        password: data.password,
        email: data.email,
        college_level: data.college_level,
        college: data.college,
        major: data.major,
      };
      console.log(data);
      console.log(currentUser.name);
      //If not username is found then an error will occur
      if (currentUser.name === null) {
        console.log("Incorrect credentials");
      }
      //Makes sure that the password the user entered matches the stored password.
      if (formData.password === currentUser.password) {
        console.log("Logged in successfully: " + currentUser.id);
      } else {
        //Returns an error if the passwords don't match.
        console.log("Incorrect credentials");
      }
    } catch (error) {
      console.error(error);
    }

   // Fetch group IDs associated with the current user from GroupTag table
   const { data: groupTagData, error: groupTagError } = await supabase
   .from("GroupTag")
   .select("groupId")
   .eq("userId", currentUser.id);

 if (groupTagError) {
   console.error("Error fetching GroupTag data:", groupTagError);
   return;
 }

 if (groupTagData.length === 0) {
   console.log("No groups found for the current user in GroupTag.");
   return;
 }

 // Extract group IDs from groupTagData
// Extract group IDs from groupTagData and filter out null values
const groupIds = groupTagData
  .map((groupTag) => groupTag.groupId)
  .filter((groupId) => typeof groupId === 'number' && !isNaN(groupId));

 // Fetch all groups associated with the extracted group IDs
 const { data: groupsData, error: groupsError } = await supabase
   .from("Groups")
   .select("*")
   .in("id", groupIds);

   console.log("These are the groups found: "+groupsData);
 if (groupsError) {
   console.error("Error fetching Groups data:", groupsError);
   return;
 }

 if (groupsData.length === 0) {
   console.log("No groups found for the current user.");
   return;
 }

 currentGroup = groupsData;

 console.log("This is the currentGroup:", currentGroup);
 socket.broadcast.emit("loadData", currentGroup);
 

    //const data = await group.findAll({ where: { groupToUser: currentUser.id } }); // Query the database using your Sequelize model
    // res.json(datas);
    console.log("This is the currentGroups " + currentGroup);

    try {
      const { data, error } = await supabase.from("User").select("*");

      const allusers = data;
      console.log("All users:", allusers);
      //The reason why we are using io here is because The server and client are connected to different namespaces. The emit and on should use the same io instance.
      io.emit("allUsersForMsg", allusers);
      //return allusers;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  });

  //Create Group(Hive) Logic############################
  //Gets the form data from the modal on the client side and puts that data into the database.
  //Create Group(Hive) Logic############################
  //Gets the form data from the modal on the client side and puts that data into the database.
  socket.on("creategroup", async (formData) => {
    console.log("Received create group(hive) request:", formData);
    try {
      // Retrieve user data from the shared object using socket.id
      //const user = activeUsers[socket.id];
      console.log("User session data in creategroup event:", currentUser);
      //console.log(sesuser);
      // Create a new group using the user's ID from the session
      console.log(currentUser.id);

      //Creates a group row on supbase
      const { data, error } = await supabase
        .from("Groups")
        .insert([
          {
            group_name: formData.hiveName,
            group_description: formData.hiveDescription,
            group_college: formData.selectedCollege,
            college_major: formData.selectedMajor,
            groupToUser: currentUser.id,
          },
        ])
        .select();

      currentGroup = {
      data
      };
      /* 
       currentGroup=await group.create({
            group_name: formData.hiveName,
            group_description: formData.hiveDescription,
            group_college: formData.selectedCollege, //currentUser.college
            college_major: formData.selectedMajor, //currentUser.major
            groupToUser: currentUser.id, // Use the user's ID from the session
        });*/
      console.log("This is the new group created: " + currentGroup);
      //creates the tag when the table is created
      /*
        currentGrouptag=await GroupTag.create({
          groupId: currentGroup.id,
          userId: currentUser.id,

        });*/
        const groupId = data[0].id;
        //Creates the grouptag on creation
        const { dataa, errror } = await supabase
        .from('GroupTag')
        .insert([
          { groupId: groupId, userId: currentUser.id },
        ])
        .select()
  
        console.log("Grouptag crreated: "+dataa);
  
    } catch (e) {
      // Returns error if group was not successfully made.
      console.error(e);
    }


    ///Old socket block of getting groups by groupToUser
    /*
    try {

      
      // Find all groups that the current user is a member of
      const { data, error } = await supabase
        .from("Groups")
        .select("*")
        .eq("groupToUser", currentUser.id);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      if (data.length === 0) {
        console.log("No groups found for the current user.");
        return;
      }

      currentGroup = data;

      console.log("This is the currentGroup:", data);
      socket.broadcast.emit("loadData", currentGroup);
      //socket.emit("loadData", currentGroup);
    } catch (error) {
      console.error("Fetch data error:", error);
    }*/
    try {
      // Find all group IDs associated with the current user in GroupTag table
      const { data: groupTagData, error: groupTagError } = await supabase
        .from("GroupTag")
        .select("groupId")
        .eq("userId", currentUser.id);
    
      if (groupTagError) {
        console.error("Error fetching GroupTag data:", groupTagError);
        return;
      }
    
      if (groupTagData.length === 0) {
        console.log("No groups found for the current user in GroupTag.");
        return;
      }
    
      // Extract group IDs from groupTagData
      const groupIds = groupTagData.map((groupTag) => groupTag.groupId);
    
      // Fetch all groups associated with the extracted group IDs
      const { data: groupsData, error: groupsError } = await supabase
        .from("Groups")
        .select("*")
        .in("id", groupIds);
    
      if (groupsError) {
        console.error("Error fetching Groups data:", groupsError);
        return;
      }
    
      if (groupsData.length === 0) {
        console.log("No groups found for the current user.");
        return;
      }
    
      currentGroup = groupsData;
    
      console.log("This is the currentGroup:", currentGroup);
      socket.broadcast.emit("loadData", currentGroup);
    } catch (error) {
      console.error("Fetch data error:", error);
    }
    
  }); 

  //GETS all POST ##################################################
  // Listen for a request to fetch a single post by ID
  socket.on("getAllPost", async (postID) => {
    try {
      //const postgroup = await group.findAll({ where: { groupToUser: currentUser.id } });

      let { data: Groups, error } = await supabase
        .from("Groups")
        .select("*")
        .eq("groupToUser", currentUser.id);

      const postgroup = Groups;

      //const allPost = await post.findAll({ where: { groupId: postgroup.id } });
      let { data: allPost, err } = await supabase
        .from("Posts")
        .select("*")
        .eq("groupId", postgroup.id);
      // currentPost=allPost;
      if (allPost) {
        // Emit the single post data to the client
        socket.emit("allPostData", allPost);
      }
    } catch (error) {
      // Emit an error message if there's an internal server error
      console.log(error);
      //socket.emit('singlePostError', { message: error.message });
    }
  });

  //CREATES A POST #############################################################
  // Listen for a request to create a new post
  socket.on("createPost", async (postData) => {
    console.log(currentUser);
    try {
      const response = await supabase.from("Posts").insert({
        post_content: postData.postContent,
        userId: currentUser.id,
        groupId: clickedhive,
      });
      console.log("Insert successful:", response);
    } catch (error) {
      console.error("Insert error:", error);
    }
    /*
       post.create({
        post_content: postData.postContent,
       // isSwarm: postData.isSwarm,
        //swarmLocation: postData.swarmLocation,
        userId: currentUser.id,
        groupId: clickedhive,
      });  */

    // Emit the created post data to the client
    //socket.emit('postCreated', newPost);

    // Emit an error message if there's an error creating the post
    // socket.emit('postCreationError', { message: error.message });
  });

  //////////////////REturns the id of the hive clicked/////////////////////
  //We can now use it to get the posts of the hive clicked
  socket.on("hiveclicked", async (data) => {
    clickedhive = await data; //Gets the id of the clicked group
    console.log("Current clicked hive ID: " + clickedhive);
    //data=0;
    try {
      // Gets all the posts of the current hive
      //Uses .the to only execute the emit after the posts have been fetched
      /*  post.findAll({ where: { groupId: clickedhive } })
     .then((postgroup) => {   console.log(data);
      io.emit("getHivePost", data);}) // Sends all the found post to the getHivePost listener
      //console.log("Emit Triggered?");
   
    .catch((error) => {
      console.log(error);
    });*/
      // currentPost = postgroup;
      // Use Supabase query to retrieve posts for the clicked hive
      const { data, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("groupId", clickedhive);
      //Sets the currentpost variable to the recieved data so that we can send it to the user.
      currentPost = data;
      console.log(currentPost);
      if (clickedhive) {
        console.log("The socket will be emitted");
        io.emit("getHivePost", currentPost);
      } // Sends all the found post to the getHivePost listener
      //console.log("Emit Triggered?");
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("rerenderPost",async ()=>{
    try {
      // Gets all the posts of the current hive
      //Uses .the to only execute the emit after the posts have been fetched
      /*  post.findAll({ where: { groupId: clickedhive } })
     .then((postgroup) => {   console.log(data);
      io.emit("getHivePost", data);}) // Sends all the found post to the getHivePost listener
      //console.log("Emit Triggered?");
   
    .catch((error) => {
      console.log(error);
    });*/
      // currentPost = postgroup;
      // Use Supabase query to retrieve posts for the clicked hive
      const { data, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("groupId", clickedhive);
      //Sets the currentpost variable to the recieved data so that we can send it to the user.
      currentPost = data;
      console.log(currentPost);
      if (clickedhive) {
        console.log("The socket will be emitted");
        io.emit("getHivePost", currentPost);
      } // Sends all the found post to the getHivePost listener
      //console.log("Emit Triggered?");
    } catch (e) {
      console.log(e); 
    }
  }) 

  /////////////////CREATE COMMENT/////////////////////////
  socket.on("createComment", async (datas) => {
    console.log("This is the comment data" + datas);
    const { data: newComment, error } = await supabase.from("Comments").insert({
      content: datas.text,
      postId: datas.pid.postId,
      userId: currentUser.id,
    });

    if (error) {
      console.error(error);
    } else {
      // The newComment variable will hold the created comment
    }
  });

  /////////////////Get COMMENTS/////////////////////////
  //let allComments;
  let groupostids;
  socket.on("getPostComments", async () => {
    //groupostids=await post.findAll({where:{groupId:clickedhive}})
    const { data: groupostids, error } = await supabase
      .from("Posts")
      .select("*")
      .eq("groupId", clickedhive);

    if (error) {
      console.error(error);
    } else {
      // Now you can work with the groupostids array
    }
    //Gets all the comments of the clicked hive

    const allComments = [];

    // Fetch comments for each post
    for (const postObj of groupostids) {
      // Use Supabase query to retrieve comments for the current post
      const { data: comments, error } = await supabase
        .from("Comments")
        .select("*")
        .eq("postId", postObj.id);

      if (error) {
        console.error(error);
      } else {
        allComments.push(...comments);
      }
    }

    /*
  // Fetch comments for each post
  for (const postObj of groupostids) {
    const comments = await comment.findAll({ where: { postId: postObj.id } });
    allComments.push(...comments);
  }
   // allComments=await comment.findAll({where:{postId:groupostids.id}})
*/
    socket.emit("receivePostComments", allComments); //emits the comments after the promise is finish executing
    console.log(allComments);
  });

   

  //////////////Creates a message table when the user selects buzz//////////////

  socket.on("selectedBuzz", async (data) => {
    console.log("This is the selected user Data:" + data.name);
    //thereceiver =await User.findOne({where:{name:data.name}});
    const { data: receiver, error } = await supabase
      .from("User")
      .select("*")
      .eq("name", data.name)
      .single();

    recID = data.id;
    console.log("This is the recivers ID: " + data.id);

    const [ssenderId, rreceiverId] =
      currentUser.id < recID
        ? [currentUser.id, recID]
        : [recID, currentUser.id];

    console.log(
      "The new senderID: " + ssenderId + " The new reciverID " + rreceiverId
    );

    const { data: currentMessage, err } = await supabase
      .from("Messages")
      .select("*")
      .eq("senderId", ssenderId)
      .eq("receiverId", rreceiverId);
    console.log(currentMessage);
    io.emit("conversation", currentMessage);
    // const getmsgtbl= await message.findOne({where:{senderId:currentUser.id,receiverId:receiver.id }})
    //if(getmsgtbl==null){

    // }
  });

  //Allows two users to communicate and displays previous messages
  socket.on("directmsg", async (msg) => {
    console.log("CurrentUser ID: " + currentUser.id + " Reciever Id " + recID);
    console.log("This is the direct msg data: " + msg);

    const [ssenderId, rreceiverId] =
      currentUser.id < recID
        ? [currentUser.id, recID]
        : [recID, currentUser.id];

    console.log(
      "The new senderID: " + ssenderId + " The new reciverID " + rreceiverId
    ); 

    try {
      const { data, error } = await supabase.from("Messages").insert([
        {
          senderId: ssenderId,
          receiverId: rreceiverId,
          content: currentUser.name + ": " + msg, //Puts the username before the message so that the users know who sent what message.
          creatorId: currentUser.id,
        },
      ]);
      console.log("Insert successful:", data);
    } catch (error) {
      console.error("Insert error:", error);
    }
    //console.log(data);
    //currentMessage= await message.findAll({where:{senderId:senderId,receiverId:receiverId}});

    const { data: currentMessage, err } = await supabase
      .from("Messages")
      .select("*")
      .eq("senderId", ssenderId)
      .eq("receiverId", rreceiverId);
    console.log(currentMessage);
    socket.emit("conversation", currentMessage);
  });

  //////////////////////Gets the initail user chat history//////////////////////////////////////
  /*
socket.on("getChatHistory",async ()=>{ 
 
  console.log("CurrentUser ID: "+ currentUser.id +" Reciever Id "+ recID);
  //console.log("This is the direct msg data: "+ msg);
  
  const [ssenderId, rreceiverId] = 
  currentUser.id < recID  
    ? [currentUser.id, recID]
    : [recID, currentUser.id];

    console.log("The new senderID: "+ssenderId+" The new reciverID "+ rreceiverId);

  const { data: currentMessage, err } = await supabase
  .from('Messages')
  .select('*')
  .eq('senderId', ssenderId)
  .eq('receiverId', rreceiverId);
  console.log(currentMessage);
 socket.emit("conversation",currentMessage);
});
 
*/

  ////////Final Crud that needs to be implemented/////////////////

  //UPDATES A POST#######################
  // Listen for a request to update a post
  socket.on("updatePost", async ({ postId, updatedData }) => {
    const { data, error } = await supabase
      .from("Posts")
      .update({ content: updatedData })
      .eq("id", postId)
      .eq("userId", currentUser.id)
      .select();
  });
  ///////////////Deletes a Post//////////////
  socket.on("deletePost", async (postId) => {
    console.log("ID of post to be deleted: "+ postId)
    try {
      const { data, error } = await supabase
        .from('Posts')
        .delete()
        .eq('id', postId)
        .eq('userId', currentUser.id);
    
      if (error) {
        console.error('Error deleting post:', error);
      } else {
        console.log('Post deleted successfully:', data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    
      //console.log("The command to delet post was executed "+ data);
  });

  ///////////////Updates a specific Comment/////////////////
  socket.on("updateComment", async ({ comID, updatedData }) => {
    const { data, error } = await supabase 
      .from("Comments") 
      .update({ content: updatedData })
      .eq("id", comID)
      .eq("userId", currentUser.id) //Ensure that only the user who made the comment can update it
      .select();
  });
    
  ///////Deletes the specific Comment////////////////

  socket.on("deleteComment", async ({ comId, updatedData }) => {
    const { error } = await supabase
      .from("Comments")
      .delete()
      .eq("id", comId) //Specifies the comment
      .eq("userId", currentUser.id); //Ensures that only the user who created the comment can delete it
  });

  ///////////Update Direct Message////////////
  socket.on("updateMSG", async ({ msgId, updatedData }) => {
    const { data, error } = await supabase
      .from("Messages")
      .update({ content: updatedData })  
      .eq("id", msgId)
      .eq("creatorId", currentUser.id) //only the user that created the message can update it
      .select();
  });
  
  ///////////////////Delete Direct Message/////////////////
  socket.on("deleteMSG", async (msgId) => {
    const { error } = await supabase
      .from("Messages")
      .delete()
      .eq("id", "msgId")
      .eq("creatorId", currentUser.id); //Can only delete the message if you created it
  });

  /////////////////Gets all Posts for general feed///////////////////
  socket.on("generalFeed", async () => {
    const { data, err } = await supabase.from("posts").select("*");

    io.emit("getGeneralFeed", data); //Sends back the array of post objects
  });

  /////////////Get All Groups for Discover//////////////
  socket.on("discoverGroups", async () => {
    let { data, error } = await supabase.from("Groups").select("*");

    io.emit("returnGroups", data);
  });



socket.on("joinGroup",async (groupID)=>{

  const { data, error } = await supabase
  .from('GroupTag')
  .insert([
    { groupId: groupID, userId: currentUser.id },
  ])
  .select()


  try {
    // Find all group IDs associated with the current user in GroupTag table
    const { data: groupTagData, error: groupTagError } = await supabase
      .from("GroupTag")
      .select("groupId")
      .eq("userId", currentUser.id);
  
    if (groupTagError) {
      console.error("Error fetching GroupTag data:", groupTagError);
      return;
    }
  
    if (groupTagData.length === 0) {
      console.log("No groups found for the current user in GroupTag.");
      return;
    }
  
    // Extract group IDs from groupTagData
    const groupIds = groupTagData
  .map((groupTag) => groupTag.groupId)
  .filter((groupId) => typeof groupId === 'number' && !isNaN(groupId));
  
    // Fetch all groups associated with the extracted group IDs
    const { data: groupsData, error: groupsError } = await supabase
      .from("Groups")
      .select("*")
      .in("id", groupIds);
  
    if (groupsError) {
      console.error("Error fetching Groups data:", groupsError);
      return;
    }
  
    if (groupsData.length === 0) {
      console.log("No groups found for the current user.");
      return;
    }
  
    currentGroup = groupsData;
  
    console.log("This is the currentGroup:", currentGroup);
    socket.broadcast.emit("loadData", currentGroup);
  } catch (error) {
    console.error("Fetch data error:", error);
  }
  //socket.broadcast.emit("loadData", currentGroup);
 
  console.log("Successfully created: "+data); 

})
















  //////////////////////////////NORMAL EXPRESS ENDPOINTS//////////////////////////////

  ////////////Get All Users//////////////////////
  app.get("/users", async (req, res) => {
    try {
      const { data, error } = await supabase.from("User").select("*");

      const allusers = data;
      console.log("All users:", allusers);
      socket.emit("allUsersFormsg", allusers);
      //return allusers;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    /* 
  try {
    const allusers = await User.findAll();
    res.status(200).json(allusers);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }*/
  });

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
  socket.on("disconnect", () => {

    console.log(currentUser?.name + " disconnected");
  });
});
// ...

// ...
// all other route handlers

app.use(express.static(path.join(__dirname, "../UniHive-Front-End/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../UniHive-Front-End/dist", "index.html"));
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
