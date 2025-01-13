import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { useAuth } from '../AuthContext';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { clearIntensity } from '../slices/intensitySlice';
import { clearExercises } from '../slices/chosenExercisesSlice';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { TbHandFinger, TbHandTwoFingers } from 'react-icons/tb';
import { IoMdArrowBack } from 'react-icons/io';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signin, setSignin] = useState(false);
  const [error, setError] = useState(null);

  const { login, signup } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: add loading indicator

    if (signin) {
      if (firstName === '' || lastName === '') {
        setError('Please fill out all fields');
        return;
      }
      try {
        await signup(email, password);
        dispatch(clearIntensity());
        dispatch(clearExercises());
        navigate('/home');
        setEmail('');
        setPassword('');
      } catch (error) {
        if (password.length < 6) {
          setError('Password Needs to be at least 6 characters');
        } else if (error) {
          setError('Email already in use');
        } else {
          setError('Please Fill In All Fields');
        }
        console.log(error);
        return;
      }

      const myauth = getAuth();
      dispatch(
        setUser({
          firstName: firstName,
          lastName: lastName,
          email: email,
        })
      );

      await setDoc(doc(db, 'users', myauth.currentUser.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
    } else {
      try {
        await login(email, password);
        dispatch(clearIntensity());
        dispatch(clearExercises());
        const myauth = getAuth();
        const userDocSnap = await getDoc(
          doc(db, 'users', myauth.currentUser.uid)
        );
        const userObj = userDocSnap.data();
        dispatch(
          setUser({
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            email: email,
          })
        );
        navigate('/home');
        setEmail('');
        setPassword('');
      } catch (error) {
        setError('Invalid Email or password');
        console.log(error);
      }
    }
  };
  return (
    <div className='loginContainer'>
      <div className='transparentOverlay' />
      <Link to='/' className='goBack'>
        <IoMdArrowBack color='#A7FF37' size='30' />
      </Link>
      {!signin ? (
        <form className='loginForm' onSubmit={handleSubmit}>
          <label className='loginFormLabel flex items-center'>
            <AiOutlineMail className='mx-2' color='#A7FF37' size='25' />
            Email
          </label>
          <input
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='text-center'
          />
          <label className='loginFormLabel'>
            <AiOutlineLock className='mx-2' color='#A7FF37' size='25' />
            Password
          </label>
          <input
            type={'password'}
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='text-center'
          />
          <button type='submit'>Go</button>
          <p className=''>new user?</p>
          <button
            onClick={() => {
              setSignin(true);
              setError(null);
            }}
          >
            Sign Up
          </button>
          {error && <p id='error'>{error}</p>}
        </form>
      ) : (
        <form className='loginForm signinForm' onSubmit={handleSubmit}>
          <div>
            <label className='loginFormLabel'>
              <TbHandFinger className='mx-2' color='#A7FF37' size='30' />
              First Name
            </label>
          </div>
          <input
            name='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className='loginFormLabel'>
            <TbHandTwoFingers className='mx-2' color='#A7FF37' size='30' />
            Last Name
          </label>
          <input
            name='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className='loginFormLabel'>
            <AiOutlineMail className='mx-2' color='#A7FF37' size='30' />
            Email
          </label>
          <input
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className='loginFormLabel'>
            <AiOutlineLock className='mx-2' color='#A7FF37' size='30' />
            Password
          </label>

          <input
            name='password'
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Go</button>
          <p className=''>have an account?</p>
          <button
            onClick={() => {
              setSignin(false);
              setError(null);
            }}
          >
            login
          </button>
          {error && <p id='error'>{error}</p>}
        </form>
      )}
    </div>
  );
}
