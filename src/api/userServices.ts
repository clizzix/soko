import {
    authResponseSchema,
    type LoginFormData,
    type SignupFormData,
    type AuthResponse,
} from '../schemas';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const loginUser = async (
    credentials: LoginFormData,
): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed');
    }

    return authResponseSchema.parse(data);
};

export const signupUser = async (
    credentials: Omit<SignupFormData, 'confirmPassword'>,
): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || 'Signup failed');
    }

    return authResponseSchema.parse(data);
};
