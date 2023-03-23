import React from 'react';
import { setIntensity, setExperience } from '../slices/intensitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Intensity = () => {
  const intensity = useSelector((state) => state.intensity.intensity);
  const experience = useSelector((state) => state.intensity.experience);
  console.log(intensity);
  console.log(experience);
  const dispatch = useDispatch();

  const handleExperienceClick = (e) => {
    dispatch(setExperience(e.target.value));
  };

  const handleIntensityClick = (e) => {
    dispatch(setIntensity(e.target.value));
  };

  return (
    <div className='intensityContainer'>
      <div className='intensityTransparentOverlay' />
      <div className='intensityDivsContainer'>
        <Link to='/'>
          <BiLeftArrow
            className='leftArrowIntensity'
            color='#A7FF37'
            size='70'
          />
        </Link>
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
        <Link to='/pickExercise'>
          <BiRightArrow
            className='rightArrowIntensity'
            color='#A7FF37'
            size='70'
          />
        </Link>
      </div>
    </div>
  );
};

export default Intensity;
