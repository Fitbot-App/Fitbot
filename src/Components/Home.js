import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import logo from '../logo/Fitbot2.png';
import WorkoutBarChart from './WorkoutBarChart';

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
    <div className='h-screen'>
      <h1 className='text-5xl h-1/6 flex justify-center items-center generatedResponse'>
        {user.firstName}'s Dashboard
      </h1>
      <Link className='cornerLogo' to='/'>
        <img width={70} src={logo} alt='FitBot' />
      </Link>
      <div className='calChartContainer'>
        <div className='calContainerDiv'></div>
        <div className='chartContainerDiv'>
          <WorkoutBarChart />
        </div>
      </div>
      <div className='h-1/2'>
        <SuggestedWorkout />
      </div>
      <button onClick={handleLogout} className='muscleGroupButton'>
        logout
      </button>
    </div>
  );
}
