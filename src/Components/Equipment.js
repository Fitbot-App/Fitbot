import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import { FaUndo } from 'react-icons/fa';
import {
  collection,
  query,
  where,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { IoMdAddCircle } from 'react-icons/io';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { BeatLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import {
  setEquipment,
  removeEquipment,
  clearEquipment,
  setAllEquipment,
} from '../slices/equipmentSlice';
import logo from '../logo/Fitbot2.png';
import { useAuth } from '../AuthContext';
import Account from './Account';
import ModalCreateGym from './ModalCreateGym';
import ModalWarning from './ModalWarning';
import CustomTooltip from './Tooltip';

const Equipment = () => {
  const equipment = useSelector((state) => state.equipment.equipment);
  const [equipmentInput, setEquipmentInput] = useState('');
  const [equipmentArray, setEquipmentArray] = useState([
    'Ankle Weights',
    'Bands',
    'Barbell',
    'Cable Machine',
    'Dumbells',
    'Elliptical',
    'Kettle Bell',
    'Medicine Ball',
    'Weight Plates',
  ]);
  const [error, setError] = useState('');
  const [gyms, setGyms] = useState([]);
  const [savedGym, setSavedGym] = useState(false);
  const [gymUpdate, setGymUpdate] = useState(false);
  const [selectedGym, setSelectedGym] = useState({});
  const [updatePending, setUpdatePending] = useState(false);

  const dispatch = useDispatch();

  function handleChange(e) {
    setEquipmentInput(e.target.value);
  }

  function handleRemove(item) {
    dispatch(removeEquipment(item));
  }

  function handleSetEquipment(item) {
    dispatch(setEquipment(item));
  }

  function handleAddEquipment() {
    if (equipmentInput.length < 1) {
      setError('Please enter equipment');
      return;
    }
    if (equipmentArray.includes(equipmentInput)) {
      setError('Equipment already exists');
      return;
    }
    setError('');
    const temp = [...equipmentArray, equipmentInput];
    setEquipmentArray(temp);
    setEquipmentInput('');
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      if (equipmentInput.length < 1) {
        setError('Please enter equipment');
        return;
      }
      if (equipmentArray.includes(equipmentInput)) {
        setError('Equipment already exists');
        return;
      }
      setError('');
      const temp = [...equipmentArray, equipmentInput];
      setEquipmentArray(temp);
      setEquipmentInput('');
    }
  };

  const handleUpdateGym = async () => {
    setUpdatePending(true);
    const gymRef = doc(db, 'gyms', selectedGym.gymId);
    setDoc(gymRef, { equipment: equipment }, { merge: true });
    const docSnap = await getDoc(gymRef);
    const gym = docSnap.data();
    setTimeout(() => {
      setUpdatePending(false);
      dispatch(setAllEquipment(gym.equipment));
      setEquipmentArray(gym.equipment);
    }, 1000);
  };

  useEffect(() => {
    dispatch(clearEquipment());
    const myauth = getAuth();
    if (myauth.currentUser) {
      const userId = myauth.currentUser?.uid;
      const q = query(collection(db, 'gyms'), where('userId', '==', userId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const gyms = [];
        querySnapshot.forEach((doc) => {
          const gymId = doc.ref.id;
          gyms.push({ ...doc.data(), gymId });
        });
        setGyms(gyms);
      });

      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    setEquipmentArray([
      'Ankle Weights',
      'Bands',
      'Barbell',
      'Cable Machine',
      'Dumbells',
      'Elliptical',
      'Kettle Bell',
      'Medicine Ball',
      'Pull Up Bar',
      'Stationary Bike',
      'Weight Plates',
    ]);

    dispatch(clearEquipment());
    setSavedGym(false);
    return;
  };

  const handleGymChange = (e) => {
    if (e === 'Custom') {
      handleGoBack();
      return;
    }
    if (e.target.value === 'Custom') {
      handleGoBack();
      return;
    }

    const gym = gyms.find((gym) => gym.name === e.target.value);
    setSelectedGym(gym);

    dispatch(setAllEquipment(gym.equipment));
    setSavedGym(true);
    setEquipmentArray(gym.equipment);
  };

  const user = useAuth();

  return (
    <div className='equipmentContainer'>
      <div className='equipmentTransparentOverlay' />
      <h1 className='intesityTitle'>Step 2/3</h1>
      <Link className='cornerLogo' to='/'>
        <img width={70} src={logo} alt='FitBot' />
      </Link>
      {user.currentUser && (
        <div className='flex absolute top-6 left-6 z-20'>
          <Account />
        </div>
      )}
      <div className='equipmentDivsContainer'>
        <Link to='/intensity'>
          <MdKeyboardDoubleArrowLeft
            className='leftArrowIntensity'
            color='#A7FF37'
            size='70'
          />
        </Link>
        <div className='equipmentDiv'>
          {savedGym && (
            <span
              className='ml-6 mt-6 absolute'
              onClick={() => {
                handleGymChange('Custom');
              }}
            >
              <FaUndo
                className='hover:rotate-[-45deg] hover:scale-110 duration-150'
                color='#2c63fc'
                size='25'
              />
            </span>
          )}

          <div>
            <div className='flex justify-center items-center mt-5'>
              <span className='title flex items-center'>
                Select your equipment
                <CustomTooltip
                  text={
                    'Choose some equipment that you have available to use. You may also add any additional equipment that is not already present in the list of options. Do this by typing into the "add new equipment" input area and pressing the "Add" button. If you are a logged in user, you also have the option to add all of your selected equipment to a savable gym.'
                  }
                />
              </span>
            </div>
            <div className='flex items-center justify-center mt-5'>
              {user.currentUser && (
                <select className='gymSelect' onChange={handleGymChange}>
                  {!savedGym && (
                    <option value='none' selected disabled hidden>
                      Use one of your gyms...
                    </option>
                  )}
                  <option value='Custom'> Custom</option>
                  {gyms.map((gym, i) => {
                    return (
                      <option key={i} value={gym.name}>
                        {gym.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <div className='grid grid-cols-3 items-center m-5'>
              {equipmentArray.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    {equipment.includes(item) ? (
                      <span className='equipmentItemSelected' key={i}>
                        {item}
                        <button onClick={() => handleRemove(item)}>
                          <BsFillCheckCircleFill
                            color={'#A7FF37'}
                            size={17}
                            className='hover:scale-125 duration-150'
                          />
                        </button>
                      </span>
                    ) : (
                      <span className='equipmentItem' key={i}>
                        {item}
                        <button onClick={() => handleSetEquipment(item)}>
                          <IoMdAddCircle
                            color={'#2c63fc'}
                            size={17}
                            className='hover:scale-125 duration-150'
                          />
                        </button>
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
              <div className='flex m-2'>
                <span>
                  <input
                    className='creatable generatedResponse'
                    onChange={handleChange}
                    onKeyDown={handleKeypress}
                    value={equipmentInput}
                    placeholder='Add new equipment...'
                  />
                  {error && (
                    <p id='error' className='text-center'>
                      {error}
                    </p>
                  )}
                </span>
                <span className='flex justify-center items-center ml-2'>
                  <IoMdAddCircle
                    color={'#A7FF37'}
                    size={30}
                    className='hover:scale-125 duration-150'
                    onClick={handleAddEquipment}
                  />
                </span>
              </div>
            </div>
            {user.currentUser && (
              <div className='flex justify-center items-center pb-5'>
                {user.currentUser && !savedGym ? (
                  <ModalCreateGym equipment={equipment} />
                ) : (
                  [...selectedGym.equipment].sort().join('') !==
                    [...equipment].sort().join('') &&
                  (updatePending ? (
                    <BeatLoader className='beatLoader' color='#A7FF37' />
                  ) : (
                    <button
                      className='createGymButton'
                      onClick={handleUpdateGym}
                    >
                      Update gym
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        {equipment.length ? (
          <Link to='/pickExercise'>
            <MdKeyboardDoubleArrowRight
              className={`rightArrowIntensity ${
                equipment.length ? 'pulse' : ''
              }`}
              color='#A7FF37'
              size='70'
            />
          </Link>
        ) : (
          <ModalWarning />
        )}
      </div>
    </div>
  );
};

export default Equipment;
