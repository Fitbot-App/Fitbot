import React from 'react';
// import { FaRunning, FaSwimmer } from 'react-icons/fa';
import { BsLightning } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import logo from '../logo/FitBot.png';
import { useSelector } from 'react-redux';

export default function LandingPage() {
  const state = useSelector((state) => state);
  console.log(state);
  const navigate = useNavigate();
  return (
    <div className='landingContainer'>
      <div className='landingTransparentOverlay' />
      <div className='landingLogoContainer'>
        <img
          className='landingPageLogo'
          src={logo}
          alt='FitBot'
          width={350}
          height={500}
        />
      </div>
      <div className='landingButtonsContainer'>
        <button
          className='landingButton'
          onClick={() => {
            navigate('/intensity');
          }}
        >
          Continue as Guest
        </button>
        <BsLightning color='#A7FF37' size={60} className='z-[2]' />
        <button
          className='landingButton'
          onClick={() => {
            navigate('/Login');
          }}
        >
          Login / Sign Up
        </button>
      </div>
      {/* <div className='landingIconsContainer'>
          <div className='landingIcons'>
            <FaRunning color='#A7FF37' size='96' />
            <IoIosFitness color='#A7FF37' size='96' />
            <FaSwimmer color='#A7FF37' size='96' />
          </div>
        </div> */}
    </div>
  );
}
