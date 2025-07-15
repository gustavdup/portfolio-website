import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResponsiveTags = ({ 
  tags, 
  tagType = 'default', // 'default', 'primary', 'secondary', 'tech', 'context'
  maxRowsMobile = 2,
  maxRowsDesktop = 3,
  className = ''
}) => {
  const [visibleTags, setVisibleTags] = useState(tags);
  const [hiddenTags, setHiddenTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Tag styling based on type
  const getTagStyles = (type) => {
    const baseStyles = "inline-block text-xs px-2 py-0.5 rounded border transition-colors";
    
    switch (type) {
      case 'primary':
        return `${baseStyles} bg-primary/10 text-primary border-primary/20`;
      case 'secondary':
        return `${baseStyles} bg-secondary/10 text-secondary border-secondary/20`;
      case 'tech':
        return `${baseStyles} bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700`;
      case 'context':
        return `${baseStyles} bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700`;
      default:
        return `${baseStyles} bg-primary/10 text-primary border-primary/20`;
    }
  };

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // DOM-based tag fitting calculation
  useEffect(() => {
    if (!tags || tags.length === 0) {
      setVisibleTags([]);
      setHiddenTags([]);
      return;
    }

    // Initially show all tags, then measure
    setVisibleTags(tags);
    setHiddenTags([]);

    // Use a timeout to allow initial render to complete
    const measureTimeout = setTimeout(() => {
      if (!containerRef.current) {
        return;
      }

      const maxRows = isMobile ? maxRowsMobile : maxRowsDesktop;
      const container = containerRef.current;
      
      // Create a temporary container for measurement
      const tempContainer = document.createElement('div');
      tempContainer.className = container.className;
      tempContainer.style.position = 'absolute';
      tempContainer.style.visibility = 'hidden';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = container.offsetWidth + 'px';
      document.body.appendChild(tempContainer);

      try {
        // Create the "+X more" button first with worst-case scenario
        const moreButton = document.createElement('span');
        moreButton.className = "inline-block text-xs px-2 py-0.5 rounded border transition-colors bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary border-primary/30 dark:border-primary/40";
        moreButton.textContent = `+${tags.length - 1} more`;
        tempContainer.appendChild(moreButton);
        
        let currentRow = 1;
        let lastRowTop = null;
        let maxVisibleTags = 0;
        
        // Get tag styles for this tag type
        const tagStyles = getTagStyles(tagType);
        
        // Add tags one by one until we hit the max rows
        for (let i = 0; i < tags.length; i++) {
          const tagSpan = document.createElement('span');
          tagSpan.className = tagStyles;
          tagSpan.textContent = tags[i];
          tempContainer.insertBefore(tagSpan, moreButton);
          
          // Check if this tag created a new row
          const tagRect = tagSpan.getBoundingClientRect();
          const buttonRect = moreButton.getBoundingClientRect();
          
          if (lastRowTop === null) {
            lastRowTop = tagRect.top;
          } else if (Math.abs(tagRect.top - lastRowTop) > 2) {
            // New row detected - using smaller threshold for better accuracy
            currentRow++;
            lastRowTop = tagRect.top;
          }
          
          // Check if adding the "+X more" button would exceed max rows
          const buttonOnNewRow = Math.abs(buttonRect.top - lastRowTop) > 2;
          const wouldExceedRows = buttonOnNewRow ? currentRow + 1 : currentRow;
          
          if (wouldExceedRows > maxRows) {
            // This tag would cause overflow, don't include it
            break;
          }
          
          maxVisibleTags = i + 1;
        }
        
        // Apply the results
        if (maxVisibleTags >= tags.length) {
          setVisibleTags(tags);
          setHiddenTags([]);
        } else {
          setVisibleTags(tags.slice(0, maxVisibleTags));
          setHiddenTags(tags.slice(maxVisibleTags));
        }
        
      } catch (error) {
        console.error('Error in tag measurement:', error);
        // Keep all tags visible on error
        setVisibleTags(tags);
        setHiddenTags([]);
      } finally {
        // Clean up temporary container
        document.body.removeChild(tempContainer);
      }
    }, 50); // Small delay to ensure DOM is ready

    return () => clearTimeout(measureTimeout);
  }, [tags, tagType, isMobile, maxRowsMobile, maxRowsDesktop]);

  if (!tags || tags.length === 0) return null;

  return (
    <>
      <div 
        ref={containerRef}
        className={`flex flex-wrap gap-1 ${className}`}
      >
        {visibleTags.map((tag, idx) => (
          <span 
            key={idx}
            className={getTagStyles(tagType)}
          >
            {tag}
          </span>
        ))}
        
        {hiddenTags.length > 0 && (
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              setModalPosition({ 
                x: rect.left + window.scrollX, 
                y: rect.bottom + window.scrollY + 8 
              });
              setShowModal(true);
            }}
            className="inline-block text-xs px-2 py-0.5 rounded border transition-colors bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary border-primary/30 dark:border-primary/40 hover:bg-primary/15 dark:hover:bg-primary/20 hover:border-primary/50 cursor-pointer select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                setModalPosition({ 
                  x: rect.left + window.scrollX, 
                  y: rect.bottom + window.scrollY + 8 
                });
                setShowModal(true);
              }
            }}
          >
            +{hiddenTags.length} more
          </span>
        )}
      </div>

      {/* Modal for showing all tags - rendered outside DOM hierarchy */}
      {showModal && createPortal(
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-20"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowModal(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.preventDefault();
              e.stopPropagation();
              setShowModal(false);
            }
          }}
          tabIndex={-1}
        >
          <div 
            className="absolute bg-white dark:bg-gray-900 rounded-lg max-w-sm w-auto min-w-64 max-h-80 overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700"
            style={{
              left: isMobile ? '50%' : `${modalPosition.x}px`,
              top: isMobile ? '50%' : `${modalPosition.y}px`,
              transform: isMobile ? 'translate(-50%, -50%)' : 'none',
              maxWidth: isMobile ? '90vw' : '384px'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  All Tags ({tags.length})
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowModal(false);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className={getTagStyles(tagType)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ResponsiveTags;
