import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Avatar,
  IconButton,
  Image,
  Collapse,
  Input,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import supabase from "../../config";
import CommentPost from "../components/CommentPost"
import "../assets/Discover.css"; // Import the CSS file
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { format } from "date-fns";


const socket = io("http://localhost:3010");
export default function RecipeReviewCard({ postdata, setPostData }) {
  const [expandedMap, setExpandedMap] = useState({});
  //const [postdata, setPostData] = useState([]);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState({});
  const [showCommentField, setShowCommentField] = useState({});
  //const [expandedMap, setExpandedMap] = React.useState({}); //handles individual state for comments
  const [commentCounts, setCommentCounts] = React.useState({});

  //Deletes post when envoked
const handleDeletePost= (postId) =>{
  socket.emit("deletePost", postId); 
  socket.emit("rerenderPost");//rerenders component when envoked
}

//Seperates the state of each comment individually so that one action does not effect all.
const handleExpandClick = (postId) => {
  setExpandedMap((prevExpandedMap) => ({
    ...prevExpandedMap,
    [postId]: !prevExpandedMap[postId],
  }));

  socket.emit("getPostComments");
  
};

const handleToggleShowCommentField = (postId) => {
  setShowCommentField((prevShowCommentField) => ({
    ...prevShowCommentField,
    [postId]: !prevShowCommentField[postId],
  }));
  
  setExpandedMap((prevExpandedMap) => ({
    ...prevExpandedMap,
    [postId]: !prevExpandedMap[postId],
  }));

  socket.emit("getPostComments");
};
/*
  const handleExpandClick = (postId) => {
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [postId]: !prevExpandedMap[postId],
    }));
    socket.emit("getPostComments");
  };*/

  /*
  React.useEffect(() => {
    socket.on("getHivePost", (data) => {
      try {
        if (postdata !== data) {
          setPostData(data);
        }
      } catch (error) {
        console.error("Error updating postdata:", error);
      }
    });*/

    // Clean up the socket event listener when the component unmounts
    /*
    return () => {
      socket.off("getHivePost");
    };*/

 // }, [postdata]); //postform caused to many rerenders, need to experiment


  const customTheme = extendTheme({
    styles: {
      global: {
        body: {
          backgroundColor: "black",
          color: "white",
        },
      },
    },
  });

  const handleCommentChange = (postId, commentText) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: commentText,
    }));
  };

  const handlePostComment = (postId) => {
    console.log("Comment for post", postId, ":", comments[postId]);
    // TODO: Post the comment to the server
    setShowCommentField((prevShowCommentField) => ({
      ...prevShowCommentField,
      [postId]: false,
    }));
  };


// Function to fetch comments for a specific post
const fetchPostComments = (postId) => {
  socket.emit("getPostComments", postId);
};

// Listen for comments from the socket
useEffect(() => {
  socket.on("receivedPostComments", (postId, commentsData) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: commentsData,
    }));
  });

  // Clean up the socket event listener when the component unmounts
  return () => {
    socket.off("receivedPostComments");
  };
}, []);


return (
  <ChakraProvider theme={customTheme}>
    <div className="flex justify-end items-center flex-col ">
      {postdata &&
        postdata.map((post, index) => (
          <Box
            key={post.id}
            maxW="lg"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            className=" mt-5"
          >
            <Flex p="4" alignItems="center" justifyContent="space-between">
              <Flex alignItems="center">
                <Avatar
                  size="md"
                  name={post.group_name}
                  src={post.group_image}
                />
                <Box ml="4">
                  <Heading size="sm">{post.poster_name}</Heading>
                  <Text>
                    {format(new Date(post.created_at), "MMMM d, yyyy h:mm a")}
                  </Text>
                </Box>
              </Flex>
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              />
            </Flex>
            <Box p="4">
              <Text>{post.post_content}</Text>
            </Box>
            <Image
              objectFit="cover"
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Chakra UI"
            />
            <Flex p="4" justifyContent="space-between">
              <Button variant="ghost" leftIcon={<BiLike />}>
                Like
              </Button>
              <Button
                variant="ghost"
                leftIcon={<BiChat />}
                onClick={() => handleToggleShowCommentField(post.id)}
              >
                Comment
              </Button>
              <Button variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </Flex>
            <Collapse in={showCommentField[post.id]}>
              <Flex p="4" alignItems="center">
                <Input
                  placeholder="Type your comment"
                  value={comments[post.id] || ""}
                  onChange={(e) =>
                    handleCommentChange(post.id, e.target.value)
                  }
                  flex="1"
                />
                <Button ml="4" onClick={() => handlePostComment(post.id)}>
                  Post
                </Button>
              </Flex>
              {/* Include the CommentPost component */}
              <CommentPost postId={post.id} />
            </Collapse>
            {comments[post.id] && (
              <Box mt="4">
                {comments[post.id].map((comment, commentIndex) => (
                  <Box
                    key={commentIndex}
                    p="2"
                    borderWidth="1px"
                    borderRadius="lg"
                    mt="2"
                  >
                    <Text>{comment.comment_text}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))}
    </div>
  </ChakraProvider>
);

}