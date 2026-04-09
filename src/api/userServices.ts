import {
    authResponseSchema,
    userResponseSchema,
    type LoginFormData,
    type SignupFormData,
    type UserResponse,
} from '../schemas';
import api from './axios';

export const loginUser = async (
    credentials: LoginFormData,
): Promise<{ accessToken: string; user: UserResponse }> => {
    const { data } = await api.post('/users/login', credentials);
    const { accessToken } = authResponseSchema.parse(data);
    const user = await fetchMe(accessToken);
    return { accessToken, user };
};

export const signupUser = async (
    credentials: Omit<SignupFormData, 'confirmPassword'>,
): Promise<{ accessToken: string; user: UserResponse }> => {
    const { data } = await api.post('/users/register', credentials);
    const { accessToken } = authResponseSchema.parse(data);
    const user = await fetchMe(accessToken);
    return { accessToken, user };
};

const fetchMe = async (accessToken: string): Promise<UserResponse> => {
    const { data } = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return userResponseSchema.parse(data);
};
