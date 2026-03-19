import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { createActivity } from '../api/activityServices';
import { createActivitySchema, ActivityTagsEnum, type CreateActivityFormData } from '../schemas';
import LocationSearch from '../components/LocationSearch';

const CreateActivity = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CreateActivityFormData>({
        resolver: zodResolver(createActivitySchema),
    });

    const onSubmit = async (data: CreateActivityFormData) => {
        await createActivity(data);
        navigate('/');
    };

    return (
        <div className="p-4 max-w-lg mx-auto flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Create Activity</h1>
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

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                >
                    {isSubmitting ? 'Creating...' : 'Create Activity'}
                </button>
            </form>
        </div>
    );
};

export default CreateActivity;
