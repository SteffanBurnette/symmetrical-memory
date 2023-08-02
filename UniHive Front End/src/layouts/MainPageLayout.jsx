import{TbZoomMoney} from "react-icons/tb";
import{BiHelpCircle} from "react-icons/bi";
import {RiMoneyDollarCircleFill} from "react-icons/ri";
import {MdOutlineInsertChart} from "react-icons/md";
import {Outlet} from "react-router-dom";
import ClippedDrawer from "../components/ClippedDrawer";

export default function MainPageLayout() {
  return (
    <div >
    <ClippedDrawer/>
    <main>
        <Outlet/>
    </main>
    </div>
  )
}