import React from 'react';
import GenerateWorkout from './GenerateWorkout';
import { useSelector, useDispatch } from 'react-redux';
import { removeExercise } from '../slices/chosenExercisesSlice';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { FaMinusCircle } from 'react-icons/fa';
import logo from '../logo/Fitbot2.png';

const PickExercise = () => {
  const { exercises } = useSelector((state) => state);

  const dispatch = useDispatch();

  function handleRemove(exercise) {
    dispatch(removeExercise(exercise));
  }

  return (
    <div className='pickExerciseContainer'>
      <div className='pickTransparentOverlay'></div>
      <div className='pickExerciseDivsContainer'>
        <img width={70} src={logo} alt='FitBot' className='cornerLogo' />

        <h1 className='intesityTitle'>Step 2/3</h1>
        <Link to='/intensity'>
          <BiLeftArrow
            className='leftArrowIntensity'
            color='#A7FF37'
            size='70'
          />
        </Link>
        <div className='pickExerciseBox'>
          <div>
            <GenerateWorkout />
          </div>
        </div>
        <div className='selectedExercises generatedResponse'>
          <h1 className='pickExerciseTitle'>Selected Exercises</h1>
          {exercises.exercises.map((exercise, idx) => {
            return (
              <div key={idx} className='singleGeneratedExercise'>
                <span className='singleExercise'>
                  {exercise}
                  <button onClick={() => handleRemove(exercise)}>
                    <FaMinusCircle
                      color={'#FF3767'}
                      size={17}
                      className='hover:scale-125 duration-150'
                    />
                  </button>
                </span>
              </div>
            );
          })}
        </div>
        <Link to='/finalize'>
          <BiRightArrow
            className='leftArrowIntensity'
            color='#A7FF37'
            size='70'
          />
        </Link>
      </div>
    </div>
  );
};

export default PickExercise;
