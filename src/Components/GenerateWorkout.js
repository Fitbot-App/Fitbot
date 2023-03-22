import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setExercises } from '../slices/chosenExercisesSlice';

function GenerateWorkout() {
  const [selectedOption, setSelectedOption] = useState('none');
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOption === 'none') {
      window.alert('Please select a muscle group');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/generateWorkout', {
        prompt: `can you give me six exercises for my ${selectedOption}. The format of the response
        should be a numbered vertical list of just the exercise names with a colon after each exercise expcept for the last. Here's an example "1. crunches :" `,
      });
      setResponse(res.data.split(':'));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  function addExercise(item) {
    dispatch(setExercises(item));
    setResponse(
      response.filter((addedItem) => {
        return item !== addedItem;
      })
    );
  }

  return (
    <div>
      <form className='muscleGroupForm' onSubmit={handleSubmit}>
        <select
          className='muscleGroupSelector'
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value='none'>Select an option</option>
          <option value='back'>Back</option>
          <option value='core'>Core</option>
          <option value='chest'>Chest</option>
          <option value='legs'>Legs</option>
          <option value='arms'>Arms</option>
          <option value='cardio'>Cardio</option>
        </select>
        <button
          className='muscleGroupButton'
          type='submit'
          disabled={!selectedOption}
        >
          Generate Movements
        </button>
      </form>
      {loading ? (
        <p className='generatedResponse'>Loading...</p>
      ) : (
        <div className='generatedResponse generatedExercises'>
          {response.map((item, index) => {
            return item ? (
              <div key={index} className='singleGeneratedExercise'>
                <span className='singleExercise'>
                  {item} <button onClick={() => addExercise(item)}>+</button>
                </span>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}

export default GenerateWorkout;
