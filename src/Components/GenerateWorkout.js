import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExercises } from '../slices/chosenExercisesSlice';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { IoMdAddCircle } from 'react-icons/io';
import Creatable from 'react-select/creatable';
import CustomTooltip from './Tooltip';
import { generateExerciseOptions } from '../services/workouts';

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
    setError(null);

    try {
      const generatedExercises = await generateExerciseOptions({
        muscleGroup,
        equipment,
      });
      setResponse(generatedExercises);
    } catch (error) {
      console.error('Error generating workout:', error);
      setError(error.response?.data?.error || error.message || 'An unexpected error occurred');
      setResponse([]);
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
