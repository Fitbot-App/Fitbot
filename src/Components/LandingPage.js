import React from 'react';
// import { FaRunning, FaSwimmer } from 'react-icons/fa';
import { BsLightning } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import logo from '../logo/FitBot.png';
import logo2 from '../logo/Fitbot2.png';
import { useAuth } from '../AuthContext';
import { useEffect, useState, useCallback } from 'react';

export default function LandingPage() {
  const user = useAuth();
  const navigate = useNavigate();

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, [width, updateTarget]);

    return targetReached;
  };

  const isBreakpoint = useMediaQuery(600);

  return (
    <div className='landingContainer'>
      <div className='landingTransparentOverlay' />
      <div className='landingLogoContainer'>
        {isBreakpoint ? (
          <div className='cornerLogo' to='/'>
            <img width={70} src={logo2} alt='FitBot' />
          </div>
        ) : (
          <img
            className='landingPageLogo'
            src={logo}
            alt='FitBot'
            width={350}
            height={500}
          />
        )}
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
        <BsLightning
          color='#A7FF37'
          size={60}
          className='z-[2] absolute mx-2'
        />
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
