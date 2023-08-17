import React, { useState, useEffect } from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import theme from "../Themes/theme.jsx";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import ClippedDrawer from "../components/ClippedDrawer";
import Navbar from "../components/NavBar";
import Post from "../components/Post";
import ChatBox from "../components/ChatBox";
import Discover from "../components/Discover";
import Swarm from "../components/Swarm.jsx";
import io from "socket.io-client";
import {
  setShowSwarm,
  setShowDiscover,
  setShowPosts,
} from "../../redux/userInfoSlice.js"; // Import the correct action creators

const RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

const AppBarContainer = styled("header")({
  zIndex: theme.zIndex.drawer + 2,
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
});

const MainContentContainer = styled("main")({
  flexGrow: 1,
  overflow: "auto",
  padding: theme.spacing(3),
});

const socket = io("http://localhost:3010");
export default function MainPageLayout() {
  const { showDiscover, showSwarm, showPosts } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [postdata, setPostData] = useState([]);

  useEffect(() => {
    socket.on("getHivePost", (data) => {
      if (postdata !== data) {
        console.log(
          "Testing to see if the post data is a collection of all posts"
        );
        console.log(postdata);
        setPostData(data);
      }
    });
  }, [postdata]);

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <CssBaseline />
        <AppBarContainer>
          <Navbar
            onDiscoverClick={() => {
              dispatch(setShowDiscover()); // Dispatch the correct action
            }}
            onSwarmsClick={() => {
              dispatch(setShowSwarm()); // Dispatch the correct action
            }}
          />
        </AppBarContainer>
        {/* Main Content */}
        <MainContentContainer>
          <ClippedDrawer />
          {showDiscover && <Discover />}
          {showSwarm && <Swarm />}
          {showPosts && <Post postdata={postdata} setPostData={setPostData} />}
          <ChatBox />
        </MainContentContainer>
      </RootContainer>
    </ThemeProvider>
  );
}
