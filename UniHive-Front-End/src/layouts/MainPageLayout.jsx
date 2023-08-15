import { TbZoomMoney } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineInsertChart } from "react-icons/md";
import { Outlet } from "react-router-dom";
import ClippedDrawer from "../components/ClippedDrawer";
import ResponsiveAppBar from "../components/NavBar";
import Post from "../components/Post";
import ChatBox from "../components/ChatBox";
import { ThemeProvider, styled } from "@mui/material/styles";
import theme from "../Themes/theme.jsx";
import { useSelector } from "react-redux";
//import PostShare from '../components/PostShare';
//import theme from '../Themes/theme.jsx';
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
  const { loading, userInfo, userToken, error, success } = useSelector(
    (state) => state.auth
  );
  console.log(userInfo);
  console.log(userToken);
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
        <Post/>
        <ChatBox />
        <Outlet />
      </MainContentContainer>
    </RootContainer>
  </ThemeProvider>
  );
}
