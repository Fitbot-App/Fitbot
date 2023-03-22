import React from 'react';
import GenerateWorkout from './GenerateWorkout';
import { useSelector, useDispatch } from 'react-redux';
import { removeExercise } from '../slices/chosenExercisesSlice';

const PickExercise = () => {
  const exercises = useSelector((state) => state.exercises);

  const dispatch = useDispatch();

  function handleRemove(exercise) {
    dispatch(removeExercise(exercise));
  }

  return (
    <div className='pickExerciseContainer'>
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
    </div>
  );
};

export default PickExercise;
