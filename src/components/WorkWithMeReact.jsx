import React, { useState, useEffect, useCallback, useMemo } from "react";

export default function WorkWithMe({ 
  tabs,
  contactEntry,
  availability
}) {
  const [isClient, setIsClient] = useState(false);
  
  // Memoize markdown conversion function
  const convertMarkdownLinks = useCallback((text) => {
    if (!text) return '';
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-secondary hover:underline">$1</a>');
  }, []);
  
  // Memoize valid anchors
  const validAnchors = useMemo(() => ['consulting', 'fractional', 'permanent'], []);
  
  // Get initial tab from URL hash immediately
  const getInitialTab = useCallback(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1);
      if (hash && validAnchors.includes(hash)) {
        return hash;
      }
    }
    return "consulting";
  }, [validAnchors]);

  const [selectedTab, setSelectedTab] = useState(() => getInitialTab());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
    
    // Memoized hash checker
    const checkAndSetHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash && validAnchors.includes(hash)) {
        setSelectedTab(hash);
      } else if (!hash) {
        setSelectedTab("consulting");
      }
    };

    // Run immediately on mount
    checkAndSetHash();

    // Optimized hash and popstate handlers
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && validAnchors.includes(hash)) {
        setSelectedTab(hash);
      } else {
        setSelectedTab("consulting");
      }
    };

    // Use passive event listeners for better performance
    window.addEventListener('hashchange', handleHashChange, { passive: true });
    window.addEventListener('popstate', handleHashChange, { passive: true });
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [validAnchors]);

  const handleTabChange = (newTab) => {
    if (newTab !== selectedTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedTab(newTab);
        setIsTransitioning(false);
      }, 150);
      
      // Update URL with anchor
      if (newTab) {
        window.history.pushState(null, null, `#${newTab}`);
      }
    }
  };

  // Find the current tab content
  const currentTab = tabs.find(tab => (tab.data.slug || tab.slug) === selectedTab);
  
  // Simple markdown-like parsing for display
  const parseContent = (content) => {
    if (!content) return '';
    
    return content
      .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mb-3 mt-6">$1</h3>')
      .replace(/^- (.*)/gm, '<li class="mb-1">$1</li>')
      .replace(/(<li.*<\/li>)/gs, '<ul class="list-none space-y-1 mb-4">$1</ul>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(.*)$/gm, '<p class="mb-4">$1</p>')
      .replace(/<p class="mb-4"><h3/g, '<h3')
      .replace(/<\/h3><\/p>/g, '</h3>')
      .replace(/<p class="mb-4"><ul/g, '<ul')
      .replace(/<\/ul><\/p>/g, '</ul>');
  };

  // Don't render until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <section className="mt-4">
        <div className="animate-pulse">
          <div className="mb-6 sm:mb-8 text-center px-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="mb-4 sm:mb-6">
            <div className="flex gap-2 px-4 mb-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-28"></div>
            </div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-4">
      {/* Description Section */}
      <div className="mb-6 sm:mb-8 text-center px-4">
        <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-2">
          Whether you need strategic input, flexible product leadership, or a long-term engagement, I offer multiple ways to collaborate.
        </p>
        <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose the engagement type that aligns with your current needs and timeline.
        </p>
      </div>

      {/* Section Header with tabs integrated */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-4">
          <h2 className="text-xs sm:text-sm font-medium tracking-wider uppercase text-gray-600 dark:text-gray-400">Engagement Types</h2>
          <div className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-800"></div>
        </div>
          
        {/* Mobile: Scrollable pills */}
        <div className="flex overflow-x-auto gap-2 pb-2 px-4 sm:hidden scrollbar-hide">
          {tabs.map((tab) => {
            const tabSlug = tab.data.slug || tab.slug;
            return (
              <button
                key={`mobile-${tabSlug}`}
                onClick={() => handleTabChange(tabSlug)}
                className={`px-3 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                  selectedTab === tabSlug
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-secondary hover:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                {tab.data.title}
              </button>
            );
          })}
        </div>
        
        {/* Desktop: Flex wrap */}
        <div className="hidden sm:flex flex-wrap gap-2 px-4">
          {tabs.map((tab) => {
            const tabSlug = tab.data.slug || tab.slug;
            return (
              <button
                key={`desktop-${tabSlug}`}
                onClick={() => handleTabChange(tabSlug)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTab === tabSlug
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-secondary hover:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                {tab.data.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className={`mb-6 transition-all duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        {currentTab && (
          <div className="py-3">
            <div 
              className="prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: parseContent(currentTab.body) }}
            />
          </div>
        )}
      </div>

      {/* Availability Note */}
      {availability?.data.showOnContact && (
        <section className="mb-8">
          <div className="max-w-2xl mx-auto py-4">
            <div className={`px-3 py-2 border rounded-lg ${
              availability?.data.level === 'high' 
                ? 'bg-secondary/10 dark:bg-secondary/15 border-secondary/25'
                : availability?.data.level === 'medium'
                ? 'bg-accent/10 dark:bg-accent/15 border-accent/25'
                : 'bg-red-800/10 dark:bg-red-800/15 border-red-800/25'
            }`}>
              <div 
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed italic text-center"
                dangerouslySetInnerHTML={{
                  __html: convertMarkdownLinks(availability?.data.contactMessage || availability?.data.message)
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="text-center">
        <div id="lets-connect" className="p-6 rounded-xl bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark mb-4">
            {contactEntry?.data.title}
          </h2>
          
          <div className="mb-6">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {contactEntry?.data.header_text}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <a 
              href={contactEntry?.data.calendar_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-medium transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
            >
              {contactEntry?.data.buttons?.book_call}
            </a>
            
            <a 
              href={contactEntry?.data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg text-xs font-medium transition-all duration-200 hover:bg-[#005885] hover:shadow-lg hover:-translate-y-0.5"
            >
              {contactEntry?.data.buttons?.linkedin}
            </a>
            
            <a 
              href={`mailto:${contactEntry?.data.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg hover:-translate-y-0.5"
            >
              {contactEntry?.data.buttons?.email}
            </a>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              {contactEntry?.data.footer_text}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
