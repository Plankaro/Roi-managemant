import { intervalToDuration, formatDuration } from 'date-fns';

export function timeUntil24Hours(dateString: string): string {
  // Parse the input date string into a Date object
  const lastMessage = new Date(dateString);
  const now = new Date();

  // Define 24 hours in milliseconds
  const msIn24Hours = 24 * 60 * 60 * 1000;

  // Calculate elapsed time in milliseconds
  const elapsedMs = now.getTime() - lastMessage.getTime();

  // Determine remaining time until a full 24 hours has passed
  const remainingMs = Math.max(msIn24Hours - elapsedMs, 0);

  // Calculate the end time (24 hours after the last message)
  const endTime = new Date(now.getTime() + remainingMs);

  // Use date-fns to get the duration from now until the end time
  const remainingDuration = intervalToDuration({ start: now, end: endTime });

  // Format the remaining duration to a human-readable string (hours and minutes)
  const formattedRemaining = formatDuration(remainingDuration, { format: ['hours', 'minutes'] });

  return formattedRemaining;
}

// Example usage:
const dateString = '2025-02-04T10:00:00Z'; // Replace with your date string
const result = timeUntil24Hours(dateString);
console.log(`Time remaining until 24 hours: ${result}`);
