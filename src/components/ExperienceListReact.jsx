import React, { useState, useEffect } from "react";

export default function ExperienceList({ 
  experienceProductStrategistExperiences,
  experienceExecutionLeadExperiences,
  experienceDigitalEnablerExperiences,
  experienceFractionalPmExperiences,
  experienceCollaborativeLeaderExperiences,
  experienceCommercialStrategistExperiences,
  experienceStrategicTechnologistExperiences
}) {
  const [selectedRole, setSelectedRole] = useState("ProductStrategist");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const experienceCollections = {
    ProductStrategist: experienceProductStrategistExperiences,
    ExecutionLead: experienceExecutionLeadExperiences,
    DigitalEnabler: experienceDigitalEnablerExperiences,
    FractionalPm: experienceFractionalPmExperiences,
    CollaborativeLeader: experienceCollaborativeLeaderExperiences,
    CommercialStrategist: experienceCommercialStrategistExperiences,
    StrategicTechnologist: experienceStrategicTechnologistExperiences,
  };
  
  const experiences = experienceCollections[selectedRole];

  const handleRoleChange = (newRole) => {
    if (newRole !== selectedRole) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedRole(newRole);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const roleDescriptions = {
    ProductStrategist: {
      title: "Product Strategist",
      description: "Defines product vision, market alignment, and growth priorities—balancing user needs, business value, and feasibility to create long-term impact.",
      skills: []
    },
    ExecutionLead: {
      title: "Execution Lead",
      description: "Turns plans into shipped outcomes—leading delivery across complex environments while balancing speed, quality, and strategic trade-offs to stay aligned with product goals.",
      skills: []
    },
    DigitalEnabler: {
      title: "Digital Enabler",
      description: "Builds and refines internal platforms, tools, and automation—improving operational visibility, team efficiency, and cross-system data flows.",
      skills: []
    },
    FractionalPm: {
      title: "Fractional PM",
      description: "Rapidly adapts to client needs—jumping into high-context environments to scope, align, and deliver as a flexible and experienced product partner.",
      skills: []
    },
    CollaborativeLeader: {
      title: "Collaborative Leader",
      description: "Shapes open, outcome-focused team culture—championing transparency, psychological safety, and shared ownership to unlock high performance.",
      skills: []
    },
    CommercialStrategist: {
      title: "Commercial Strategist",
      description: "Connects product thinking with business outcomes—building scalable models, pricing, market narratives, and systems that drive adoption and growth.",
      skills: []
    },
    StrategicTechnologist: {
      title: "Strategic Technologist",
      description: "Bridges product, architecture, and platform evolution—collaborating with engineers and domain experts to make informed, sustainable technology decisions.",
      skills: []
    }
  };

  const currentRole = roleDescriptions[selectedRole];

  return (
    <section className="mt-4">
      {/* Description without main title */}
      <div className="mb-6 sm:mb-8 text-center px-4">
        <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-2">
          Explore My Experience by Profile
        </p>
        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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
          <div className="flex overflow-x-auto gap-2 pb-2 px-4 sm:hidden scrollbar-hide">
            {Object.keys(roleDescriptions).map((role) => (
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
          
          {/* Desktop: Flex wrap */}
          <div className="hidden sm:flex flex-wrap gap-2">
            {Object.keys(roleDescriptions).map((role) => (
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
          <div className="border-l-4 border-secondary pl-6 pr-4 py-6">
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
        <div className="text-center mb-6">
          <p className="text-sm text-accent italic">Roles ordered by relevance, not chronology.</p>
        </div>
        {/* Experience List */}
        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-50 translate-y-2' : 'opacity-100 translate-y-0'}`}>
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
                className="exp-card p-6 rounded-xl bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-0.5"
                key={exp.id}
              >
                <div className="flex items-start justify-between mb-3 gap-4">
                  <div>
                    <h4 className="font-medium text-lg text-gray-900 dark:text-gray-100 mb-1">
                      {exp.data.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {exp.data.company}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium block">{exp.data.timeframe}</span>
                    {exp.data.location && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1 justify-end">
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.data.context.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
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
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
