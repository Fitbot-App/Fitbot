import React from 'react';
import { useState } from 'react';
import GenerateWorkout from './GenerateWorkout';
import { GiBiceps } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';

const PickExercise = () => {
  const [listItems, setListItems] = useState([]);
  const [count, setCount] = useState(0);

  function addItem() {
    if (count < 3) {
      setCount((count) => (count += 1));
      setListItems([
        ...listItems,
        <ListItem key={listItems.length} index={listItems.length} />,
      ]);
    }
  }

  function ListItem() {
    const [removed, setRemoved] = useState(false);
    return removed ? null : (
      <li>
        <GenerateWorkout />
        <button
          className='xButton'
          onClick={() => {
            setCount((count) => (count -= 1));
            setRemoved((removed) => !removed);
          }}
        >
          Remove <MdDelete color='#FF3767' />
        </button>
      </li>
    );
  }

  return (
    <div>
      <ul>
        <GenerateWorkout />
        {listItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </ul>
      <button className='addMuscleGroupButton' onClick={addItem}>
        Add a muscle group <GiBiceps color='#37a5ff' />
      </button>
    </div>
  );
};

export default PickExercise;
