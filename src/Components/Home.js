import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../slices/userSlice';
import { persistor } from '../app/store';

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      persistor.purge();
      dispatch(removeUser());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedInUser.loggedInUser);

  return (
    <div>
      <h1 className='text-5xl generatedResponse'>
        {user.firstName}'s Dashboard
      </h1>
      <button onClick={handleLogout} className='muscleGroupButton'>
        logout
      </button>
    </div>
  );
}
