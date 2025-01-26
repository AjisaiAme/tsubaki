import React, { useState } from 'react';

const TagsDisplay = ({ tags }) => {
  const [showAll, setShowAll] = useState(false);
  const maxTagsToShow = 3; // Adjust this value as needed

  // Handle undefined, null, or non-array tags
  if (!Array.isArray(tags) || tags.length === 0) {
    return <div className="tags-container">No tags available.</div>;
  }

  // Determine which tags to display
  const tagsToShow = showAll ? tags : tags.slice(0, maxTagsToShow);
  const remainingTagsCount = tags.length - maxTagsToShow;

  return (
    <div className="tags-container">
      {/* Add the SVG here */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="tags-icon"
      >
        <path
          fillRule="evenodd"
          d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
          clipRule="evenodd"
        />
      </svg>

      {/* Display tags */}
      <div className="tags-list">
        {tagsToShow.map((tag, index) => {
          // Ensure tag has the expected properties
          if (!tag || !tag.name || !tag.rank) {
            return null; // Skip invalid tags
          }

          return (
            <span key={index} className="tag-item">
              {tag.name} ({tag.rank}%)
            </span>
          );
        })}

        {/* Show "Show More" or "Show Less" button */}
        {remainingTagsCount > 0 && (
          <span
            className="show-more-button"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `+${remainingTagsCount} more`}
          </span>
        )}
      </div>
    </div>
  );
};

export default TagsDisplay;