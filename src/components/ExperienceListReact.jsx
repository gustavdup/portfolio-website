import React, { useState, useEffect, useMemo, useCallback } from "react";
import ResponsiveTags from './ResponsiveTags.jsx';

export default function ExperienceList({ 
  experienceOverviewExperiences,
  experienceProductStrategistExperiences,
  experienceExecutionLeadExperiences,
  experienceDigitalEnablerExperiences,
  experienceFractionalPmExperiences,
  experienceCollaborativeLeaderExperiences,
  experienceCommercialStrategistExperiences,
  experienceStrategicTechnologistExperiences
}) {
  const [isClient, setIsClient] = useState(false);
  
  // Memoize role descriptions with full data
  const roleDescriptions = useMemo(() => ({
    Overview: {
      title: "Overview",
      anchor: "overview",
      description: "A comprehensive view of my career journey, highlighting key experiences, achievements, and the evolution of my expertise across product strategy, execution, and technology leadership.",
      order_description: "Roles ordered chronologically.",
      skills: []
    },
    ProductStrategist: {
      title: "Product Strategist",
      anchor: "product-strategist",
      description: "Defines product vision, market alignment, and growth priorities—balancing user needs, business value, and feasibility to create long-term impact.",
      order_description: "Roles ordered by relevance, not chronologically.",
      skills: []
    },
    ExecutionLead: {
      title: "Execution Lead",
      anchor: "execution-lead",
      description: "Turns plans into shipped outcomes—leading delivery across complex environments while balancing speed, quality, and strategic trade-offs to stay aligned with product goals.",
      order_description: "Roles ordered by relevance, not chronologically.",
      skills: []
    },
    DigitalEnabler: {
      title: "Digital Enabler",
      anchor: "digital-enabler",
      description: "Builds and refines internal platforms, tools, and automation—improving operational visibility, team efficiency, and cross-system data flows.",
      order_description: "Roles ordered by relevance, not chronologically.",
      skills: []
    },
    FractionalPm: {
      title: "Fractional PM",
      anchor: "fractional-pm",
      description: "Rapidly adapts to client needs—jumping into high-context environments to scope, align, and deliver as a flexible and experienced product partner.",
      order_description: "Roles ordered by relevance, not chronologically.",
      skills: []
    },
    CollaborativeLeader: {
      title: "Collaborative Leader",
      anchor: "collaborative-leader",
      description: "Shapes open, outcome-focused team culture—championing transparency, psychological safety, and shared ownership to unlock high performance.",
      order_description: "Roles ordered by relevance, not chronologically.",
      skills: []
    },
    CommercialStrategist: {
      title: "Commercial Strategist",
      anchor: "commercial-strategist",
      description: "Connects product thinking with business outcomes—building scalable models, pricing, market narratives, and systems that drive adoption and growth.",
      order_description: "Roles ordered by relevance, not chronologically.",
      skills: []
    },
    StrategicTechnologist: {
      title: "Technology Strategist",
      anchor: "technology-strategist",
      description: "Bridges product, architecture, and platform evolution—collaborating with engineers and domain experts to make informed, sustainable technology decisions.",
      order_description: "Roles ordered by relevance, not chronologically.",
      skills: []
    }
  }), []);
  
  // Get initial role from URL hash immediately
  const getInitialRole = useCallback(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1);
      
      if (hash) {
        const roleKey = Object.keys(roleDescriptions).find(
          key => roleDescriptions[key].anchor === hash
        );
        if (roleKey) {
          return roleKey;
        }
      }
    }
    return "Overview";
  }, [roleDescriptions]);

  const [selectedRole, setSelectedRole] = useState(() => getInitialRole());
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const experienceCollections = {
    Overview: experienceOverviewExperiences,
    ProductStrategist: experienceProductStrategistExperiences,
    ExecutionLead: experienceExecutionLeadExperiences,
    DigitalEnabler: experienceDigitalEnablerExperiences,
    FractionalPm: experienceFractionalPmExperiences,
    CollaborativeLeader: experienceCollaborativeLeaderExperiences,
    CommercialStrategist: experienceCommercialStrategistExperiences,
    StrategicTechnologist: experienceStrategicTechnologistExperiences,
  };
  
  // Filter out roles that have no visible experiences
  const visibleRoles = Object.keys(experienceCollections).filter(role => 
    experienceCollections[role] && experienceCollections[role].length > 0
  );
  
  const experiences = experienceCollections[selectedRole];

  const handleRoleChange = (newRole) => {
    if (newRole !== selectedRole) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedRole(newRole);
        setIsTransitioning(false);
      }, 150);
      
      // Update URL with anchor
      const anchor = roleDescriptions[newRole].anchor;
      if (anchor) {
        window.history.pushState(null, null, `#${anchor}`);
      }
    }
  };

  // Handle initial page load and anchor navigation
  useEffect(() => {
    setIsClient(true);
    
    // Optimized hash handler to reduce duplicate code
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const roleKey = Object.keys(roleDescriptions).find(
          key => roleDescriptions[key].anchor === hash
        );
        if (roleKey && visibleRoles.includes(roleKey)) {
          setSelectedRole(roleKey);
        } else {
          // If hash role is not visible, redirect to first visible role
          setSelectedRole(visibleRoles[0] || "Overview");
        }
      } else {
        setSelectedRole(visibleRoles.includes("Overview") ? "Overview" : visibleRoles[0]);
      }
    };

    // Run immediately on mount
    handleHashNavigation();

    // Use passive event listeners for better performance
    window.addEventListener('hashchange', handleHashNavigation, { passive: true });
    window.addEventListener('popstate', handleHashNavigation, { passive: true });
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
      window.removeEventListener('popstate', handleHashNavigation);
    };
  }, [visibleRoles]);

  const currentRole = roleDescriptions[selectedRole];

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
      {/* Description without main title */}
      <div className="mb-6 sm:mb-8 text-center px-4">
        <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-2">
          Explore My Experience by Profile
        </p>
        <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Each profile offers a focused view of my work — from product strategy and execution to technology, leadership, and commercial impact.
        </p>
      </div>

      {/* Section Header with tabs integrated */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-4">
          <h2 className="text-xs sm:text-sm font-medium tracking-wider uppercase text-gray-600 dark:text-gray-400">Select Profile</h2>
          <div className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-800"></div>
        </div>
          
          {/* Tab Navigation */}
          <div className="sm:hidden">
            {/* Scrollable tabs container */}
            <div className="flex overflow-x-auto gap-2 pb-2 px-4 scrollbar-hide">
              {visibleRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                    selectedRole === role
                      ? 'bg-secondary text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-secondary hover:text-white border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {roleDescriptions[role].title}
                </button>
              ))}
            </div>
            
            {/* Scroll hint text - moved below pills, right aligned */}
            <div className="flex justify-end px-4 mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 italic">Swipe for more profiles →</span>
            </div>
          </div>
          
          {/* Desktop: Flex wrap */}
          <div className="hidden sm:flex flex-wrap gap-2">
            {visibleRoles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedRole === role
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-secondary hover:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                {roleDescriptions[role].title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Role Description Section - Clean header design */}
        <div className={`mb-10 transition-all duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          <div className="border-l-4 border-secondary pl-6 pr-4 py-6 px-4">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">{currentRole.title}</h3>
              <span className="text-xs text-secondary dark:text-secondary font-bold px-2 py-1 bg-secondary/10 dark:bg-secondary/20 rounded-md">
                {experiences.length} {experiences.length === 1 ? 'role' : 'roles'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{currentRole.description}</p>
          </div>
        </div>
        {/* Centered note about ordering */}
        <div className="text-center mb-6 px-4">
          <p className="text-sm text-accent italic">{currentRole.order_description}</p>
        </div>
        {/* Experience List */}
        <div className={`transition-all duration-300 px-4 ${isTransitioning ? 'opacity-50 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <div className="space-y-4">
          {experiences
            .sort((a, b) => {
              // Primary sort by order (if specified), secondary by timeframe
              if (a.data.order !== undefined && b.data.order !== undefined) {
                return a.data.order - b.data.order;
              }
              if (a.data.order !== undefined) return -1;
              if (b.data.order !== undefined) return 1;
              // Fallback to timeframe sorting (most recent first)
              return b.data.timeframe > a.data.timeframe ? 1 : -1;
            })
            .map(exp => (
              <div
                className="exp-card p-4 md:p-6 rounded-xl bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-0.5"
                key={exp.id}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base sm:text-lg text-gray-900 dark:text-gray-100 mb-1 leading-tight">
                      {exp.data.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                      {exp.data.company}
                    </p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0 sm:min-w-0">
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium block">{exp.data.timeframe}</span>
                    {exp.data.location && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1 sm:justify-end">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {exp.data.location}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Context Tags */}
                {exp.data.context && exp.data.context.length > 0 && (
                  <ResponsiveTags 
                    tags={exp.data.context}
                    tagType="context"
                    maxRowsMobile={2}
                    maxRowsDesktop={3}
                    className="mb-4"
                  />
                )}
                
                {/* Optional Header */}
                {exp.data.header && (
                  <div className="mb-3">
                    <p className="text-sm text-text-light dark:text-text-dark leading-relaxed">
                      {exp.data.header}
                    </p>
                  </div>
                )}
                
                {/* Responsibilities */}
                {exp.data.responsibilities && exp.data.responsibilities.length > 0 && (
                  <ul className="space-y-2 pl-6 list-disc">
                    {exp.data.responsibilities.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed ml-0" style={{listStylePosition: 'outside'}}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* Optional Footer */}
                {exp.data.footer && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-secondary dark:text-secondary italic">
                      {exp.data.footer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
