import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getActivityById, deleteActivity } from '../api/activityServices';
import type { ActivityResponse } from '../schemas';
import MapView from '../components/MapView';
import { useAuth } from '../context/AuthContext';

const ActivityDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activity, setActivity] = useState<ActivityResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!id || !window.confirm('Delete this activity?')) return;
        setDeleting(true);
        try {
            await deleteActivity(id);
            navigate('/');
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        const fetch = async () => {
            try {
                const result = await getActivityById(id);
                setActivity(result);
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (notFound || !activity)
        return <div className="p-4">Activity not found.</div>;

    const ownerId =
        typeof activity.userId === 'object'
            ? activity.userId._id
            : activity.userId;

    const isOwner = !!user && ownerId === user._id;
    const isAdmin = user?.role === 'admin';

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{activity.title}</h1>
                {(isOwner || isAdmin) && (
                    <div className="flex gap-2">
                        {isOwner && (
                            <button
                                onClick={() => navigate(`/activity/${id}/edit`)}
                                className="btn btn-sm btn-outline"
                            >
                                Edit
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="btn btn-sm btn-error"
                        >
                            {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                )}
            </div>
            {activity.image && (
                <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full max-h-80 object-cover rounded"
                />
            )}
            <p className="text-gray-600">{activity.description}</p>
            <p className="text-sm text-gray-400">
                {new Date(activity.date).toLocaleDateString()}
            </p>
            <p className="text-red-500">{activity.price}€</p>
            <ul className="flex gap-4">
                {activity.tags.map((tag, index) => (
                    <li
                        className="badge badge-outline badge-success"
                        key={index}
                    >
                        {tag}
                    </li>
                ))}
            </ul>
            <MapView activities={[activity]} style="h-80 w-full rounded" />
        </div>
    );
};

export default ActivityDetails;
