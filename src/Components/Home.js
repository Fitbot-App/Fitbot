import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SuggestedWorkout from './SuggestedWorkout';
import logo from '../logo/Fitbot2.png';
import WorkoutBarChart from './WorkoutBarChart';
import Calendar from './Calendar';
import Account from './Account';

export default function Home() {
  const user = useSelector((state) => state.loggedInUser.loggedInUser);

  return (
    <div className='dashboardContainer'>
      <h1 className='text-5xl p-4 flex justify-center items-center generatedResponse'>
        {user.firstName}'s Dashboard
      </h1>
      <Link className='cornerLogo' to='/'>
        <img width={70} src={logo} alt='FitBot' />
      </Link>
      <div className='calChartContainer'>
        <div className='calContainerDiv bg-black'>
          <Calendar />
        </div>
        <div className='chartContainerDiv'>
          <WorkoutBarChart />
        </div>
      </div>
      <div className='h-2/3'>
        <SuggestedWorkout />
      </div>
      <div className='flex absolute top-6 left-6'>
        <Account buildWorkout={true} />
      </div>
    </div>
  );
}
