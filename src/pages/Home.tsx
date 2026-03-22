import { useState, useEffect } from 'react';
import { getAllActivities, getFavorites } from '../api';
import { type ActivityResponse } from '../schemas';
import ActivityCard from '../components/ActivityCard';
import MapView from '../components/MapView';

const Home = () => {
    const [activities, setActivities] = useState<ActivityResponse[]>([]);
    const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchData = async () => {
            const [result, favorites] = await Promise.all([
                getAllActivities(),
                getFavorites().catch(() => []),
            ]);
            setActivities(result);
            setFavoritedIds(new Set(favorites.map((f) => f.activityId._id)));
        };
        fetchData();
    }, []);

    const handleFavoriteToggle = (activityId: string, isFavorited: boolean) => {
        setFavoritedIds((prev) => {
            const next = new Set(prev);
            if (isFavorited) {
                next.add(activityId);
            } else {
                next.delete(activityId);
            }
            return next;
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <MapView activities={activities} style="h-68 w-full" />
            <ul className="flex gap-2">
                {activities.map((activity) => (
                    <ActivityCard
                        key={activity._id}
                        activity={activity}
                        isFavorited={favoritedIds.has(activity._id)}
                        onFavoriteToggle={handleFavoriteToggle}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Home;
