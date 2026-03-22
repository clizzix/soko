import { useState, useEffect } from 'react';
import { getFavorites } from '../api';
import { type ActivityResponse } from '../schemas';
import ActivityCard from '../components/ActivityCard';

const Favorites = () => {
    const [activities, setActivities] = useState<ActivityResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favorites = await getFavorites();
                setActivities(
                    favorites.map((f) => f.activityId as ActivityResponse),
                );
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const handleFavoriteToggle = (activityId: string, isFavorited: boolean) => {
        if (!isFavorited) {
            setActivities((prev) => prev.filter((a) => a._id !== activityId));
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    if (activities.length === 0)
        return <div className="p-4">No favorites yet.</div>;

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">My Favorites</h1>
            <ul className="flex flex-wrap gap-2">
                {activities.map((activity) => (
                    <ActivityCard
                        key={activity._id}
                        activity={activity}
                        isFavorited={true}
                        onFavoriteToggle={handleFavoriteToggle}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Favorites;
