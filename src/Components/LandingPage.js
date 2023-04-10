import React from 'react';
// import { FaRunning, FaSwimmer } from 'react-icons/fa';
import { BsLightning } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import logo from '../logo/FitBot.png';
import { useAuth } from '../AuthContext';

export default function LandingPage() {
  const user = useAuth();

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
          New Workout
        </button>
        <BsLightning color='#A7FF37' size={60} className='z-[2]' />
        <button
          className='landingButton'
          onClick={() => {
            if (user.currentUser) {
              navigate('/home');
            } else {
              navigate('/Login');
            }
          }}
        >
          {user.currentUser ? 'Dashboard' : 'Login / Sign Up'}
        </button>
      </div>
    </div>
  );
}
