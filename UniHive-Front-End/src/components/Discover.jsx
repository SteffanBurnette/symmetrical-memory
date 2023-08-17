import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  useDisclosure,
  Flex,
  Spacer,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import supabase from "../../config";
import "../assets/Discover.css"; // Import the CSS file
import io from "socket.io-client";

const socket = io("http://localhost:3010");

export default function Discover() {
  const [hives, setHives] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Groups").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setHives(data);
      }
    };
    fetchData();
  }, []);

  const onJoin = (groupId) => {
    socket.emit("joinGroup", groupId);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <div className=" h-screen w-screen flex justify-center items-center mt-20 pt-20">
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          className="mt-[1300px] pt-30"
        >
          {hives.map((hive, index) => (
            <Box
              key={hive.id}
              className="card rounded-lg mt-3 bg-[#1B1D21] text-white"
              p={4}
              borderRadius="md"
              boxShadow="md"
              m={2}
            >
              <Flex flexDirection="column" height="100%">
                <Flex alignItems="flex-end">
                  <Avatar
                    size="md"
                    name={hive.group_name}
                    src={hive.group_image}
                  />
                  <Box ml={4} className=" text-white">
                    <Heading size="md" color="white">
                      {hive.group_name}
                    </Heading>
                  </Box>
                </Flex>
                <Divider mt={2} mb={2} height="1px" borderColor="gray.300" />
                <Text mt={2} color="white">
                  {hive.group_description}
                </Text>
                <Spacer />
                <Button
                  mt={4}
                  className="join-button w-20"
                  color="black"
                  onClick={() => {
                    onJoin(hive.id); // Call the first function
                    onOpen(); // Call the second function
                  }}
                >
                  Join
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </div>
    </ChakraProvider>
  );
}
