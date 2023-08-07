import { Outlet, NavLink } from "react-router-dom";
import { FaHome} from "react-icons/fa";
import{TbZoomMoney} from "react-icons/tb";
import{BiHelpCircle} from "react-icons/bi";
import {RiMoneyDollarCircleFill} from "react-icons/ri";
import {MdOutlineInsertChart} from "react-icons/md";

export default function RootLayout() {
  return (
   
    <div>
          <main>
        <Outlet/>
      </main>
    </div>
  );
}

/**
 * <div className="root-layout">
      <header className="main-header-nav">
        <nav>
          <NavLink to="/" className="main-nav"><FaHome />Home</NavLink>
          
         
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
 */