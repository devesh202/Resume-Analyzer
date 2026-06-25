import React, { useState } from "react";
import "../style/interview.scss";
import { useNavigate, useParams } from "react-router";
import { useInterview } from "../hooks/useInterview";
import { useAuth } from "../../auth/hooks/useAuth";


const Interview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("technical");
  
  const [expandedTech, setExpandedTech] = useState({ 0: true });
  const [expandedBehavioral, setExpandedBehavioral] = useState({ 0: true });

  const {report, loading, downloadResume} = useInterview(id);
  const {user} = useAuth();

  const [resumeLoading, setResumeLoading] = useState(false);

  const handleGenerateResume = async () => {
    setResumeLoading(true);
    try {
      const response = await downloadResume(id);
      if (response.success) {
        // success - file download triggered
      }
    } catch {
      // handled in hook
    } finally {
      setResumeLoading(false);
    }
  };

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

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    )
  }

  if (!report) {
    return (
      <main className="loading-screen">
        <h1>No report data available.</h1>
      </main>
    )
  }

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (report.matchScore / 100) * circumference;

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
          <div className="user-avatar">{user?.username?.charAt(0)?.toUpperCase() || '?'}</div>
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

            <div className="sidebar-tabs-spacer" />

            <button
              onClick={handleGenerateResume}
              disabled={resumeLoading}
              className="sidebar-resume-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="18" height="18">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {resumeLoading ? "Generating..." : "Generate Resume"}
            </button>
          </aside>

          {/* Column 2: Center main content details panels */}
          <section className="main-content-pane">
            
            {/* Tab: Technical questions */}
            {activeTab === "technical" && (
              <>
                <header className="pane-header">
                  <h3 className="pane-title">Technical Questions</h3>
                  <span className="q-count-badge">{report.technicalQuestions.length} questions</span>
                </header>

                <div className="qna-list">
                  {report.technicalQuestions.map((item, idx) => {
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
                  <span className="q-count-badge">{report.behavioralQuestions.length} questions</span>
                </header>

                <div className="qna-list">
                  {report.behavioralQuestions.map((item, idx) => {
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
                  {report.preparationPlan.map((step, idx) => (
                    <div className={`tracking-step ${idx === 0 ? "active" : ""}`} key={idx}>
                      <div className="tracking-connector">
                        <div className="tracking-dot">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        {idx < report.preparationPlan.length - 1 && <div className="tracking-line" />}
                      </div>
                      <div className="tracking-card">
                        <span className="tracking-day">Day {step.day}</span>
                        <h4 className="tracking-focus">{step.focus}</h4>
                        <div className="tracking-tasks">
                          {step.tasks.map((task, tIdx) => (
                            <div className="tracking-task" key={tIdx}>
                              <span className="tracking-bullet" />
                              <span>{task}</span>
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
                  {report.matchScore}
                </div>
              </div>
              <div className="matching-feedback">
                {report.matchScore >= 80 ? "Strong match for this role" : "Good match for this role"}
              </div>
            </div>

            {/* Severity Rectangular Skill Gap Panels */}
            <div className="gaps-widget">
              <span className="widget-label">SKILL GAPS</span>
              <div className="gaps-badges-stack">
                {report.skillGaps.map((item, idx) => {
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
