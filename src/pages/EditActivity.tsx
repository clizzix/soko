import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router';
import { getActivityById, updateActivity } from '../api/activityServices';
import { z } from 'zod';
import { createActivitySchema, ActivityTagsEnum, type CreateActivityFormData } from '../schemas';
import LocationSearch from '../components/LocationSearch';

type RawActivityFormData = z.input<typeof createActivitySchema>;

const EditActivity = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RawActivityFormData, unknown, CreateActivityFormData>({
        resolver: zodResolver(createActivitySchema),
    });

    useEffect(() => {
        if (!id) return;
        getActivityById(id)
            .then((activity) => {
                reset({
                    title: activity.title,
                    description: activity.description,
                    date: new Date(activity.date).toISOString().split('T')[0],
                    location: activity.location,
                    tags: activity.tags,
                });
                if (activity.image) setImagePreview(activity.image);
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [id, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setImageFile(file);
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const onSubmit = async (data: CreateActivityFormData) => {
        if (!id) return;
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('date', data.date.toISOString());
        formData.append('location', JSON.stringify(data.location));
        formData.append('tags', JSON.stringify(data.tags));
        if (imageFile) formData.append('image', imageFile);
        await updateActivity(id, formData);
        navigate(`/activity/${id}`);
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (notFound) return <div className="p-4">Activity not found.</div>;

    return (
        <div className="p-4 max-w-lg mx-auto flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Edit Activity</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        {...register('title')}
                        className="input input-bordered w-full"
                        placeholder="Activity title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        {...register('description')}
                        className="textarea textarea-bordered w-full"
                        placeholder="Describe the activity"
                        rows={3}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                        type="date"
                        {...register('date')}
                        className="input input-bordered w-full"
                    />
                    {errors.date && (
                        <p className="text-red-500 text-sm">{errors.date.message as string}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <LocationSearch
                        onChange={(location) => setValue('location', location)}
                        error={errors.location?.message as string | undefined}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {ActivityTagsEnum.options.map((tag) => (
                            <label key={tag} className="label cursor-pointer gap-2">
                                <input
                                    type="checkbox"
                                    value={tag}
                                    {...register('tags')}
                                    className="checkbox checkbox-sm checkbox-primary"
                                />
                                <span className="label-text">{tag}</span>
                            </label>
                        ))}
                    </div>
                    {errors.tags && (
                        <p className="text-red-500 text-sm">{errors.tags.message as string}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input file-input-bordered w-full"
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-2 w-full h-40 object-cover rounded"
                        />
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => navigate(`/activity/${id}`)}
                        className="btn btn-outline flex-1"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary flex-1"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditActivity;
