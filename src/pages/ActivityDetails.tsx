import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityById } from '../api/activityServices';
import type { ActivityResponse } from '../schemas';
import MapView from '../components/MapView';

const ActivityDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<ActivityResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

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
    if (notFound || !activity) return <div className="p-4">Activity not found.</div>;

    return (
        <div className="p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{activity.title}</h1>
            <p className="text-gray-600">{activity.description}</p>
            <p className="text-sm text-gray-400">
                {new Date(activity.date).toLocaleDateString()}
            </p>
            <MapView activities={[activity]} style="h-80 w-full rounded" />
        </div>
    );
};

export default ActivityDetails;
