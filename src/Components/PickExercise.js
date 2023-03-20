import React from "react";
import { useState } from "react";
import GenerateWorkout from "./GenerateWorkout";

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
          <GenerateWorkout />
        </li>
        {count > 0 ? (
          <div>
            <li>
              <GenerateWorkout />
              <button onClick={decrement}>x</button>
            </li>
          </div>
        ) : null}
        {count > 1 ? (
          <li>
            <GenerateWorkout />
            <button onClick={decrement}>x</button>
          </li>
        ) : null}
        {count > 2 ? (
          <li>
            <GenerateWorkout />
            <button onClick={decrement}>x</button>
          </li>
        ) : null}
      </ul>
      <button onClick={increment}>Add a muscle group</button>
    </div>
  );
};

export default PickExercise;
