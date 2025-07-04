import React, { useState, useEffect } from "react";

export default function ExperienceList({ 
  productExperiences, 
  technologyExperiences, 
  strategyExperiences, 
  uxExperiences, 
  leadershipExperiences 
}) {
  const [selectedRole, setSelectedRole] = useState("Product");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const experienceCollections = {
    Product: productExperiences,
    Technology: technologyExperiences,
    Strategy: strategyExperiences,
    UX: uxExperiences,
    Leadership: leadershipExperiences
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
    Product: {
      title: "Product Management Experience",
      description: "Leading product strategy, user experience, and cross-functional teams to deliver impactful solutions.",
      skills: ["Product Strategy", "User Experience", "Team Leadership", "Roadmap Planning", "Stakeholder Management"]
    },
    Technology: {
      title: "Technology Leadership Experience", 
      description: "Driving technical architecture, engineering excellence, and scalable infrastructure solutions.",
      skills: ["Technical Architecture", "Engineering Leadership", "DevOps", "Cloud Infrastructure", "System Design"]
    },
    Strategy: {
      title: "Strategic Leadership Experience",
      description: "Developing long-term vision, business strategy, and organizational transformation initiatives.",
      skills: ["Strategic Planning", "Business Development", "Market Analysis", "Organizational Design", "Change Management"]
    },
    UX: {
      title: "UX & Onboarding Experience",
      description: "Creating intuitive user experiences and seamless onboarding flows that drive engagement and adoption.",
      skills: ["User Research", "Design Systems", "Onboarding Design", "User Testing", "Conversion Optimization"]
    },
    Leadership: {
      title: "Leadership & Team Management",
      description: "Building and scaling high-performing teams while fostering innovation and growth culture.",
      skills: ["Team Building", "Mentoring", "Performance Management", "Culture Development", "Strategic Communication"]
    }
  };

  const currentRole = roleDescriptions[selectedRole];

  return (
    <div>
      {/* Description without main title */}
      <div className="mb-8 flex justify-center px-4">
        <div className="bg-accent/3 dark:bg-accent/6 border border-accent/15 dark:border-accent/20 rounded-2xl px-6 py-4 text-center backdrop-blur-xl shadow-lg w-full max-w-sm sm:max-w-none sm:w-auto">
          <p className="text-text-light dark:text-text-dark font-normal text-base leading-relaxed">
            Each role highlights a different strength. Explore my experience from the perspective that matters most to you — product, technology, strategy, UX, or leadership.
          </p>
        </div>
      </div>

      <section>
        {/* Section Header with tabs integrated */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-medium tracking-wider uppercase text-gray-600 dark:text-gray-400">Select Perspective</h2>
            <div className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-800"></div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(roleDescriptions).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedRole === role
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-secondary hover:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                {role === 'UX' ? 'UX & Onboarding' : role}
              </button>
            ))}
          </div>
        </div>
        
        {/* Role Description Section - Clean header design */}
        <div className={`mb-10 transition-all duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          <div className="border-l-4 border-secondary bg-gray-50 dark:bg-gray-900/50 pl-6 pr-4 py-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">{currentRole.title}</h3>
              <span className="text-xs text-secondary dark:text-secondary font-bold px-2 py-1 bg-secondary/10 dark:bg-secondary/20 rounded-md">
                {experiences.length} {experiences.length === 1 ? 'role' : 'roles'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{currentRole.description}</p>
            <div className="flex flex-wrap gap-2">
              {currentRole.skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 text-xs font-medium rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
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
    </div>
  );
}
