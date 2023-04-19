import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useAuth } from '../AuthContext';
import { getDocs, where, query, collection } from 'firebase/firestore';
import { db } from '../firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function Calendar() {
  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = React.useState(false);

    const updateTarget = React.useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    React.useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, [width, updateTarget]);

    return targetReached;
  };

  const isBreakpoint = useMediaQuery(600);
  let style;

  isBreakpoint
    ? (style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 350,
        height: 350,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'black',
        border: '2px solid #A7FF37',
        boxShadow: 24,
        p: 4,
      })
    : (style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 500,
        height: 500,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'black',
        border: '2px solid #A7FF37',
        boxShadow: 24,
        p: 4,
      });

  const [open, setOpen] = React.useState(false);
  const [workouts, setWorkouts] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useAuth();
  const uid = user.currentUser?.uid;

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const [value, setValue] = React.useState(dayjs(todayStr));

  const handleDateChange = async (newValue) => {
    setValue(dayjs(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`));
    const getWorkoutByDay = async () => {
      try {
        const q = query(
          collection(db, 'workouts'),
          where(
            'date',
            '>=',
            new Date(`${newValue.$y},${newValue.$M + 1},${newValue.$D}`)
          ),
          where(
            'date',
            '<',
            new Date(`${newValue.$y},${newValue.$M + 1},${newValue.$D + 1}`)
          ),
          where('userId', '==', uid)
        );
        const querySnapshot = await getDocs(q);
        const workouts = [];
        querySnapshot.forEach((doc) => {
          workouts.push(doc.data().workout);
        });
        return workouts;
      } catch (e) {
        console.log(e);
      }
    };

    const workouts = await getWorkoutByDay();
    handleOpen();
    setWorkouts(workouts.join(','));
  };

  return (
    <div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={['DateCalendar', 'DateCalendar']}
            sx={{ color: '#A7FF37' }}
          >
            <DemoItem>
              <DateCalendar
                value={value}
                onChange={(newValue) => handleDateChange(newValue)}
                sx={{
                  width: '100%',
                  svg: { color: '#A7FF37' },
                  span: { color: '#A7FF37' },
                  button: {
                    color: '#A7FF37',
                  },
                  '& .MuiPickersDay-today': {
                    borderColor: '#A7FF37',
                    color: '#A7FF37',
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#A7FF37',
                    color: 'black',
                  },
                  '& .css-7oawqu-MuiButtonBase-root-MuiPickersDay-root:focus.Mui-selected':
                    {
                      backgroundColor: '#A7FF37',
                      color: 'black',
                    },
                  '& .css-1qs309j-MuiButtonBase-root-MuiPickersDay-root:focus.Mui-selected':
                    {
                      backgroundColor: '#A7FF37',
                      color: 'black',
                    },
                }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} className='overflow-auto suggestedWorkoutDiv'>
          {workouts.length ? (
            <>
              <div className='workoutModalTitle'>Workouts</div>
              <button
                className='w-fit absolute top-4 right-4'
                onClick={handleClose}
              >
                <IoIosCloseCircleOutline color='#A7FF37' size='30' />
              </button>
              <div sx={{ mt: 2 }}>
                {workouts.split(',').map((part) => {
                  return part.split(':').map((item, i) => {
                    if (item.includes('Warm-Up')) {
                      return (
                        <React.Fragment key={i}>
                          <hr className='border-[#2c63fc] mt-5 border-2' />
                          <div className='font-bold text-xl pt-6 font-["Contrail_One"]'>
                            {item}
                          </div>
                        </React.Fragment>
                      );
                    } else if (item.includes('Part')) {
                      return (
                        <div
                          key={i}
                          className='font-bold text-xl pt-6 font-["Contrail_One"]'
                        >
                          {item}
                        </div>
                      );
                    } else {
                      return (
                        <li key={i} className='font-["Contrail_One"]'>
                          {item}
                        </li>
                      );
                    }
                  });
                })}
              </div>
            </>
          ) : (
            <>
              <button
                className='w-fit absolute top-4 right-4'
                onClick={handleClose}
              >
                <IoIosCloseCircleOutline color='#A7FF37' size='30' />
              </button>
              <div className='text-center'>No workouts for this day</div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
