import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from '../logo/Fitbot2.png';

const Finalize = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const [duration, setDuration] = useState('');
  // console.log(state);
  return (
    <div className='finalizeContainer'>
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
            <h2 className='title mt-5'>Finalize</h2>
            <div className='grid grid-cols-3 items-center m-5'>
              {exercises.map((item) => {
                return <span className='equipmentItem'>{item}</span>;
              })}
            </div>
          </div>
          <div className='equipmentSkipButtonContainer'>
            <button className='equipmentSkipButton'>Finalize</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finalize;
