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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const WorkoutBarChart = () => {
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
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        backgroundColor: '#A7FF37',
        borderColor: '#green',
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <div>
      <Bar data={data} options={options}></Bar>
    </div>
  );
};

export default WorkoutBarChart;
