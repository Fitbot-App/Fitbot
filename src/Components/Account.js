import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { CgProfile } from 'react-icons/cg';
import { clearExercises } from '../slices/chosenExercisesSlice';
import { clearEquipment } from '../slices/equipmentSlice';
import { clearIntensity } from '../slices/intensitySlice';
import { removeUser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { persistor } from '../app/store';

export default function Account({ buildWorkout }) {
  const { logout } = useAuth();
  const dispatch = useDispatch();

  const navigate = useNavigate();
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
  return (
    <Menu>
      <Menu.Button className='flex ml-4 w-full justify-center items-center h-10 rounded-md bg-[#A7FF37] px-4 py-4 text-sm font-medium text-black hover:bg-[#A7FF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
        <CgProfile className='m-2' /> Options
        <ChevronDownIcon
          className='ml-2 mr-1 h-5 w-5 text-black hover:scale-110'
          aria-hidden='true'
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute top-1 mt-10 w-40 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1 mt-3 flex-col justify-between items-center'>
            {buildWorkout ? (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/intensity'
                    className={`${
                      active ? 'bg-[#A7FF37]' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ProfileActiveIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                    ) : (
                      <ProfileInactiveIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                    )}
                    New Workout
                  </Link>
                )}
              </Menu.Item>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/home'
                    className={`${
                      active ? 'bg-[#A7FF37]' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ProfileActiveIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                    ) : (
                      <ProfileInactiveIcon
                        className='mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                    )}
                    Dashboard
                  </Link>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-[#A7FF37]' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <LogoutActiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <LogoutInactiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function LogoutInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 4H12V12H4V4Z'
        fill='#EDE9FE'
        stroke='#000000'
        strokeWidth='2'
      />
      <path
        d='M8 8H16V16H8V8Z'
        fill='#EDE9FE'
        stroke='#000000'
        strokeWidth='2'
      />
    </svg>
  );
}

function LogoutActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='#EDE9FE'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M4 4H12V12H4V4Z' fill='' stroke='#000000' strokeWidth='2' />
      <path
        d='M8 8H16V16H8V8Z'
        fill='#EDE9FE'
        stroke='#000000'
        strokeWidth='2'
      />
    </svg>
  );
}

function ProfileInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='8'
        width='10'
        height='8'
        fill='#EDE9FE'
        stroke='#000000'
        strokeWidth='2'
      />
      <rect
        x='4'
        y='4'
        width='12'
        height='4'
        fill='#EDE9FE'
        stroke='#000000'
        strokeWidth='2'
      />
      <path d='M8 12H12' stroke='#A78BFA' strokeWidth='2' />
    </svg>
  );
}

function ProfileActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='5'
        y='8'
        width='10'
        height='8'
        fill='#EDE9FE'
        stroke='#000000'
        strokeWidth='2'
      />
      <rect
        x='4'
        y='4'
        width='12'
        height='4'
        fill='#EDE9FE'
        stroke='#000000'
        strokeWidth='2'
      />
      <path d='M8 12H12' stroke='#A78BFA' strokeWidth='2' />
    </svg>
  );
}
