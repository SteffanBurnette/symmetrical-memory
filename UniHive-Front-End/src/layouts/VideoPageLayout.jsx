import { TbZoomMoney } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineInsertChart } from "react-icons/md";
import { Outlet } from "react-router-dom";
import ClippedDrawer from "../components/ClippedDrawer";
import ResponsiveAppBar from "../components/NavBar";
import Post from "../components/Post";
import ChatBox from "../components/ChatBox";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Themes/theme.jsx";
//import PostShare from '../components/PostShare';

export default function VideoPageLayout() {
  return (
    <div>
      <ResponsiveAppBar />
      <ClippedDrawer />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
