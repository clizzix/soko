import { useState } from 'react';
import { type ActivityResponse } from '../schemas';
import { Link } from 'react-router';
import { MdFavorite } from 'react-icons/md';
import { addFavorite, removeFavorite } from '../api';

type ActivityCardProps = {
    activity: ActivityResponse;
    isFavorited?: boolean;
    onFavoriteToggle?: (activityId: string, isFavorited: boolean) => void;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
    activity,
    isFavorited = false,
    onFavoriteToggle,
}) => {
    const dateObject = new Date(activity.date);
    const [favorited, setFavorited] = useState(isFavorited);
    const [loading, setLoading] = useState(false);

    const handleFavoriteClick = async () => {
        if (loading) return;
        setLoading(true);
        try {
            if (favorited) {
                await removeFavorite(activity._id);
                setFavorited(false);
                onFavoriteToggle?.(activity._id, false);
            } else {
                await addFavorite(activity._id);
                setFavorited(true);
                onFavoriteToggle?.(activity._id, true);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card w-96 bg-base-200 border border-neutral card-md shadow-sm">
            {activity.image && (
                <figure>
                    <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-40 object-cover"
                    />
                </figure>
            )}
            <div className="card-body">
                <h2 className="card-title text-xl">{activity.title}</h2>
                <p>{activity.description}</p>
                <p className="text-sm opacity-70">
                    {dateObject.toLocaleDateString('de-DE', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
                <p className="text-red-500">{activity.price}€</p>
                <ul className="flex gap-4 mb-4">
                    {activity.tags.map((tag, index) => (
                        <li
                            className="badge badge-outline badge-accent"
                            key={index}
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
                <div className="justify-end card-actions items-center">
                    <Link
                        to={`/activity/${activity._id}`}
                        className="btn btn-primary"
                    >
                        See more
                    </Link>
                    <MdFavorite
                        className={`cursor-pointer transition-colors ${
                            favorited
                                ? 'text-error hover:text-red-600'
                                : 'text-neutral hover:text-error'
                        } ${loading ? 'opacity-50' : ''}`}
                        size="24"
                        onClick={handleFavoriteClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
