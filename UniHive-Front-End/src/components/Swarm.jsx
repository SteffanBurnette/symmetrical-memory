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
import "../assets/Discover.css"; // Import the CSS file
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { format } from "date-fns";
import MapComponent from "./MapComponent";
import { LoadScript } from "@react-google-maps/api";

const socket = io("http://localhost:3010");

export default function Swarm() {
  const [expandedMap, setExpandedMap] = useState({});
  const [postdata, setPostData] = useState([]);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState({});
  const [showCommentField, setShowCommentField] = useState({});

  const handleExpandClick = (postId) => {
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [postId]: !prevExpandedMap[postId],
    }));
    socket.emit("getPostComments");
  };

  useEffect(() => {
    socket.on("getHivePost", (data) => {
      if (postdata !== data) {
        console.log(postdata);
        setPostData(data);
      }
    });
  }, [postdata]);

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

  return (
    <ChakraProvider theme={customTheme}>
      <LoadScript googleMapsApiKey="AIzaSyDi_DdTpg4gxiRhgRGMcB0-UAQk_U7u5lo">
        <div className="flex justify-end items-center flex-col ">
          {postdata &&
            postdata.map((post, index) => (
              <Box
                key={index}
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
                        {format(
                          new Date(post.created_at),
                          "MMMM d, yyyy h:mm a"
                        )}
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
                <MapComponent lat={40.6015} lng={-74.1482} />

                <Flex p="4" justifyContent="space-between">
                  <Button variant="ghost" leftIcon={<BiLike />}>
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    leftIcon={<BiChat />}
                    onClick={() =>
                      setShowCommentField((prevShowCommentField) => ({
                        ...prevShowCommentField,
                        [post.id]: !prevShowCommentField[post.id],
                      }))
                    }
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
                </Collapse>
              </Box>
            ))}
        </div>
      </LoadScript>
    </ChakraProvider>
  );
}