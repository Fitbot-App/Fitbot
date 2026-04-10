import { addDoc, collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { generateFromPrompt } from '../api/openai';
import { db } from '../firebase';
import {
  formatWorkoutDate,
  parseWorkoutResponse,
} from '../utils/workoutFormatting';

export async function generateExerciseOptions({ muscleGroup, equipment }) {
  const prompt = `Do not include numbers or periods in the response to the following question. What are six exercises to target my ${muscleGroup}? 
        I have access to the following equipment: ${equipment.join(', ')}.
        The format of the response should be a list of just the exercise names with a colon 
        after each exercise expcept for the last. Here's an example "Crunches:".`;

  const result = await generateFromPrompt(prompt);
  return parseWorkoutResponse(result);
}

export async function generateFinalWorkout({
  exercises,
  experience,
  intensity,
  duration,
}) {
  const prompt = `My experience level with fitness is ${experience}. I am looking for a ${intensity} workout. Make a ${
    duration || '60'
  } minute workout that includes each of the following exercises only once: ${exercises.join(
    ', '
  )}. 
        The workout should always include a warmup that consists of easy calisthenics that will warm up the muscles used in these exercises: ${exercises.join(
          ', '
        )} and easy cardio. Do not include a cool down.
        The rest of the workout should be seperated into multiple parts with 1 to 4 excersises per part.
        Here's an example of how the response should be formated - 
        Warm-Up: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps); 
        Part-1: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps); 
        ${
          duration >= 20
            ? 'Part-2: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps);'
            : ''
        } 
        ${
          duration >= 40
            ? 'Part-3: exercise (sets x reps); exercise (sets x reps); exercise (sets x reps);'
            : ''
        }
        make sure there is a semicolon after every exercise.`;

  const result = await generateFromPrompt(prompt);
  return parseWorkoutResponse(result);
}

export async function generateSuggestedWorkout(previousWorkout) {
  const prompt = `The response to the following question should be formated the same as the following: ${previousWorkout.join(
    ';'
  )}.Generate a new workout that exercises different muscle groups from the workout I did yesterday.
        For example, upper body exercises in yesterdays workout would require lower body exercises in the new workout, 
        and lower body exercises in yesterdays workout would require upper body exercises in the new workout. 
        Yesterdays workout was the following: ${previousWorkout.join(';')}.`;

  const result = await generateFromPrompt(prompt);
  return parseWorkoutResponse(result);
}

export async function saveWorkout({ userId, workout, date }) {
  await addDoc(collection(db, 'workouts'), {
    userId,
    workout,
    date,
  });
}

export async function getLatestWorkout(userId) {
  const workoutsQuery = query(
    collection(db, 'workouts'),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(1)
  );

  const snapshot = await getDocs(workoutsQuery);
  const latestDoc = snapshot.docs[0];

  if (!latestDoc) {
    return null;
  }

  const latestWorkout = latestDoc.data().workout;
  const date = latestDoc.data().date?.toDate?.();

  return {
    workout: parseWorkoutResponse(latestWorkout),
    recentDate: formatWorkoutDate(date),
  };
}
