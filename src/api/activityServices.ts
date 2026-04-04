import { z } from 'zod';
import {
    activityResponseSchema,
    type ActivityResponse,
} from '../schemas';
import api from './axios';

export const createActivity = async (
    formData: FormData,
): Promise<ActivityResponse> => {
    const { data } = await api.post('/activities', formData);
    return activityResponseSchema.parse(data);
};

export const getNearbyActivities = async (
    longitude: number,
    latitude: number,
    distance = 10,
): Promise<ActivityResponse[]> => {
    const { data } = await api.get('/activities', {
        params: { lng: longitude, lat: latitude, distance },
    });
    return z.array(activityResponseSchema).parse(data);
};

export const getActivityById = async (
    id: string,
): Promise<ActivityResponse> => {
    const { data } = await api.get(`/activities/${id}`);
    return activityResponseSchema.parse(data);
};

export const getAllActivities = async (): Promise<ActivityResponse[]> => {
    const { data } = await api.get('/activities');
    return z.array(activityResponseSchema).parse(data);
};

export const updateActivity = async (
    id: string,
    formData: FormData,
): Promise<ActivityResponse> => {
    const { data } = await api.patch(`/activities/${id}`, formData);
    return activityResponseSchema.parse(data);
};

export const deleteActivity = async (id: string): Promise<void> => {
    await api.delete(`/activities/${id}`);
};
