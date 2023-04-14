import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'black',
  border: '2px solid #A7FF37',
  boxShadow: 24,
  p: 4,
};

export default function ModalCreateGym({ equipment }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [savedLoading, setSavedLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const equipmentArr = useSelector((state) => state.equipment.equipment);

  const handleOpen = () => {
    if (equipment.length < 1) {
      setError('Choose equipment first');
      return;
    } else {
      setError('');
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const user = useAuth();
  const uid = user.currentUser.uid;

  const handleSaveGym = async () => {
    if (name.length < 1) {
      setError('please add a name');
      return;
    }
    setError('');
    setSavedLoading(true);
    setTimeout(() => {
      setSavedLoading(false);
      setSaved(true);
    }, 1500);
    await addDoc(collection(db, 'gyms'), {
      userId: uid,
      equipment,
      name,
    });
  };

  return (
    <div className='flex items-center'>
      <button onClick={handleOpen} className='createGymButton'>
        Create a gym?
      </button>
      <p id='gymError'>{equipmentArr.length > 0 ? null : error}</p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={style}
          className='overflow-auto items-center suggestedWorkoutDiv'
        >
          <button
            className='w-fit absolute top-4 right-4'
            onClick={handleClose}
          >
            <IoIosCloseCircleOutline color='#A7FF37' size='30' />
          </button>
          <input
            className='creatable w-1/2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Gym name. . .'
          />
          <p id='error'>{error}</p>
          <div className='grid grid-cols-2 m-5'>
            {equipment.map((item, i) => {
              return (
                <p key={i} className='equipmentItem m-3'>
                  {item}
                </p>
              );
            })}
          </div>
          {savedLoading ? (
            <BeatLoader className='beatLoader' color='#2c63fc' />
          ) : saved ? (
            <h1 className='savedMessage'>Gym Saved!</h1>
          ) : (
            <div>
              <button
                className='equipmentSkipButton'
                onClick={() => handleSaveGym(equipment)}
              >
                Save Gym
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
