import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import PickExercise from './Components/PickExercise';

export default function MyRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' Component={LandingPage} />
        <Route path='/login' Component={Login} />
        <Route path='/home' Component={Home} />
        <Route path='/pickExercise' Component={PickExercise} />
      </Routes>
    </div>
  );
}
