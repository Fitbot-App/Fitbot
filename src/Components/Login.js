import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { TbHandFinger, TbHandTwoFingers } from 'react-icons/tb';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signin, setSignin] = useState(false);

  const { login, signup } = useAuth();
  const myauth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: add loading indicator

    if (signin) {
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
        console.log(error);
      }
    } else {
      try {
        await login(email, password);
        navigate('/home');
        setEmail('');
        setPassword('');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className='loginContainer'>
      {!signin ? (
        <form className='loginForm' onSubmit={handleSubmit}>
          <div>
            <AiOutlineMail color='#A7FF37' size='30' />
            <label className='loginFormLabel'>Email</label>
          </div>
          <input
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <AiOutlineLock color='#A7FF37' size='30' />
            <label className='loginFormLabel'> Password</label>
          </div>
          <input
            type={'password'}
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Go</button>
          <button onClick={() => setSignin(true)}>Sign Up</button>
        </form>
      ) : (
        <form className='loginForm signinForm' onSubmit={handleSubmit}>
          <div>
            <TbHandFinger color='#A7FF37' size='30' />
            <label className='loginFormLabel'>First Name</label>
          </div>
          <input
            name='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div>
            <TbHandTwoFingers color='#A7FF37' size='30' />
            <label className='loginFormLabel'>Last Name</label>
          </div>
          <input
            name='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div>
            <AiOutlineMail color='#A7FF37' size='30' />
            <label className='loginFormLabel'>Email</label>
          </div>
          <input
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <AiOutlineLock color='#A7FF37' size='30' />
            <label className='loginFormLabel'> Password</label>
          </div>
          <input
            name='password'
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Go</button>
          <button onClick={() => setSignin(false)}>login</button>
        </form>
      )}
    </div>
  );
}
