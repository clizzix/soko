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
export type ActivityTag =
    | 'Sport'
    | 'Food'
    | 'Culture'
    | 'Music'
    | 'Nature'
    | 'Gaming'
    | 'Social'
    | 'Workshop'
    | 'Family';

export interface Activity {
    _id: string;
    title: string;
    description: string;
    date: string;
    userId: string | User;
    location: ActivityLocation;
    tags: ActivityTag[];
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
