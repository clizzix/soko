import { z } from 'zod';
import {
    activityResponseSchema,
    type CreateActivityFormData,
    type ActivityResponse,
} from '../schemas';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const createActivity = async (
    activityData: CreateActivityFormData,
    token: string,
): Promise<ActivityResponse> => {
    const response = await fetch(`${API_BASE}/api/activities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(activityData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || data.error || 'Failed to create activity',
        );
    }

    return activityResponseSchema.parse(data);
};

export const getNearbyActivities = async (
    longitude: number,
    latitude: number,
    distance = 10,
): Promise<ActivityResponse[]> => {
    const response = await fetch(
        `${API_BASE}/api/activities?lng=${longitude}&lat=${latitude}&distance=${distance}`,
    );

    if (!response.ok) {
        throw new Error('Failed to fetch activities');
    }

    const data = await response.json();
    return z.array(activityResponseSchema).parse(data);
};

export const getActivityById = async (
    id: string,
): Promise<ActivityResponse> => {
    const response = await fetch(`${API_BASE}/api/activities/${id}`);

    if (!response.ok) {
        throw new Error('Activity not found');
    }

    const data = await response.json();
    return activityResponseSchema.parse(data);
};
