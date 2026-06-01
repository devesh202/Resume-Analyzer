import React, { useEffect, useState } from "react";
import "../style/interview.scss";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";

// Mock Data matches the format required by your project
const REPORT_DATA = {
  "matchScore": 88, // Displaying 88 to match your target interface screenshot!
  "technicalQuestions": [
    {
      "question": "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
      "intention": "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
      "answer": "The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread."
    },
    {
      "question": "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
      "intention": "Assess depth of MongoDB indexing strategies, pipeline staging, and memory limits during massive data aggregation runs.",
      "answer": "Optimize by filtering data early using $match and $project stages, placing them at the beginning of the pipeline. Use indexed fields in early match stages. Be mindful of the 100MB memory limit per stage and use allowDiskUse: true if necessary, while avoiding excessive lookup operations that cause nested data scans."
    },
    {
      "question": "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
      "intention": "Evaluate caching strategies, read/write trade-offs, and state synchronization across multiple server nodes.",
      "answer": "In Cache-Aside, the application first queries the cache. If a hit occurs, it returns data. On a miss, it queries the DB, updates the cache, and then returns data. Redis is excellent for rapid session storage, temporary caching of static resources, rate limiting, and managing server state locks."
    },
    {
      "question": "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
      "intention": "Assess architectural foresight, data segregation strategies, and networking overhead in microservices.",
      "answer": "Key challenges include managing shared database transactions across isolated services, handling network failure overhead, maintaining API contracts, implementing correlation IDs for distributed debugging, and managing service registry configs during deployments."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "You mentioned taking lead roles and managing small teams. Can you describe a specific instance where you mentored a junior developer from initial onboarding to becoming a productive team member, aligning with the mentoring responsibility?",
      "intention": "Evaluate leadership and mentorship skills, specifically the ability to guide and develop junior talent.",
      "answer": "In my previous role, I mentored a junior developer who was new to React. I started by pairing with them on smaller, isolated tasks, gradually increasing complexity. I encouraged a 'learn by doing' approach, providing resources and regular one-on-one code reviews focused on constructive feedback and explaining the 'why' behind best practices. I also set up a buddy system for immediate support. Within a few months, they were confidently tackling medium-sized features independently and actively participating in design discussions."
    },
    {
      "question": "This role requires collaborating with backend engineers for API integration. Describe a challenging API integration you faced and how you ensured smooth collaboration and successful implementation.",
      "intention": "Assess collaboration skills, problem-solving in cross-functional teams, and practical experience with API integration challenges.",
      "answer": "I once worked on integrating with a new third-party payment gateway API that had complex authentication flows and incomplete documentation. My strategy involved initiating daily sync-ups with the backend team to clarify API contracts and resolve discrepancies immediately. We used Postman extensively to mock responses and test endpoints in isolation. I also implemented robust error handling and fallback UIs on the frontend to gracefully manage potential API failures, ensuring a resilient user experience despite the initial challenges. Clear, constant communication was key."
    },
    {
      "question": "Tell me about a time you had to make a significant architectural decision regarding UI components to ensure scalability. What was the problem, your solution, and the outcome?",
      "intention": "Assess architectural thinking, decision-making, and understanding of long-term scalability in frontend development.",
      "answer": "We faced a challenge with a growing design system where component inconsistencies and slow development times became apparent. The problem was a lack of a centralized, reusable component library. My solution was to advocate for and lead the creation of a Storybook-driven component library, adopting atomic design principles. We refactored existing components into isolated, reusable units with clear props and documentation. The outcome was a significant improvement in development speed, greater UI consistency across the application, and a reduction in technical debt, making the system much more scalable."
    }
  ],
  "skillGaps": [
    {
      "skill": "Message Queues (Kafka/RabbitMQ)",
      "severity": "high"
    },
    {
      "skill": "Advanced Docker & CI/CD Pipelines",
      "severity": "medium"
    },
    {
      "skill": "Distributed Systems Design",
      "severity": "medium"
    },
    {
      "skill": "Production-level Redis management",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "React Advanced Concepts & Modern CSS Frameworks",
      "tasks": [
        "Review advanced React hooks (useReducer, useRef, useContext, custom hooks) and their practical applications.",
        "Practice component composition, render props, and higher-order components for building reusable UIs.",
        "Study and build a small project using a modern CSS framework like Tailwind CSS or Styled Components, focusing on responsive design and theming."
      ]
    },
    {
      "day": 2,
      "focus": "State Management (Redux/Zustand) & TypeScript",
      "tasks": [
        "Dive deep into Redux Toolkit, understanding slices, reducers, actions, and asynchronous operations (thunks). Implement a small feature using it.",
        "Explore Zustand as a lighter alternative for state management and understand its use cases.",
        "Refactor an existing JavaScript project or build a new one with TypeScript, focusing on defining interfaces, types, generics, and leveraging its benefits for complex applications."
      ]
    },
    {
      "day": 3,
      "focus": "Testing & Browser Performance Optimization",
      "tasks": [
        "Write comprehensive unit tests for React components and utility functions using Jest and React Testing Library, focusing on behavior rather than implementation details.",
        "Set up and write end-to-end tests for critical user flows using Cypress.",
        "Study common browser performance bottlenecks (e.g., large bundles, excessive re-renders, slow network requests) and practice using browser developer tools (Lighthouse, Performance tab) for identification and optimization."
      ]
    }
  ]
};

const Interview = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("technical"); // Options: "technical", "behavioral", "roadmap"
  
  // Track expanded questions by index (first question is open by default like the image)
  const [expandedTech, setExpandedTech] = useState({ 0: true });
  const [expandedBehavioral, setExpandedBehavioral] = useState({ 0: true });

  const toggleTech = (idx) => {
    setExpandedTech(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleBehavioral = (idx) => {
    setExpandedBehavioral(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // SVG Progress circle calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (REPORT_DATA.matchScore / 100) * circumference;

  return (
    <div className="interview-report-page">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <span className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Career<span className="logo-accent">AI</span>Pro
          </span>
        </div>
        <div className="nav-right">
          <button className="nav-icon-btn" aria-label="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
          <button className="nav-icon-btn" aria-label="Settings">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div className="user-avatar">U</div>
        </div>
      </nav>

      {/* Back button action */}
      <div className="header-actions">
        <button className="back-btn" onClick={() => navigate("/")}>
          <svg className="back-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      {/* Primary 3-Column dashboard layout */}
      <div className="report-container">
        <div className="report-grid-card">
          
          {/* Column 1: Sidebar tab links */}
          <aside className="sidebar-tabs">
            <span className="sidebar-header-label">SECTIONS</span>
            <button 
              className={`sidebar-tab-btn ${activeTab === "technical" ? "active" : ""}`}
              onClick={() => setActiveTab("technical")}
            >
              <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
              Technical Questions
            </button>
            <button 
              className={`sidebar-tab-btn ${activeTab === "behavioral" ? "active" : ""}`}
              onClick={() => setActiveTab("behavioral")}
            >
              <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Behavioral Questions
            </button>
            <button 
              className={`sidebar-tab-btn ${activeTab === "roadmap" ? "active" : ""}`}
              onClick={() => setActiveTab("roadmap")}
            >
              <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Road Map
            </button>
          </aside>

          {/* Column 2: Center main content details panels */}
          <section className="main-content-pane">
            
            {/* Tab: Technical questions */}
            {activeTab === "technical" && (
              <>
                <header className="pane-header">
                  <h3 className="pane-title">Technical Questions</h3>
                  <span className="q-count-badge">{REPORT_DATA.technicalQuestions.length} questions</span>
                </header>

                <div className="qna-list">
                  {REPORT_DATA.technicalQuestions.map((item, idx) => {
                    const isExpanded = !!expandedTech[idx];
                    return (
                      <div 
                        className={`qna-card ${isExpanded ? "expanded" : ""}`} 
                        key={idx}
                        onClick={() => toggleTech(idx)}
                      >
                        <div className="qna-summary">
                          <div className="qna-question-wrapper">
                            <span className="q-badge">Q{idx + 1}</span>
                            <h4 className="q-text">{item.question}</h4>
                          </div>
                          <svg 
                            className="chevron-icon" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2.5"
                            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>

                        {isExpanded && (
                          <div className="qna-details" onClick={(e) => e.stopPropagation()}>
                            <div className="details-block">
                              <span className="block-header intention-header">INTENTION</span>
                              <p className="block-content">{item.intention}</p>
                            </div>
                            <div className="details-block">
                              <span className="block-header answer-header">MODEL ANSWER</span>
                              <p className="block-content">{item.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Tab: Behavioral questions */}
            {activeTab === "behavioral" && (
              <>
                <header className="pane-header">
                  <h3 className="pane-title">Behavioral Questions</h3>
                  <span className="q-count-badge">{REPORT_DATA.behavioralQuestions.length} questions</span>
                </header>

                <div className="qna-list">
                  {REPORT_DATA.behavioralQuestions.map((item, idx) => {
                    const isExpanded = !!expandedBehavioral[idx];
                    return (
                      <div 
                        className={`qna-card ${isExpanded ? "expanded" : ""}`} 
                        key={idx}
                        onClick={() => toggleBehavioral(idx)}
                      >
                        <div className="qna-summary">
                          <div className="qna-question-wrapper">
                            <span className="q-badge">Q{idx + 1}</span>
                            <h4 className="q-text">{item.question}</h4>
                          </div>
                          <svg 
                            className="chevron-icon" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2.5"
                            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>

                        {isExpanded && (
                          <div className="qna-details" onClick={(e) => e.stopPropagation()}>
                            <div className="details-block">
                              <span className="block-header intention-header">INTENTION</span>
                              <p className="block-content">{item.intention}</p>
                            </div>
                            <div className="details-block">
                              <span className="block-header answer-header">MODEL ANSWER</span>
                              <p className="block-content">{item.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Tab: Road Map */}
            {activeTab === "roadmap" && (
              <>
                <header className="pane-header">
                  <h3 className="pane-title">Road Map Plan</h3>
                </header>

                <div className="roadmap-timeline">
                  {REPORT_DATA.preparationPlan.map((step, idx) => (
                    <div className="timeline-step" key={idx}>
                      <div className="timeline-marker active">
                        {step.day}
                      </div>

                      <div className="timeline-card">
                        <span className="day-num">Day {step.day} Focus Area</span>
                        <h4 className="focus-title">{step.focus}</h4>

                        <div className="tasks-list">
                          {step.tasks.map((task, tIdx) => (
                            <div className="task-item" key={tIdx}>
                              <span className="checkbox-bullet"></span>
                              <p className="task-text">{task}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </section>

          {/* Column 3: Right Sidebar (Match Score & Skill Gaps) */}
          <aside className="right-gaps-pane">
            
            {/* Match Score Indicator Ring */}
            <div className="score-widget">
              <span className="widget-label">MATCH SCORE</span>
              <div className="score-meter">
                <svg className="score-svg" viewBox="0 0 100 100">
                  <circle className="circle-bg" cx="50" cy="50" r={radius} />
                  <circle 
                    className="circle-fill" 
                    cx="50" 
                    cy="50" 
                    r={radius} 
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="score-text-val">
                  {REPORT_DATA.matchScore}
                </div>
              </div>
              <div className="matching-feedback">
                {REPORT_DATA.matchScore >= 80 ? "Strong match for this role" : "Good match for this role"}
              </div>
            </div>

            {/* Severity Rectangular Skill Gap Panels */}
            <div className="gaps-widget">
              <span className="widget-label">SKILL GAPS</span>
              <div className="gaps-badges-stack">
                {REPORT_DATA.skillGaps.map((item, idx) => {
                  let severityClass = "severity-low";
                  if (item.severity === "high") severityClass = "severity-high";
                  else if (item.severity === "medium") severityClass = "severity-medium";

                  return (
                    <div className={`gap-pill ${severityClass}`} key={idx}>
                      {item.skill}
                    </div>
                  );
                })}
              </div>
            </div>

          </aside>

        </div>
      </div>

      {/* External Footer */}
      <footer className="external-footer" style={{ marginTop: "1rem" }}>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#help">Help Center</a>
      </footer>
    </div>
  );
};

export default Interview;
