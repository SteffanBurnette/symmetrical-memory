import{TbZoomMoney} from "react-icons/tb";
import{BiHelpCircle} from "react-icons/bi";
import {RiMoneyDollarCircleFill} from "react-icons/ri";
import {MdOutlineInsertChart} from "react-icons/md";
import {Outlet} from "react-router-dom";
import ClippedDrawer from "../components/ClippedDrawer";
import ResponsiveAppBar from '../components/NavBar';
import Post from '../components/Post';
//import PostShare from '../components/PostShare';

export default function MainPageLayout() {
  return (
    <div >
      <ResponsiveAppBar/>
    <ClippedDrawer/>
     <Post/>
    <main>
        <Outlet/>
    </main>
    </div>
  )
}