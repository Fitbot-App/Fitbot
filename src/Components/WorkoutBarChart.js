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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const WorkoutBarChart = () => {
  const [jan, setJan] = useState(0);
  const [feb, setFeb] = useState(3);
  const [mar, setMar] = useState(10);
  const [apr, setApr] = useState(20);
  const [may, setMay] = useState(12);
  const [jun, setJun] = useState(23);
  const [jul, setJul] = useState(18);
  const [aug, setAug] = useState(9);
  const [sep, setSep] = useState(6);
  const [oct, setOct] = useState(17);
  const [nov, setNov] = useState(8);
  const [dec, setDec] = useState(0);

  const getWorkout = async () => {
    const myauth = getAuth();
    const March = query(
      collection(db, 'workouts'),
      where('date', '>=', new Date('2023-03-01')),
      where('date', '<=', new Date('2023-03-31')),
      where('userId', '==', myauth.currentUser.uid)
    );
    try {
      const querySnapshot = await getDocs(March);
      const workouts = querySnapshot.docs.length;
      setMar(workouts);
      return workouts;
    } catch (e) {
      console.log(e);
    }
  };

  const data = {
    labels: [
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
    ],

    datasets: [
      {
        label: 'workoutCount',
        data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
        backgroundColor: '#A7FF37',
        borderColor: '#green',
        borderWidth: 1,
      },
    ],
  };

  const options = { responsive: true, maintainAspectRatio: false };

  return (
    <div className='w-11/12 h-full'>
      <Bar data={data} options={options} style={{}}></Bar>
    </div>
  );
};

export default WorkoutBarChart;
