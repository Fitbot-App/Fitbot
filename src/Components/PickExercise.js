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
import CustomTooltip from './Tooltip';
import { useEffect, useState, useCallback } from 'react';

const PickExercise = () => {
  const { exercises } = useSelector((state) => state);

  const dispatch = useDispatch();

  function handleRemove(exercise) {
    dispatch(removeExercise(exercise));
  }
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
    <div className='pickExerciseContainer'>
      <div className='pickTransparentOverlay'></div>
      <div className='pickExerciseDivsContainer'>
        <h1 className='intesityTitle'>Step 3/3</h1>
        <Link className='cornerLogo' to='/'>
          <img width={70} src={logo} alt='FitBot' />
        </Link>
        {user.currentUser && (
          <div className='flex absolute top-6 right-6 z-20'>
            <Account />
          </div>
        )}
        {!isBreakpoint && (
          <Link to='/equipment'>
            <MdKeyboardDoubleArrowLeft
              className='leftArrowIntensity'
              color='black'
              size='70'
            />
          </Link>
        )}

        <div className='pickExerciseBox'>
          <div>
            <GenerateWorkout />
          </div>
        </div>
        <div className='selectedExercises generatedResponse'>
          <div className='flex justify-center items-center'>
            <span className='pickExerciseTitle flex items-center'>
              Selected Exercises
              <CustomTooltip
                text={
                  'The exercises you chose to include in your workout will appear below.'
                }
              />
            </span>
          </div>
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
        {isBreakpoint ? (
          <div className='arrowContainer'>
            <Link to='/equipment'>
              <MdKeyboardDoubleArrowLeft
                className='leftArrowIntensity'
                color='black'
                size='70'
              />
            </Link>
            {exercises.exercises.length ? (
              <Link to='/finalize'>
                <MdKeyboardDoubleArrowRight
                  className={`rightArrowIntensity ${
                    exercises.exercises.length ? 'pulse' : ''
                  }`}
                  color='black'
                  size='70'
                />
              </Link>
            ) : (
              <ModalWarning pick={true} />
            )}
          </div>
        ) : exercises.exercises.length ? (
          <Link to='/finalize'>
            <MdKeyboardDoubleArrowRight
              className={`rightArrowIntensity ${
                exercises.exercises.length ? 'pulse' : ''
              }`}
              color='black'
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
