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
      {/* Main Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-3">Experience</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
          Each role highlights a different strength. Explore my experience from the perspective that matters most to you — product, technology, strategy, UX, or leadership.
        </p>
      </div>

      <section className="mt-8">
        {/* Tab Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {Object.keys(roleDescriptions).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedRole === role
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {role === 'UX' ? 'UX & Onboarding' : role}
              </button>
            ))}
          </div>
          <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap">
            {experiences.length} {experiences.length === 1 ? 'role' : 'roles'}
          </span>
        </div>
        
        {/* Role Description Section */}
        <div className={`mb-8 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">{currentRole.title}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">{currentRole.description}</p>
          <div className="flex flex-wrap gap-2">
            {currentRole.skills.map((skill, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 text-xs rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Experience List */}
        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-50 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <ul className="space-y-6">
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
              <li
                className="exp-card py-6 px-7 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700"
                key={exp.id}
              >
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <span className="font-medium text-lg text-zinc-900 dark:text-zinc-100">
                    {exp.data.title} <span className="text-zinc-600 dark:text-zinc-400 font-normal">@ {exp.data.company}</span>
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{exp.data.timeframe}</span>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {exp.data.location}
                </div>
                
                {/* Context Tags */}
                {exp.data.context && exp.data.context.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.data.context.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Responsibilities */}
                <ul className="list-disc list-inside text-sm text-zinc-700 dark:text-zinc-300 space-y-2 ml-2">
                  {exp.data.responsibilities?.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
