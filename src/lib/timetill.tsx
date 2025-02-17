import { intervalToDuration } from 'date-fns';

export function getTimeDifference(dateString: Date): string | null {
  const lastMessage = new Date(dateString);
  const now = new Date();

  const msIn24Hours = 24 * 60 * 60 * 1000;
  const elapsedMs = now.getTime() - lastMessage.getTime();
  const remainingMs = Math.max(msIn24Hours - elapsedMs, 0);

  if (remainingMs === 0) return null; // If time is up, return null

  const remainingDuration = intervalToDuration({ start: now, end: new Date(now.getTime() + remainingMs) });

  const hours = remainingDuration.hours || 0;
  const minutes = remainingDuration.minutes || 0;

  return `${hours}h ${minutes}m`;
}

// Example usage:

