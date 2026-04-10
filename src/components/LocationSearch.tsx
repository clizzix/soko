import { useState } from 'react';
import { SearchBox } from '@mapbox/search-js-react';
import MapView from './MapView';
import type { ActivityResponse } from '../schemas';

const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN as string;

interface LocationSearchProps {
    onChange: (
        location: { type: 'Point'; coordinates: [number, number] },
        label: string
    ) => void;
    error?: string;
}

const LocationSearch = ({ onChange, error }: LocationSearchProps) => {
    const [preview, setPreview] = useState<ActivityResponse | null>(null);
    const [value, setValue] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRetrieve = (result: any) => {
        const feature = result?.features?.[0];
        if (!feature) return;
        const [lng, lat] = feature.geometry.coordinates as [number, number];
        const label: string =
            feature.properties?.full_address ??
            feature.properties?.name ??
            '';
        onChange({ type: 'Point', coordinates: [lng, lat] }, label);
        setPreview({
            _id: 'preview',
            title: label,
            description: '',
            date: new Date().toISOString(),
            price: 0,
            tags: [],
            userId: '',
            location: { type: 'Point', coordinates: [lng, lat] },
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <SearchBox
                accessToken={TOKEN}
                value={value}
                onChange={setValue}
                onRetrieve={handleRetrieve}
                options={{ language: 'en', country: 'DE' }}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {preview && (
                <MapView activities={[preview]} style="h-48 w-full rounded" />
            )}
        </div>
    );
};

export default LocationSearch;
