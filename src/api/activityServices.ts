import { z } from 'zod';
import {
    activityResponseSchema,
    type CreateActivityFormData,
    type ActivityResponse,
} from '../schemas';
import api from './axios';

export const createActivity = async (
    activityData: CreateActivityFormData,
): Promise<ActivityResponse> => {
    const { data } = await api.post('/activities', activityData);
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
