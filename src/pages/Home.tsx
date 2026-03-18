import { useState, useEffect } from 'react';
import { getAllActivities } from '../api';
import { type ActivityResponse } from '../schemas';
import ActivityCard from '../components/ActivityCard';
import MapView from '../components/MapView';

const Home = () => {
    const [activities, setActivities] = useState<ActivityResponse[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const result = await getAllActivities();
            setActivities(result);
        };
        fetchActivities();
    }, []);

    return (
        <div>
            <MapView activities={activities} style="h-64 w-full" />
            <ul>
                {activities.map((activity) => (
                    <ActivityCard key={activity._id} activity={activity} />
                ))}
            </ul>
        </div>
    );
};

export default Home;
