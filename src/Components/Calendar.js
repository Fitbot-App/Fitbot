import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar() {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const [value, setValue] = React.useState(dayjs(todayStr));

  const handleDateChange = (newValue) => {
    setValue(dayjs(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`));
    console.log(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`);
  };

  return (
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
  );
}
