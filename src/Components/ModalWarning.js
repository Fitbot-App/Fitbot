import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 250,
  bgcolor: 'black',
  border: '2px solid #A7FF37',
  boxShadow: 24,
  p: 4,
  borderRadius: '3rem',
  color: '#A7FF37',
  fontFamily: 'Contrail-One',
};

export default function ModalWarning({ pick }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div>
      <MdKeyboardDoubleArrowRight
        color='black'
        size='70'
        onClick={handleOpen}
        className={'rightArrowIntensity'}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {pick ? (
            <Typography
              id='modal-modal-description'
              sx={{
                mt: 2,
                fontFamily: 'Contrail One',
                textAlign: 'center',
                m: 2,
                lineHeight: 1.5,
                letterSpacing: 0.5,
              }}
              className='equipmentModalWarning'
            >
              Are you sure you want to continue without adding any exercises to
              your workout? Results may vary without specifying in this step!
            </Typography>
          ) : (
            <Typography
              id='modal-modal-description'
              sx={{
                mt: 2,
                fontFamily: 'Contrail One',
                textAlign: 'center',
                m: 2,
                lineHeight: 1.5,
                letterSpacing: 0.5,
              }}
              className='equipmentModalWarning'
            >
              Are you sure you want to continue without adding any equipment?
              Results may vary without specifying in this step!
            </Typography>
          )}
          <div className='flex justify-around'>
            <button className='equipmentModalBackButton' onClick={handleClose}>
              Back
            </button>
            <button
              className='equipmentModalContinueButton'
              onClick={() => {
                if (pick) {
                  navigate('/finalize');
                } else {
                  navigate('/pickExercise');
                }
              }}
            >
              Continue
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
