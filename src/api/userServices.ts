import {
    authResponseSchema,
    type LoginFormData,
    type SignupFormData,
    type AuthResponse,
} from '../schemas';
import api from './axios';

export const loginUser = async (
    credentials: LoginFormData,
): Promise<AuthResponse> => {
    const { data } = await api.post('/users/login', credentials);
    return authResponseSchema.parse(data);
};

export const signupUser = async (
    credentials: Omit<SignupFormData, 'confirmPassword'>,
): Promise<AuthResponse> => {
    const { data } = await api.post('/users/register', credentials);
    return authResponseSchema.parse(data);
};
