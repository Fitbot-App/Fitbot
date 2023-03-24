import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { TbHandFinger, TbHandTwoFingers } from 'react-icons/tb';
import logo from '../logo/Fitbot2.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signin, setSignin] = useState(false);
  const [error, setError] = useState(null);

  const { login, signup } = useAuth();
  const myauth = getAuth();
  const navigate = useNavigate();

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
        const newUser = myauth.currentUser;
        await setDoc(doc(db, 'users', newUser.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
        });
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
      }
    } else {
      try {
        await login(email, password);
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
      <Link to='/'>
        <img width={70} src={logo} alt='FitBot' className='cornerLogo' />
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
