import { useState, useEffect } from 'react';
import { getAllActivities } from '../api';
import { type ActivityResponse } from '../schemas';
import ActivityCard from '../components/ActivityCard';

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
            <ul>
                {activities.map((activity) => (
                    <ActivityCard key={activity._id} activity={activity} />
                ))}
            </ul>
        </div>
    );
};

export default Home;
