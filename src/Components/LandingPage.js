import React from "react";
import { FaRunning, FaSwimmer } from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import logo from "../logo/FitBot.png";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landingContainer">
      <img
        className="landingPageLogo"
        src={logo}
        alt="FitBot"
        width={200}
        height={300}
      />
      {/* <h1 className="landingTitle">Welcome to FitBot</h1> */}
      <div className="landingButtonsContainer">
        <button
          className="landingButton"
          onClick={() => {
            navigate("/pickExercise");
          }}
        >
          Continue as Guest
        </button>
        <button
          className="landingButton"
          onClick={() => {
            navigate("/Login");
          }}
        >
          Login or Sign Up
        </button>
      </div>
      <div className="landingIconsContainer">
        <div className="landingIcons">
          <FaRunning color="#A7FF37" size="96" />
          <IoIosFitness color="#A7FF37" size="96" />
          <FaSwimmer color="#A7FF37" size="96" />
        </div>
      </div>
    </div>
  );
}
