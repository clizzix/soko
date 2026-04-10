import { useState, useEffect } from 'react';
import { getAllActivities, getFavorites } from '../api';
import { type ActivityResponse } from '../schemas';
import ActivityCard from '../components/ActivityCard';
import MapView from '../components/MapView';
import TagFilter from '../components/TagFilter';
import { useSearchParams } from 'react-router';
import type { ActivityTag } from '../types';

const Home = () => {
    const [activities, setActivities] = useState<ActivityResponse[]>([]);
    const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());
    const [selectedTags, setSelectedTags] = useState<ActivityTag[]>([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

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

    const filteredActivities = activities.filter((activity) => {
        if (
            selectedTags.length > 0 &&
            !selectedTags.some((tag) => activity.tags.includes(tag))
        ) {
            return false;
        }
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            activity.title.toLowerCase().includes(query) ||
            activity.description.toLowerCase().includes(query) ||
            activity.tags.toString().toLowerCase().includes(query) ||
            activity.date.toLowerCase().includes(query)
        );
    });

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
            <MapView activities={activities} style="h-68 w-full mt-16" />
            <div className="flex flex-col gap-2 justify-center items-center">
                <TagFilter
                    selectedTags={selectedTags}
                    onChange={setSelectedTags}
                />
                <ul className="flex gap-2 flex-wrap grow justify-center">
                    {filteredActivities.map((activity) => (
                        <ActivityCard
                            key={activity._id}
                            activity={activity}
                            isFavorited={favoritedIds.has(activity._id)}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
