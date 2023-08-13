import React from 'react';
import { Outlet } from 'react-router-dom';
import ClippedDrawer from '../components/ClippedDrawer';
import ResponsiveAppBar from '../components/NavBar';
import Post from '../components/Post';
import ChatBox from '../components/ChatBox';
import { ThemeProvider, styled } from '@mui/material/styles'; // Use styled from here
import theme from '../Themes/theme.jsx';
import CssBaseline from '@mui/material/CssBaseline';

const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const AppBarContainer = styled('header')({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
});

const MainContentContainer = styled('main')({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(3),
});

export default function MainPageLayout() {
  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <CssBaseline />

        {/* AppBar */}
        <AppBarContainer>
          <ResponsiveAppBar />
        </AppBarContainer>

        {/* Main Content */}
        <MainContentContainer>
          <ClippedDrawer />
          <Post />
          <ChatBox />
          <Outlet />
        </MainContentContainer>
      </RootContainer>
    </ThemeProvider>
  );
}



















// import{TbZoomMoney} from "react-icons/tb";
// import{BiHelpCircle} from "react-icons/bi";
// import {RiMoneyDollarCircleFill} from "react-icons/ri";
// import {MdOutlineInsertChart} from "react-icons/md";
// import {Outlet} from "react-router-dom";
// import ClippedDrawer from "../components/ClippedDrawer";
// import ResponsiveAppBar from '../components/NavBar';
// import Post from '../components/Post';
// import ChatBox from "../components/ChatBox";
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../Themes/theme.jsx';
// //import PostShare from '../components/PostShare';

// export default function MainPageLayout() {
//   return (
//     <div >
//       <ResponsiveAppBar/>
//     <ClippedDrawer/>
 
//      <Post/>
     
//      <ChatBox/>
//     <main>
//         <Outlet/>
//     </main>
//     </div>
//   )
// }