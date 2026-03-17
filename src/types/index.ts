export type UserRole = 'user' | 'admin';

export interface User {
    _id: string;
    userName: string;
    email: string;
    role: UserRole;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ActivityLocation {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
}

export interface Activity {
    _id: string;
    title: string;
    description: string;
    date: string;
    userId: string | User;
    location: ActivityLocation;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
