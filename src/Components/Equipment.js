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
import Creatable from 'react-select/creatable';
import { useAuth } from '../AuthContext';
import Account from './Account';

const Equipment = () => {
  const equipment = useSelector((state) => state.equipment.equipment);
  const [equipmentInput, setEquipmentInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const equipmentArray = [
    'kettle bell',
    'medicine ball',
    'barbell',
    'weight plates',
    'dumbells',
    'jump rope',
    'elliptical',
    'pull up bar',
    'rowing machine',
    'stationary bike',
    'ski erg',
    'ankle wights',
    'treadmill',
    'cable machine',
    'bands',
  ];
  const options = equipmentArray.map((opt) => ({ label: opt, value: opt }));

  function handleChange(opt) {
    setSelectedOption(opt);
    setEquipmentInput(opt.value);
  }

  function handleRemove(item) {
    dispatch(removeEquipment(item));
  }

  function handleSetEquipment() {
    if (equipmentInput === '') {
      setError('Please enter an item of equipment');
      return;
    }
    if (equipment.includes(equipmentInput)) {
      setError('Item already selected');
      return;
    }
    setError('');
    dispatch(setEquipment(equipmentInput));
    setSelectedOption(null);
    setEquipmentInput('');
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      handleSetEquipment();
    }
  };

  const user = useAuth();

  return (
    <div className='equipmentContainer'>
      <div className='equipmentTransparentOverlay' />
      <h1 className='intesityTitle'>Step 2/3</h1>
      <Link className='cornerLogo' to='/'>
        <img width={70} src={logo} alt='FitBot' />
      </Link>
      {user.currentUser && (
        <div className='flex absolute top-6 left-6 z-20'>
          <Account />
        </div>
      )}
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
              <Creatable
                className='creatable generatedResponse'
                options={options}
                onChange={handleChange}
                onKeyDown={handleKeypress}
                value={selectedOption}
                placeholder='Select an item...'
              />
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
              {equipment.map((item, i) => {
                return (
                  <span className='equipmentItem' key={i}>
                    {item}
                    <button onClick={() => handleRemove(item)}>
                      <FaMinusCircle
                        color={'#2c63fc'}
                        size={17}
                        className='hover:scale-125 duration-150'
                      />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
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
