import { type ActivityResponse } from '../schemas';
import { Link } from 'react-router';
import { MdFavorite } from 'react-icons/md';

type ActivityCardProps = {
    activity: ActivityResponse;
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const dateObject = new Date(activity.date);

    return (
        <div className="card w-96 bg-neutral-400 border border-neutral card-md shadow-sm text-black">
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
                <ul className="flex gap-4">
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
                        className="text-error hover:text-red-600 cursor-pointer"
                        size="24"
                    />
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
