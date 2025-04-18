import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setExercises } from '../slices/chosenExercisesSlice';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { IoMdAddCircle } from 'react-icons/io';
import Creatable from 'react-select/creatable';
import host from '../utils/host';
import CustomTooltip from './Tooltip';

function GenerateWorkout() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [muscleGroup, setMuscleGroup] = useState('');
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNone, setSelectedNone] = useState(false);
  const [error, setError] = useState(null);

  const equipment = useSelector((state) => state.equipment.equipment);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (muscleGroup.length === 0) {
      setSelectedNone(true);
      return;
    }
    setSelectedNone(false);
    setLoading(true);
    setError(null); // Reset error state

    try {
      const res = await axios.post(`${host}/api/openaiReq`, {
        prompt: `Do not include numbers or periods in the response to the following question. What are six exercises to target my ${muscleGroup}? 
        I have access to the following equipment: ${equipment.join(', ')}.
        The format of the response should be a list of just the exercise names with a colon 
        after each exercise expcept for the last. Here's an example "Crunches:".`,
      });
      if (!res.data || !res.data.result) {
        throw new Error('Invalid response format from server');
      }
      setResponse(res.data.result.split(':'));
    } catch (error) {
      console.error('Error generating workout:', error);
      let errorMessage = 'An unexpected error occurred';

      if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      setResponse([]); // Clear any previous response
    } finally {
      setLoading(false);
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

  function handleChange(opt) {
    setSelectedOption(opt);
    setMuscleGroup(opt.value);
  }

  const muscleGroupArray = [
    'Abs',
    'Biceps',
    'Calves',
    'Cardio',
    'Chest',
    'Forearms',
    'Glutes',
    'Hamstrings',
    'Lower Back',
    'Neck',
    'Quads',
    'Shoulders',
    'Triceps',
    'Traps',
    'Upper Back',
  ];
  const options = muscleGroupArray.map((opt) => ({ label: opt, value: opt }));

  return (
    <div>
      <form className='muscleGroupForm' onSubmit={handleSubmit}>
        <span className='pickExerciseTitle flex items-center pickExerciseTitle generatedResponse'>
          Choose Muscle Groups{' '}
          <CustomTooltip
            text={
              "Select a muscle group from the dropdown and hit 'generate' to get a list of workouts that target your desired muscle group."
            }
          />
        </span>
        <div className='flex items-center'>
          <Creatable
            className='creatableMuscleGroup'
            options={options}
            onChange={handleChange}
            value={selectedOption}
            placeholder={'Muscle groups...'}
          />
          <button className='muscleGroupButton' type='submit'>
            {response.length === 0 ? 'Generate' : 'Regenerate'}
          </button>
        </div>
        <div>
          <h1 className='generatedExercisesWarning'>
            {selectedNone ? 'Please Select a Muscle Group' : null}
          </h1>
        </div>
      </form>

      {error && (
        <div className='text-red-500 mt-2 p-2 border border-red-300 rounded'>
          {error}
        </div>
      )}

      {loading ? (
        <Box>
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
          <Skeleton
            style={{ backgroundColor: '#a8ff3765', margin: 15, height: 40 }}
          />
        </Box>
      ) : (
        <div className='generatedResponse generatedExercises'>
          {response.map((item, index) => {
            return item ? (
              <div key={index} className='singleGeneratedExercise'>
                <span className='singleExercise'>
                  {item.replace(/\.$/, '')}
                  <button onClick={() => addExercise(item)}>
                    <IoMdAddCircle
                      color={'#A7FF37'}
                      size={20}
                      className='hover:scale-125 duration-150'
                    />
                  </button>
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
