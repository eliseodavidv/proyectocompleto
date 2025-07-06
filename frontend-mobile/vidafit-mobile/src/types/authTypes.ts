// src/types/authTypes.ts

import { UserDTO } from './userTypes'; // Import UserDTO

/**
 * @interface JwtAuthResponse
 * @description Defines the structure of the response received after successful login or registration.
 * @property {string} token - The JWT (JSON Web Token) returned by the backend.
 * @property {UserDTO} user - The user details associated with the token.
 */
export interface JwtAuthResponse {
    token: string;
    user: UserDTO; // Added user details
}

/**
 * @interface LoginReq
 * @description Defines the structure of the request body for user login.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 */
export interface LoginReq {
    email: string;
    password: string;
}

/**
 * @interface RegisterReq
 * @description Defines the structure of the request body for new user registration.
 * @property {string} name - The user's full name.
 * @property {string} email - The user's email address (must be a valid email format).
 * @property {string} password - The user's password (minimum 6 characters).
 */
export interface RegisterReq {
    name: string;
    email: string;
    password: string;
}
