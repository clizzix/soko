import { useState, useEffect } from 'react';
import { getAllActivities } from '../api';
import { type ActivityResponse } from '../schemas';

const Home = () => {
    const [activity, setActivity] = useState<ActivityResponse[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const result = await getAllActivities();
            setActivity(result);
        };
        fetchActivities();
    }, []);

    return <div></div>;
};

export default Home;
