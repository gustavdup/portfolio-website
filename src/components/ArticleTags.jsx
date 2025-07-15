import React from 'react';
import ResponsiveTags from './ResponsiveTags.jsx';

const ArticleTags = ({ tags }) => {
  return (
    <>
      {tags && tags.length > 0 && (
        <ResponsiveTags 
          tags={tags}
          tagType="context"
          maxRowsMobile={2}
          maxRowsDesktop={3}
          className="mb-1"
        />
      )}
    </>
  );
};

export default ArticleTags;
