import React from 'react';
import GenerateWorkout from './GenerateWorkout';
import { useSelector, useDispatch } from 'react-redux';
import { removeExcercise } from '../slices/chosenExcercisesSlice';

const PickExercise = () => {
  const excercises = useSelector((state) => state.excercises);

  const dispatch = useDispatch();

  function handleRemove(excercise) {
    dispatch(removeExcercise(excercise));
  }

  return (
    <div className='pickExcerciseContainer'>
      <div className='pickExcerciseBox'>
        <div>
          <GenerateWorkout />
        </div>
      </div>
      <div className='selectedExcercises generatedResponse'>
        {excercises.excercises.map((excercise, idx) => {
          return (
            <div key={idx} className='singleGeneratedExcercise'>
              <span className='singleExcercise'>
                {excercise}
                <button onClick={() => handleRemove(excercise)}>-</button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PickExercise;
