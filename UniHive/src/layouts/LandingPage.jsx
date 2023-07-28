import React from "react"
import "../styles/landingpage.css"
import logo from '../images/unihivelogoBLK.png'
import studentImg from '../images/students.png'


export default function LandingPage (){

    return(
        <>

        <img  id= "logo" src = {logo} alt="logo"/>

        <div className="infotext">
            <h1 className="title">Bee Social,<br/>Bee Connected</h1>
            <p className="infoparagraph">Our platform is tailored to enhance the college experience,<br/> making it easier for YOU to form meaningful connections,<br/> organize in-person meetups,<br/> and share your valuable insights on courses you've taken.</p>
        </div>

        <div className = "imgSection">
            <img className="studentImg" src={studentImg} alt="studentImg"/>
        </div>
        
    </>

    );

}