import React from 'react';
import GenerateWorkout from './GenerateWorkout';
import { useSelector, useDispatch } from 'react-redux';
import { removeExercise } from '../slices/chosenExercisesSlice';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const PickExercise = () => {
  const { exercises } = useSelector((state) => state);

  const dispatch = useDispatch();

  function handleRemove(exercise) {
    dispatch(removeExercise(exercise));
  }

  return (
    <div className='pickExerciseContainer'>
      <Link to='/intensity'>
        <BiLeftArrow className='leftArrowIntensity' color='#A7FF37' size='70' />
      </Link>
      <div className='pickExerciseBox'>
        <div>
          <GenerateWorkout />
        </div>
      </div>
      <div className='selectedExercises generatedResponse'>
        {exercises.exercises.map((exercise, idx) => {
          return (
            <div key={idx} className='singleGeneratedExercise'>
              <span className='singleExercise'>
                {exercise}
                <button onClick={() => handleRemove(exercise)}>-</button>
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
  );
};

export default PickExercise;
