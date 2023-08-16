import React, { useState } from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import theme from "../Themes/theme.jsx";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import ClippedDrawer from "../components/ClippedDrawer";
import ResponsiveAppBar from "../components/NavBar";
import Post from "../components/Post";
import ChatBox from "../components/ChatBox";
import Discover from "../components/Discover";
import Navbar from "../components/NavBar";
import Swarm from "../components/Swarm.jsx";

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

export default function MainPageLayout() {
  const { loading, userInfo, userToken, error, success } = useSelector(
    (state) => state.auth
  );
  const [showDiscover, setShowDiscover] = useState(false);
  const [showSwarm, setShowSwarm] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <CssBaseline />
        <AppBarContainer>
          <Navbar
            onDiscoverClick={() => setShowDiscover(!showDiscover)}
            onSwarmsClick={() => setShowSwarm(!showSwarm)}
          />
        </AppBarContainer>
        {/* Main Content */}
        <MainContentContainer>
          <ClippedDrawer />
          {showDiscover && <Discover />}
          {showSwarm && <Swarm />}
          <Post />
          <ChatBox />
        </MainContentContainer>
      </RootContainer>
    </ThemeProvider>
  );
}