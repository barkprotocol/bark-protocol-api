// Define rate limit parameters
const RATE_LIMIT = 100; // Maximum requests per time window
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

// In-memory store to track requests (use Redis or another store for production)
const userRequestCounts: Record<string, { count: number, lastRequestTime: number }> = {};

// Function to check if a user has exceeded the rate limit
export function checkRateLimit(userId: string): boolean {
  const currentTime = Date.now();

  // Check if the user has made requests before
  const userData = userRequestCounts[userId];

  if (!userData) {
    // First request for the user, initialize their data
    userRequestCounts[userId] = { count: 1, lastRequestTime: currentTime };
    return true; // The first request is always allowed
  }

  // Calculate the time difference between now and the last request
  const timeElapsed = currentTime - userData.lastRequestTime;

  if (timeElapsed <= TIME_WINDOW) {
    // If the user is within the time window, check if they exceed the limit
    if (userData.count >= RATE_LIMIT) {
      return false; // User has exceeded the rate limit
    } else {
      // Increment request count and allow the request
      userData.count++;
      return true;
    }
  } else {
    // Time window has expired, reset the count and allow the request
    userRequestCounts[userId] = { count: 1, lastRequestTime: currentTime };
    return true; // Allow the first request in the new time window
  }
}
