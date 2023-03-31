import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { useState } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const WorkoutBarChart = () => {
  const getWorkout = async (year, month) => {
    var thisYear = year;
    if (month < 10) {
      var thisMonth = `0${month}`;
      if (month === 9) {
        var nextMonth = '10';
      } else {
        var nextMonth = `0${month + 1}`;
      }
    } else {
      if (month === 11) {
        thisYear = year + 1;
        var nextMonth = '00';
      } else {
        var nextMonth = `${month + 1}`;
      }
      var thisMonth = `${month}`;
    }
    console.log(thisMonth, nextMonth);
    console.log(thisYear);

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
      values.push(workouts);
      return workouts;
    } catch (e) {
      console.log(e);
    }
  };

  const currentYear = new Date().getFullYear();
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
  const values = [];
  months.forEach((month, i) => {
    getWorkout(currentYear, i);
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'workoutCount',
        data: values,
        backgroundColor: '#A7FF37',
        borderColor: '#green',
        borderWidth: 1,
      },
    ],
  };

  const options = { responsive: true, maintainAspectRatio: false };
  console.log(values);
  return (
    <div className='w-11/12 h-full'>
      <Bar data={data} options={options} style={{}}></Bar>
    </div>
  );
};

export default WorkoutBarChart;
