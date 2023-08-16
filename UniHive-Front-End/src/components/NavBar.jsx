import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../assets/Logo.svg";
import Bell from "../assets/Bell.svg";
import Discover from "../assets/Discover.svg";
import Faqs from "../assets/Faqs.svg";
import Swarms from "../assets/Swarms.svg";
import { createTheme } from "@mui/material/styles";
import "../styles/NavBar.css";
import { Divider } from "@mui/material";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar({ onDiscoverClick, onSwarmsClick }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <div className=" h-auto bg-[#1B1D21] flex justify-between">
        <div className="flex items-center ml-10">
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "50px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </div>
        <div className="flex items-center ">
          <Typography
            variant="h6"
            fontFamily="Horta"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 50,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            UNIHIVE
          </Typography>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "150px", height: "auto", marginLeft: "-35px" }}
          />
        </div>
        <div className="flex justify-end">
          <Button>
            <img
              src={Bell}
              alt="Bell"
              style={{ width: "95px", height: "auto" }}
            />
          </Button>
          <Button>
            <img
              src={Swarms}
              alt="Swarms"
              onClick={onSwarmsClick}
              style={{ width: "80px", height: "auto" }}
            />
          </Button>
          <Button>
            <img
              src={Discover}
              alt="Discover"
              onClick={onDiscoverClick}
              style={{ width: "105px", height: "auto" }}
            />
          </Button>
          <Button>
            <img
              src={Faqs}
              alt="Faqs"
              style={{ width: "80px", height: "auto" }}
            />
          </Button>
        </div>
        <Divider />
      </div>
      <Divider />
    </div>
  );
}

export default ResponsiveAppBar;