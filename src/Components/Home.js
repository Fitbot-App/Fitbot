import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../slices/userSlice';
import { persistor } from '../app/store';
import { clearExercises } from '../slices/chosenExercisesSlice';
import { clearEquipment } from '../slices/equipmentSlice';
import { clearIntensity } from '../slices/intensitySlice';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import SuggestedWorkout from './SuggestedWorkout';

export default function Home() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      persistor.purge();
      dispatch(removeUser());
      dispatch(clearExercises());
      dispatch(clearEquipment());
      dispatch(clearIntensity());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const user = useSelector((state) => state.loggedInUser.loggedInUser);

  return (
    <div>
      <h1 className='text-5xl generatedResponse'>
        {user.firstName}'s Dashboard
      </h1>
      <SuggestedWorkout />
      <button onClick={handleLogout} className='muscleGroupButton'>
        logout
      </button>
    </div>
  );
}
