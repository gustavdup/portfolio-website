import React from 'react';
import ResponsiveTags from './ResponsiveTags.jsx';

const ProjectTags = ({ tags, tech }) => {
  return (
    <div>
      {/* Tags Display */}
      {tags && tags.length > 0 && (
        <ResponsiveTags 
          tags={tags}
          tagType="context"
          maxRowsMobile={2}
          maxRowsDesktop={3}
          className="mb-2"
        />
      )}
      
      {/* Tech Stack */}
      {tech && tech.length > 0 && (
        <ResponsiveTags 
          tags={tech}
          tagType="context"
          maxRowsMobile={2}
          maxRowsDesktop={3}
          className=""
        />
      )}
    </div>
  );
};

export default ProjectTags;
