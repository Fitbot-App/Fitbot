import { addDoc, collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { generateFromPrompt } from '../api/openai';
import { db } from '../firebase';
import {
  formatWorkoutDate,
  parseWorkoutResponse,
} from '../utils/workoutFormatting';

function formatEquipmentList(equipment) {
  return equipment?.length ? equipment.join(', ') : 'bodyweight only';
}

function parseExerciseOptions(rawOptions) {
  if (!rawOptions) {
    return [];
  }

  return rawOptions
    .replace(/^\./, '')
    .split(':')
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function generateExerciseOptions({ muscleGroup, equipment }) {
  const prompt = `You are a fitness programming assistant.

Task:
Generate exactly 6 distinct exercise names for the muscle group "${muscleGroup}".
Available equipment: ${formatEquipmentList(equipment)}.

Output format rules:
- Return exercise names only.
- Separate each exercise with a colon.
- Do not use bullets, numbering, headings, explanations, quotes, or extra sentences.
- Do not include sets, reps, time, tips, parentheses, or difficulty labels.
- Do not include intro text like "Here are six exercises".
- Do not include a trailing colon after the final exercise.
- Keep each item concise and human-readable.

Quality rules:
- Prefer exercises that clearly target ${muscleGroup}.
- Match the available equipment when possible.
- Keep all 6 exercises meaningfully different from one another.
- Avoid duplicates or near-duplicates.
- Avoid exercises for unrelated primary muscle groups.

Few-shot examples:
Input muscle group: Chest
Input equipment: Dumbbells, Bands
Output:
Dumbbell Bench Press:Incline Dumbbell Press:Chest Fly:Push-Up:Band Chest Press:Dumbbell Pullover

Input muscle group: Abs
Input equipment: bodyweight only
Output:
Crunches:Reverse Crunches:Plank:Dead Bug:Mountain Climbers:Bicycle Crunches

Now generate the output for:
Muscle group: ${muscleGroup}
Equipment: ${formatEquipmentList(equipment)}
Output:`;

  const result = await generateFromPrompt(prompt);
  return parseExerciseOptions(result);
}

export async function generateFinalWorkout({
  exercises,
  experience,
  intensity,
  duration,
}) {
  const resolvedDuration = duration || '60';
  const prompt = `You are a fitness programming assistant.

Create a ${resolvedDuration}-minute ${intensity} workout for a user with ${experience} experience.

Required exercises:
${exercises.join(', ')}

Hard requirements:
- Use each required exercise exactly once.
- Include a Warm-Up section first.
- Warm-Up should contain light cardio plus easy calisthenics that prepare the user for these exercises: ${exercises.join(
    ', '
  )}.
- Do not include a Cool-Down section.
- After Warm-Up, organize the workout into multiple parts.
- Each part must contain 1 to 4 exercises.
- Include sensible sets and reps for the user's experience and requested intensity.
- Keep the workout realistic for the requested duration.

Negative instructions:
- Do not repeat any required exercise.
- Do not add commentary before or after the workout.
- Do not use bullets or numbered lists.
- Do not use markdown.
- Do not omit section labels.
- Do not use semicolons for anything except separating exercises.

Output format rules:
- Follow this exact structure style:
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
- Put a semicolon after every exercise.
- Return only the workout text.

Few-shot example:
Input:
Duration: 30
Intensity: moderate
Experience: beginner
Required exercises: Goblet Squat, Push-Up, Bent-Over Row

Output:
Warm-Up: brisk walk (1 x 3 min); arm circles (1 x 20 reps); bodyweight good mornings (1 x 15 reps);
Part-1: Goblet Squat (3 x 10 reps); Push-Up (3 x 8 reps);
Part-2: Bent-Over Row (3 x 10 reps); march in place (2 x 45 sec);

Now produce the workout.`;

  const result = await generateFromPrompt(prompt);
  return parseWorkoutResponse(result);
}

export async function generateSuggestedWorkout(previousWorkout) {
  const prompt = `You are a fitness programming assistant.

Create a new suggested workout based on the user's previous workout.

Previous workout:
${previousWorkout.join(';')}

Goal:
- Suggest a workout that shifts emphasis to different muscle groups than the previous workout.
- If the previous workout focused more on upper body, bias the new one toward lower body or full-body with lower-body emphasis.
- If the previous workout focused more on lower body, bias the new one toward upper body or full-body with upper-body emphasis.
- Keep the response structure compatible with the previous workout style.

Negative instructions:
- Do not copy the prior workout.
- Do not add explanations or commentary.
- Do not use bullets or numbering.
- Do not change the delimiter style.

Output format rules:
- Match this same style exactly: ${previousWorkout.join(';')}
- Keep section labels like Warm-Up and Part-1 when appropriate.
- Put a semicolon after every exercise.
- Return only the workout text.

Few-shot example:
Previous workout style:
Warm-Up: jump rope (1 x 3 min); arm circles (1 x 20 reps); push-ups (2 x 10 reps);Part-1: dumbbell shoulder press (3 x 10 reps); bent-over row (3 x 10 reps);Part-2: biceps curls (3 x 12 reps); triceps dips (3 x 12 reps);

Good output style:
Warm-Up: brisk walk (1 x 3 min); bodyweight squats (1 x 15 reps); leg swings (1 x 20 reps);Part-1: goblet squats (3 x 10 reps); romanian deadlifts (3 x 10 reps);Part-2: walking lunges (3 x 12 reps); calf raises (3 x 15 reps);

Now generate the new suggested workout.`;

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
