import { useState, useEffect } from 'react';
import { getFavorites } from '../api';
import { type ActivityResponse } from '../schemas';
import ActivityCard from '../components/ActivityCard';
import TagFilter from '../components/TagFilter';
import type { ActivityTag } from '../types';

const Favorites = () => {
    const [activities, setActivities] = useState<ActivityResponse[]>([]);
    const [selectedTags, setSelectedTags] = useState<ActivityTag[]>([]);
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

    const filteredActivities = activities.filter((activity) => {
        if (selectedTags.length === 0) return true;
        return selectedTags.some((tag) => activity.tags.includes(tag));
    });

    return (
        <div className="flex flex-col gap-2 p-4">
            <h1 className="text-2xl font-bold mt-18">My Favorites</h1>
            <div className="flex flex-col gap-2">
                <TagFilter
                    selectedTags={selectedTags}
                    onChange={setSelectedTags}
                />
                <ul className="flex flex-wrap gap-2">
                    {filteredActivities.map((activity) => (
                        <ActivityCard
                            key={activity._id}
                            activity={activity}
                            isFavorited={true}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Favorites;
