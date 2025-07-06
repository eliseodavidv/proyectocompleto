// src/api/authService.ts

import { LoginReq, RegisterReq, JwtAuthResponse } from '../types/authTypes';
import { UserDTO, Role } from '../types/userTypes'; // Import UserDTO and Role

/**
 * @constant MOCK_USERS_DB
 * @description A simple in-memory store for mock user data, simulating a database.
 * Passwords are plain text for mock purposes; never do this in production.
 * Each user now has an ID and a role.
 */
const MOCK_USERS_DB: UserDTO[] = [
  { id: 123, email: 'user@example.com', name: 'Test User', role: Role.USER },
  { id: 456, email: 'admin@example.com', name: 'Admin User', role: Role.ADMIN },
];

// Simple mapping for passwords (in a real app, these would be hashed)
const MOCK_PASSWORDS: { [email: string]: string } = {
  'user@example.com': 'password123',
  'admin@example.com': 'adminpassword',
};

/**
 * @function delay
 * @description Helper function to simulate network latency for API calls.
 * @param {number} ms - The delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * @namespace authService
 * @description Provides mock API functions for user authentication (login and registration).
 * These functions simulate HTTP POST requests to authentication endpoints.
 */
export const authService = {
  /**
   * @method login
   * @description Simulates a user login request.
   * Checks provided credentials against mock users.
   * @param {LoginReq} credentials - The user's email and password.
   * @returns {Promise<JwtAuthResponse>} A promise that resolves with a JWT token and user details on success.
   * @throws {Error} If login fails (e.g., invalid credentials).
   */
  login: async (credentials: LoginReq): Promise<JwtAuthResponse> => {
    console.log('Mock Auth API: Attempting login for:', credentials.email);
    await delay(700); // Simulate network delay

    const user = MOCK_USERS_DB.find(u => u.email === credentials.email);
    const passwordMatches = user && MOCK_PASSWORDS[user.email] === credentials.password;

    if (user && passwordMatches) {
      const mockToken = `mock-jwt-token-for-${user.email}-${Date.now()}`;
      console.log('Mock Auth API: Login successful, token:', mockToken);
      return { token: mockToken, user: { ...user } }; // Return user DTO
    } else {
      console.warn('Mock Auth API: Login failed for:', credentials.email);
      throw new Error('Invalid credentials');
    }
  },

  /**
   * @method register
   * @description Simulates a new user registration request.
   * Adds the new user to the mock user list if email is not already taken.
   * @param {RegisterReq} userData - The new user's name, email, and password.
   * @returns {Promise<JwtAuthResponse>} A promise that resolves with a JWT token and user details on successful registration.
   * @throws {Error} If registration fails (e.g., email already exists, invalid data).
   */
  register: async (userData: RegisterReq): Promise<JwtAuthResponse> => {
    console.log('Mock Auth API: Attempting registration for:', userData.email);
    await delay(900); // Simulate network delay

    // Basic validation
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('All fields are required for registration.');
    }
    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      throw new Error('Invalid email format.');
    }

    const emailExists = MOCK_USERS_DB.some(u => u.email === userData.email);
    if (emailExists) {
      console.warn('Mock Auth API: Registration failed - email already exists:', userData.email);
      throw new Error('Email already registered');
    }

    // Generate a new ID for the mock user
    const newId = MOCK_USERS_DB.length > 0 ? Math.max(...MOCK_USERS_DB.map(u => u.id)) + 1 : 1;
    const newUser: UserDTO = {
      id: newId,
      email: userData.email,
      name: userData.name,
      role: Role.USER, // Default role for new registrations
    };

    // Add new user to mock list
    MOCK_USERS_DB.push(newUser);
    MOCK_PASSWORDS[newUser.email] = userData.password; // Store password

    const mockToken = `mock-jwt-token-for-${newUser.email}-${Date.now()}`;
    console.log('Mock Auth API: Registration successful, token:', mockToken);
    return { token: mockToken, user: { ...newUser } };
  },

  /**
   * @method logout
   * @description Simulates a user logout. In a real app, this might invalidate a session on the backend.
   * For mock, it simply resolves.
   * @returns {Promise<void>} A promise that resolves when logout is "complete".
   */
  logout: async (): Promise<void> => {
    console.log('Mock Auth API: Simulating logout...');
    await delay(200); // Simulate a quick logout process
    // In a real app, you'd clear any stored tokens/session data here.
    console.log('Mock Auth API: Logout simulated.');
  },
};
