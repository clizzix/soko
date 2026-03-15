export const createActivity = async (activityData) => {
    const token = localStorage.getItem('token');
    const port = import.meta.env.VITE_PORT || 'http://localhost:8080';
    try {
        const response = await fetch(`${port}/api/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(activityData),
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Request failed:', err);
    }
};

export const getNearbyActivities = async (
    longitude: number,
    latitude: number,
) => {
    const url = `http://localhost:5000/api/activities?lng=${longitude}&lat=${latitude}&distance=10`;

    const response = await fetch(url);
    const activities = await response.json();
    return activities;
};
