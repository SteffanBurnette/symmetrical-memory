import React from "react";
import "../styles/landingpage.css";
import logo from "../images/unihiveLogoOff.png";
import studentImg from "../images/studentMeet.png";
import Login from "../components/Login";
import SignUp from "../components/SingnUp";

export default function LandingPage() {
  return (
    <div>
      <img id="logo" src={logo} alt="logo" />

      <div className="infotext">
        <h1 className="title">
          Bee Social,
          <br />
          Bee Connected
        </h1>
        <p className="infoparagraph">
          Our platform is tailored to enhance the college
          <br /> experience, making it easier for YOU to form <br />
          meaningful connections, organize in-person meetups, <br />
          and share your valuable insights on courses you've taken.
        </p>
        
        <div>
          <Login />
          <SignUp/>
          </div>
      </div>
      <div className="imgSection">
        <img className="studentImg" src={studentImg} alt="studentImg" />
      </div>
    </div>
  );
}
