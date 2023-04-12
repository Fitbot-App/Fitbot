import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { IoMdAddCircle } from 'react-icons/io';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {
  setEquipment,
  removeEquipment,
  clearEquipment,
} from '../slices/equipmentSlice';
import logo from '../logo/Fitbot2.png';
import { useAuth } from '../AuthContext';
import Account from './Account';
import ModalCreateGym from './ModalCreateGym';
import { FaQuestionCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

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
    'Jump Rope',
    'Kettle Bell',
    'Medicine Ball',
    'Pull Up Bar',
    'Rowing Machine',
    'Ski Erg',
    'Stationary Bike',
    'Treadmill',
    'Weight Plates',
  ]);
  const [error, setError] = useState('');
  const [gyms, setGyms] = useState([]);
  const [savedGym, setSavedGym] = useState(false);
  const [gymUpdate, setGymUpdate] = useState(false);
  const [currentSavedGym, setCurrentSavedGym] = useState({});

  const dispatch = useDispatch();

  // const options = equipmentArray.map((opt) => ({ label: opt, value: opt }));

  function handleChange(e) {
    setEquipmentInput(e.target.value);
  }

  function handleRemove(item) {
    dispatch(removeEquipment(item));
  }

  function handleSetEquipment(item) {
    savedGym && setGymUpdate(true);
    dispatch(setEquipment(item));
  }

  function handleAddEquipment() {
    if (equipmentInput.length < 1) {
      setError('Please create an item');
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
        setError('Please create an item');
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

  const getGyms = async () => {
    const myauth = getAuth();
    const userId = myauth.currentUser.uid;
    const q = query(collection(db, 'gyms'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const gyms = [];
    querySnapshot.forEach((doc) => {
      gyms.push(doc.data());
    });
    return gyms;
  };

  useEffect(() => {
    const fetchData = async () => {
      const results = await getGyms();
      setGyms(results);

      return results;
    };
    dispatch(clearEquipment());
    fetchData();
  }, []);

  let options = gyms.map((gym) => ({ label: gym.name, value: gym.name }));
  options = [{ label: 'Custom', value: 'Custom' }, ...options];

  console.log('OPTIONS', options);

  const handleGymChange = (e) => {
    if (e.target.value === 'Custom') {
      setEquipmentArray([
        'Ankle Weights',
        'Bands',
        'Barbell',
        'Cable Machine',
        'Dumbells',
        'Elliptical',
        'Jump Rope',
        'Kettle Bell',
        'Medicine Ball',
        'Pull Up Bar',
        'Rowing Machine',
        'Ski Erg',
        'Stationary Bike',
        'Treadmill',
        'Weight Plates',
      ]);
      setCurrentSavedGym({});
      dispatch(clearEquipment());
      setSavedGym(false);
      return;
    }

    const gym = gyms.find((gym) => gym.name === e.target.value);
    gym.equipment.forEach((item) => {
      handleSetEquipment(item);
    });
    setCurrentSavedGym(gym);
    setSavedGym(true);
    setEquipmentArray(gym.equipment);
  };

  const user = useAuth();

  console.log('Current saved gym', currentSavedGym.equipment);
  console.log('Equipment array', equipment);
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
          <div>
            <div className='flex items-center justify-center gap-5'>
              <h2 className='title mt-5'>Select your equipment</h2>
              <FaQuestionCircle color='#2c63fc' size={20} />
            </div>
            <div className='flex items-center justify-center mt-5'>
              <input
                className='creatable generatedResponse'
                onChange={handleChange}
                onKeyDown={handleKeypress}
                value={equipmentInput}
                placeholder='Create an item...'
              />
              <button
                className='muscleGroupButton'
                onClick={handleAddEquipment}
              >
                Add
              </button>
              {/* <Select
                className='gymSelect'
                onChange={handleGymChange}
                options={options}
                placeholder={'select one of your gyms...'}
              /> */}
              <select className='gymSelect' onChange={handleGymChange}>
                <option value='Custom'> Custom</option>
                {gyms.map((gym) => {
                  return <option value={gym.name}>{gym.name}</option>;
                })}
              </select>
            </div>
            {error && (
              <p id='error' className='text-center'>
                {error}
              </p>
            )}
            <div className='grid grid-cols-3 items-center m-5'>
              {equipmentArray.map((item, i) => {
                return (
                  <>
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
                  </>
                );
              })}
            </div>
            <div className='flex justify-center items-center pb-5'>
              {user.currentUser && !savedGym ? (
                <ModalCreateGym equipment={equipment} />
              ) : (
                gymUpdate && (
                  <button className='createGymButton'>update gym</button>
                )
              )}
            </div>
          </div>
        </div>
        <Link to='/pickExercise'>
          <MdKeyboardDoubleArrowRight
            className={`rightArrowIntensity ${equipment.length ? 'pulse' : ''}`}
            color='#A7FF37'
            size='70'
          />
        </Link>
      </div>
    </div>
  );
};

export default Equipment;
