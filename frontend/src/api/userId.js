// src/api/userId.js
// Utility for managing guest user ID consistently across the app

const USER_ID_KEY = 'studyhub_user_id';

/**
 * Gets the current user ID from localStorage or creates a default guest ID
 * @returns {string} User ID
 */
export const getUserId = () => {
  let userId = localStorage.getItem(USER_ID_KEY);
  
  if (!userId) {
    // Create a guest user ID with timestamp
    userId = `guest-${Date.now()}`;
    localStorage.setItem(USER_ID_KEY, userId);
    console.log('✅ Created guest user ID:', userId);
  }
  
  return userId;
};

/**
 * Sets a custom user ID (for future auth integration)
 * @param {string} userId - The user ID to set
 */
export const setUserId = (userId) => {
  localStorage.setItem(USER_ID_KEY, userId);
};

/**
 * Removes the user ID from localStorage
 */
export const clearUserId = () => {
  localStorage.removeItem(USER_ID_KEY);
};

/**
 * Checks if a user ID exists
 * @returns {boolean} True if user ID exists
 */
export const hasUserId = () => {
  return !!localStorage.getItem(USER_ID_KEY);
};