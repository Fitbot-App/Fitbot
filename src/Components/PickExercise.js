import React from 'react';
import { useState } from 'react';
import GenerateWorkout from './GenerateWorkout';
import { GiBiceps } from 'react-icons/gi';

const PickExercise = () => {
  const [count, setCount] = useState(0);

  function increment() {
    if (count < 3) setCount((count) => (count += 1));
    console.log(count);
  }

  function decrement() {
    if (count > 0) setCount((count) => (count -= 1));
    console.log(count);
  }

  return (
    <div>
      <ul>
        <li>
          <GenerateWorkout remove={false} />
        </li>
        {count > 0 ? (
          <li>
            <GenerateWorkout count={count} decrement={decrement} />
          </li>
        ) : null}
        {count > 1 ? (
          <li>
            <GenerateWorkout count={count} decrement={decrement} />
          </li>
        ) : null}
        {count > 2 ? (
          <li>
            <GenerateWorkout count={count} decrement={decrement} />
          </li>
        ) : null}
      </ul>
      <button className='addMuscleGroupButton' onClick={increment}>
        Add a muscle group <GiBiceps color='#37a5ff' />
      </button>
    </div>
  );
};

export default PickExercise;
