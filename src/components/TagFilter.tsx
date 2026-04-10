import { ActivityTagsEnum } from '../schemas';
import type { ActivityTag } from '../types';

type TagFilterProps = {
    selectedTags: ActivityTag[];
    onChange: (tags: ActivityTag[]) => void;
};

const allTags = ActivityTagsEnum.options;

const TagFilter: React.FC<TagFilterProps> = ({ selectedTags, onChange }) => {
    const toggleTag = (tag: ActivityTag) => {
        if (selectedTags.includes(tag)) {
            onChange(selectedTags.filter((t) => t !== tag));
        } else {
            onChange([...selectedTags, tag]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`badge badge-lg cursor-pointer transition-colors ${
                        selectedTags.includes(tag)
                            ? 'badge-accent'
                            : 'badge-outline badge-accent'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default TagFilter;
