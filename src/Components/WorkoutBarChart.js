import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { useState, useEffect } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

const WorkoutBarChart = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentYear = new Date().getFullYear();
      let promises = [];
      for (let i = 0; i < 12; i++) {
        promises.push(getWorkout(currentYear, i));
      }
      const results = await Promise.all(promises);
      setValues(results);
    };
    fetchData();
  }, []);

  const getWorkout = async (year, month) => {
    var thisYear = year;
    if (month < 10) {
      var thisMonth = `0${month}`;
      if (month === 9) {
        var nextMonth = '10';
      } else {
        nextMonth = `0${month + 1}`;
      }
    } else {
      if (month === 11) {
        thisYear = year + 1;
        nextMonth = '00';
      } else {
        nextMonth = `${month + 1}`;
      }
      thisMonth = `${month}`;
    }

    const myauth = getAuth();
    const q = query(
      collection(db, 'workouts'),
      where('date', '>=', new Date(thisYear, thisMonth)),
      where('date', '<', new Date(thisYear, nextMonth)),
      where('userId', '==', myauth.currentUser.uid)
    );

    try {
      const querySnapshot = await getDocs(q);
      const workouts = querySnapshot.docs.length;
      return workouts;
    } catch (e) {
      console.log(e);
    }
  };

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const data = {
    labels: months,
    datasets: [
      {
        data: values,
        backgroundColor: '#A7FF37',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { color: '#A7FF37' },
        min: 0,
        max: 40,
        stepSize: 5,
      },
      x: {
        ticks: { color: '#A7FF37' },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Workouts Completed by Month',
      },
    },
  };
  return (
    <div className='flex w-11/12 h-full'>
      <Bar data={data} options={options}></Bar>
    </div>
  );
};

export default WorkoutBarChart;
