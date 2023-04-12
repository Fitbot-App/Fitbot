import React from 'react';
import GenerateWorkout from './GenerateWorkout';
import { useSelector, useDispatch } from 'react-redux';
import { removeExercise } from '../slices/chosenExercisesSlice';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaMinusCircle } from 'react-icons/fa';
import logo from '../logo/Fitbot2.png';
import { useAuth } from '../AuthContext';
import Account from './Account';
import ModalWarning from './ModalWarning';

const PickExercise = () => {
  const { exercises } = useSelector((state) => state);

  const dispatch = useDispatch();

  function handleRemove(exercise) {
    dispatch(removeExercise(exercise));
  }
  const user = useAuth();

  return (
    <div className='pickExerciseContainer'>
      <div className='pickTransparentOverlay'></div>
      <div className='pickExerciseDivsContainer'>
        <h1 className='intesityTitle'>Step 3/3</h1>
        <Link className='cornerLogo' to='/'>
          <img width={70} src={logo} alt='FitBot' />
        </Link>
        {user.currentUser && (
          <div className='flex absolute top-6 left-6 z-20'>
            <Account />
          </div>
        )}
        <Link to='/equipment'>
          <MdKeyboardDoubleArrowLeft
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
                      color={'#2c63fc'}
                      size={17}
                      className='hover:scale-125 duration-150'
                    />
                  </button>
                </span>
              </div>
            );
          })}
        </div>
        {exercises.exercises.length ? (
          <Link to='/finalize'>
            <MdKeyboardDoubleArrowRight
              className={`rightArrowIntensity ${
                exercises.exercises.length ? 'pulse' : ''
              }`}
              color='#A7FF37'
              size='70'
            />
          </Link>
        ) : (
          <ModalWarning pick={true} />
        )}
      </div>
    </div>
  );
};

export default PickExercise;
