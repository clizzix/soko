import { z } from 'zod';

// --- User Schemas ---

export const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z
    .object({
        userName: z.string().min(1, 'Username is required').trim(),
        email: z.email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const userResponseSchema = z.object({
    _id: z.string(),
    userName: z.string(),
    email: z.email(),
    role: z.enum(['user', 'admin']),
    isActive: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const authResponseSchema = z.object({
    token: z.string(),
    user: userResponseSchema,
});

// --- Activity Schemas ---
export const ActivityTagsEnum = z.enum([
    'Sport',
    'Food',
    'Culture',
    'Music',
    'Nature',
    'Gaming',
    'Social',
    'Workshop',
    'Family',
]);

export const activityLocationSchema = z.object({
    type: z.literal('Point'),
    coordinates: z.tuple([
        z.number().min(-180).max(180), // longitude
        z.number().min(-90).max(90), // latitude
    ]),
});

export const createActivitySchema = z.object({
    title: z
        .string()
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title cannot exceed 100 characters')
        .trim(),
    description: z.string().min(1, 'Description is required').trim(),
    date: z.string().pipe(z.coerce.date()),
    price: z.number().default(0),
    location: activityLocationSchema,
    tags: z.array(ActivityTagsEnum).default([]),
});

export const activityResponseSchema = createActivitySchema.extend({
    _id: z.string(),
    image: z.string().optional(),
    userId: z.union([z.string(), z.looseObject({ _id: z.string() })]),
    date: z.string(),
    price: z.number(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

// --- Favorite Schemas ---
export const favoriteResponseSchema = z.object({
    _id: z.string(),
    userId: z.string(),
    activityId: z.object({
        _id: z.string(),
        title: z.string(),
        description: z.string(),
        date: z.string(),
        price: z.number(),
        image: z.string().optional(),
        location: activityLocationSchema,
        tags: z.array(ActivityTagsEnum).default([]),
        userId: z
            .union([z.string(), z.looseObject({ _id: z.string() })])
            .optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
    }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

// --- Inferred types ---

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type CreateActivityFormData = z.infer<typeof createActivitySchema>;
export type ActivityResponse = z.infer<typeof activityResponseSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type FavoriteResponse = z.infer<typeof favoriteResponseSchema>;
