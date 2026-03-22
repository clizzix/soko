import { z } from 'zod';
import { favoriteResponseSchema, type FavoriteResponse } from '../schemas';
import api from './axios';

export const getFavorites = async (): Promise<FavoriteResponse[]> => {
    const { data } = await api.get('/favorites');
    return z.array(favoriteResponseSchema).parse(data);
};

export const addFavorite = async (activityId: string): Promise<void> => {
    await api.post(`/favorites/${activityId}`);
};

export const removeFavorite = async (activityId: string): Promise<void> => {
    await api.delete(`/favorites/${activityId}`);
};
