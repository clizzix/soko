import { type ActivityResponse } from '../schemas';
import { Link } from 'react-router';

type ActivityCardProps = {
    activity: ActivityResponse;
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const dateObject = new Date(activity.date);

    return (
        <div className="card w-96 bg-neutral-400 border border-base-300 card-md shadow-sm text-black">
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
                <div className="justify-end card-actions">
                    <Link
                        to={`/activity/${activity._id}`}
                        className="btn btn-primary"
                    >
                        See more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
