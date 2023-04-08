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

function GenerateWorkout() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [muscleGroup, setMuscleGroup] = useState('');
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNone, setSelectedNone] = useState(false);

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

    try {
      const res = await axios.post(
        `${host}/pickExercise`,
        {
          prompt: `Do not include numbers or periods in the response to the following question. What are six exercises to target my ${muscleGroup}? 
        I have access to the following equipment: ${equipment.join(', ')}.
        The format of the response should be a list of just the exercise names with a colon 
        after each exercise expcept for the last. Here's an example "Crunches:".`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
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

  function handleChange(opt) {
    setSelectedOption(opt);
    setMuscleGroup(opt.value);
  }

  const muscleGroupArray = [
    'back',
    'abs',
    'chest',
    'quads',
    'hamstrings',
    'calves',
    'biceps',
    'triceps',
    'traps',
    'forearms',
    'lower back',
    'upper back',
    'neck',
    'shoulders',
    'glutes',
    'cardio',
  ];
  const options = muscleGroupArray.map((opt) => ({ label: opt, value: opt }));

  return (
    <div>
      <form className='muscleGroupForm' onSubmit={handleSubmit}>
        <h1 className='pickExerciseTitle generatedResponse'>
          Choose Muscle Groups
        </h1>
        <div className='flex items-center'>
          <Creatable
            className='creatable generatedResponse'
            options={options}
            onChange={handleChange}
            value={selectedOption}
            placeholder={'Select an item...'}
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
                  {item}
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
