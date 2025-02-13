import { differenceInMilliseconds, formatDistanceToNow } from "date-fns";

export function getLastOnlineStatus(lastOnline: Date): string {
    if(!lastOnline) return '';
  const lastOnlineDate = new Date(lastOnline);
  const now = new Date();
  

  // Check if the difference is within 1 minute (60,000 milliseconds)
  const diffMs = differenceInMilliseconds(now, lastOnlineDate);
  if (diffMs <= 60000) {
    return "Online";
  }
  
  // Otherwise, return a relative time string like "Last online 5 minutes ago"
  return `Last online ${formatDistanceToNow(lastOnlineDate, { addSuffix: true })}`;
}

// Example usage:
