import React from 'react';
import { setIntensity, setExperience } from '../slices/intensitySlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from '../logo/Fitbot2.png';
import { useAuth } from '../AuthContext';
import Account from './Account';
import { useEffect, useState, useCallback } from 'react';

const Intensity = () => {
  const intensity = useSelector((state) => state.intensity.intensity);
  const experience = useSelector((state) => state.intensity.experience);
  const dispatch = useDispatch();

  const handleExperienceClick = (e) => {
    if (experience === e.target.value) {
      dispatch(setExperience(''));
    } else {
      dispatch(setExperience(e.target.value));
    }
  };

  const handleIntensityClick = (e) => {
    if (intensity === e.target.value) {
      dispatch(setIntensity(''));
    } else {
      dispatch(setIntensity(e.target.value));
    }
  };

  const user = useAuth();

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
    <div className='intensityContainer'>
      <div className='intensityTransparentOverlay' />

      <h1 className='intesityTitle'>Step 1/3</h1>
      <Link to='/'>
        <img width={70} src={logo} alt='FitBot' className='cornerLogo' />
      </Link>
      <div className='intensityDivsContainer'>
        {user.currentUser && (
          <div className='flex absolute top-6 right-6 z-20'>
            <Account />
          </div>
        )}
        {isBreakpoint ? null : (
          <Link to='/'>
            <MdKeyboardDoubleArrowLeft
              className='leftArrowIntensity'
              color='black'
              size='70'
            />
          </Link>
        )}
        <div className='intensityDiv'>
          <h2 className='title'>Set Your Experience Level</h2>
          <button
            className={`${
              experience === 'Beginner'
                ? 'intensityButtonSelected'
                : 'intensityButton'
            }`}
            value='Beginner'
            onClick={handleExperienceClick}
          >
            Beginner
          </button>
          <button
            className={`${
              experience === 'Intermediate'
                ? 'intensityButtonSelected'
                : 'intensityButton'
            }`}
            value='Intermediate'
            onClick={handleExperienceClick}
          >
            Intermediate
          </button>
          <button
            className={`${
              experience === 'Advanced'
                ? 'intensityButtonSelected'
                : 'intensityButton'
            }`}
            value='Advanced'
            onClick={handleExperienceClick}
          >
            Advanced
          </button>
        </div>
        <div className='intensityDiv'>
          <h2 className='title'>Set Your Desired Intensity</h2>
          <button
            className={`${
              intensity === 'Easy'
                ? 'intensityButtonSelected'
                : 'intensityButton'
            }`}
            value='Easy'
            onClick={handleIntensityClick}
          >
            Easy
          </button>
          <button
            className={`${
              intensity === 'Medium'
                ? 'intensityButtonSelected'
                : 'intensityButton'
            }`}
            value='Medium'
            onClick={handleIntensityClick}
          >
            Medium
          </button>
          <button
            className={`${
              intensity === 'Hard'
                ? 'intensityButtonSelected'
                : 'intensityButton'
            }`}
            value='Hard'
            onClick={handleIntensityClick}
          >
            Hard
          </button>
        </div>
        {isBreakpoint && (
          <>
            <Link to='/equipment'>
              <MdKeyboardDoubleArrowRight
                className={`rightArrowIntensity ${
                  intensity && experience ? 'pulse' : ''
                }`}
                color='black'
                size='70'
              />
            </Link>

            <Link to='/'>
              <MdKeyboardDoubleArrowLeft
                className='leftArrowIntensity'
                color='black'
                size='70'
              />
            </Link>
          </>
        )}
        {isBreakpoint ? null : (
          <Link to='/equipment'>
            <MdKeyboardDoubleArrowRight
              className={`rightArrowIntensity ${
                intensity && experience ? 'pulse' : ''
              }`}
              color='black'
              size='70'
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Intensity;
