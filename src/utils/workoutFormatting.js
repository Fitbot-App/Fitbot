export function parseWorkoutResponse(rawWorkout) {
  if (!rawWorkout) {
    return [];
  }

  if (Array.isArray(rawWorkout)) {
    return rawWorkout.filter(Boolean);
  }

  return rawWorkout
    .replace(/^\./, '')
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatWorkoutDate(date) {
  if (!date) {
    return '';
  }

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function isWorkoutHeading(item) {
  return (
    item.includes('Warm-Up') ||
    item.includes('Part') ||
    item.includes('Cool-Down')
  );
}

export function cleanWorkoutLine(item) {
  return item.replace(/\.$/, '').trim();
}
