// src/api/userService.ts

import { UserDTO, Role } from '../types/userTypes';

// Re-using the mock user database from authService for consistency
// In a real app, this would be a separate data source or a call to the backend
const MOCK_USERS_DB: UserDTO[] = [
    { id: 123, email: 'user@example.com', name: 'Test User', role: Role.USER },
    { id: 456, email: 'admin@example.com', name: 'Admin User', role: Role.ADMIN },
];

/**
 * @function delay
 * @description Helper function to simulate network latency.
 * @param {number} ms - The delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * @namespace userService
 * @description Provides mock API functions for fetching user data.
 * These functions simulate HTTP GET requests for user details.
 */
export const userService = {
    /**
     * @method getCurrentUser
     * @description Simulates fetching the details of the currently authenticated user.
     * For mock purposes, it assumes a user is "logged in" based on a mock ID.
     * @param {string} mockUserId - A mock user ID (e.g., 'user-123').
     * @returns {Promise<UserDTO | null>} A promise that resolves with the UserDTO or null if not found.
     */
    getCurrentUser: async (mockUserId: string): Promise<UserDTO | null> => {
        console.log(`Mock User Service: Fetching current user with mock ID: ${mockUserId}...`);
        await delay(300); // Simulate network delay
        const numericUserId = parseInt(mockUserId.replace('user-', ''), 10);
        const user = MOCK_USERS_DB.find(u => u.id === numericUserId);
        return user ? { ...user } : null; // Return a copy
    },

    /**
     * @method getUserById
     * @description Simulates fetching a user by their ID.
     * @param {number} id - The ID of the user to fetch.
     * @returns {Promise<UserDTO | null>} A promise that resolves with the UserDTO or null if not found.
     */
    getUserById: async (id: number): Promise<UserDTO | null> => {
        console.log(`Mock User Service: Fetching user with ID: ${id}...`);
        await delay(300); // Simulate network delay
        const user = MOCK_USERS_DB.find(u => u.id === id);
        return user ? { ...user } : null; // Return a copy
    },
};
