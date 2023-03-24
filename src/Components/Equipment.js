import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import { FaMinusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { setEquipment, removeEquipment } from '../slices/equipmentSlice';
import logo from '../logo/Fitbot2.png';

const Equipment = () => {
  const equipment = useSelector((state) => state.equipment.equipment);
  const [equipmentInput, setEquipmentInput] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  function handleChange(e) {
    setEquipmentInput(e.target.value);
  }

  function handleRemove(item) {
    dispatch(removeEquipment(item));
  }

  function handleSetEquipment() {
    if (equipmentInput === '') {
      setError('Please enter an item of equipment');
      return;
    }
    setError('');
    dispatch(setEquipment(equipmentInput));
    setEquipmentInput('');
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      handleSetEquipment();
    }
  };

  return (
    <div className='equipmentContainer'>
      <div className='equipmentTransparentOverlay' />
      <h1 className='intesityTitle'>Step 2/3</h1>
      <Link className='cornerLogo' to='/'>
        <img width={70} src={logo} alt='FitBot' />
      </Link>
      <div className='equipmentDivsContainer'>
        <Link to='/intensity'>
          <MdKeyboardDoubleArrowLeft
            className='leftArrowIntensity'
            color='#A7FF37'
            size='70'
          />
        </Link>
        <div className='equipmentDiv'>
          <div>
            <h2 className='title mt-5'>Enter your equipment</h2>
            <div className='flex items-center justify-center mt-5'>
              <input
                className='equipmentSelector generatedResponse'
                onChange={handleChange}
                onKeyDown={handleKeypress}
                value={equipmentInput}
                placeholder='type an item of equipment . . .'
              ></input>
              <button
                className='muscleGroupButton'
                onClick={handleSetEquipment}
              >
                Add
              </button>
            </div>
            {error && (
              <p id='error' className='text-center'>
                {error}
              </p>
            )}
            <div className='grid grid-cols-3 items-center m-5'>
              {equipment.map((item) => {
                return (
                  <span className='equipmentItem'>
                    {item}
                    <button onClick={() => handleRemove(item)}>
                      <FaMinusCircle
                        color={'#FF3767'}
                        size={17}
                        className='hover:scale-125 duration-150'
                      />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
          {/* <div className='equipmentSkipButtonContainer'>
            <button
              className='equipmentSkipButton'
              onClick={() => {
                navigate('/pickExercise');
              }}
            >
              Skip
            </button>
          </div> */}
        </div>
        <Link to='/pickExercise'>
          <MdKeyboardDoubleArrowRight
            className='rightArrowIntensity'
            color='#A7FF37'
            size='70'
          />
        </Link>
      </div>
    </div>
  );
};

export default Equipment;
