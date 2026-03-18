import { useState, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import type { MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Link } from 'react-router-dom';
import type { ActivityResponse } from '../schemas';

const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN as string;

interface MapViewProps {
    activities: ActivityResponse[];
    style?: string;
}

const MapView = ({ activities, style = 'h-64 w-full' }: MapViewProps) => {
    const [popupId, setPopupId] = useState<string | null>(null);
    const mapRef = useRef<MapRef>(null);

    const initialView =
        activities.length === 1
            ? {
                  longitude: activities[0].location.coordinates[0],
                  latitude: activities[0].location.coordinates[1],
                  zoom: 10,
              }
            : { longitude: 10.0, latitude: 51.0, zoom: 5 };

    return (
        <div className={`${style} relative`}>
            <Map
                ref={mapRef}
                mapboxAccessToken={TOKEN}
                initialViewState={initialView}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                style={{ width: '100%', height: '100%' }}
                onLoad={() => mapRef.current?.resize()}
            >
                {activities.map((activity) => {
                    const [lng, lat] = activity.location.coordinates;
                    return (
                        <Marker
                            key={activity._id}
                            longitude={lng}
                            latitude={lat}
                            anchor="bottom"
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                setPopupId(activity._id);
                            }}
                        />
                    );
                })}

                {popupId &&
                    (() => {
                        const activity = activities.find(
                            (a) => a._id === popupId,
                        );
                        if (!activity) return null;
                        const [lng, lat] = activity.location.coordinates;
                        return (
                            <Popup
                                longitude={lng}
                                latitude={lat}
                                anchor="top"
                                onClose={() => setPopupId(null)}
                                closeOnClick={false}
                            >
                                <div className="p-1 text-sm">
                                    <p className="font-semibold text-black">
                                        {activity.title}
                                    </p>
                                    <Link
                                        to={`/activity/${activity._id}`}
                                        className="text-blue-600 underline"
                                    >
                                        See more
                                    </Link>
                                </div>
                            </Popup>
                        );
                    })()}
            </Map>
        </div>
    );
};

export default MapView;
