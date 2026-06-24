import React, { useRef, useState } from 'react';
import { useInterview } from '../hooks/useInterview';
import "../style/home.scss";
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import { toast } from "react-toastify";

const Home = () => {
    const {generateReport,loading,reports } = useInterview();
    const [selfDescription,setSelfDescription] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const resumeInputRef = useRef(null);
    const navigate = useNavigate()
    const {user} = useAuth();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleRemoveFile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFile(null);
        if (resumeInputRef.current) {
            resumeInputRef.current.value = "";
        }
    };

    const handleGenerateReport = async () => {
        const response = await generateReport({jobDescription: jobDesc,selfDescription,resumeFile: selectedFile});
        if(response.success){
            toast.success(response.message) 
            navigate(`/interview/result/${response.data._id}`)
        }else{
            toast.error(response.message)
        }
    };

    if(loading){
        return(
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

   

    return (
        <div className="app-container">
            {/* Top Navbar */}
            <nav className="navbar">
                <div className="nav-left">
                    <span className="logo">Career<span className="logo-accent">AI</span>Pro</span>
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

            {/* Main Area */}
            <main className="home">
                {/* Hero Headers */}
                <header className="home-header">
                    <h1 className="glowing-title">
                        Create Your Custom <span className="title-red">Interview Plan</span>
                    </h1>
                    <p className="subtitle">
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </header>

                {/* Main Card Container */}
                <div className="interview-card">
                    <div className="interview-input-grp">
                        
                        {/* Left Column: Target Job Description */}
                        <div className="left">
                            <div className="section-title-wrapper">
                                <div className="title-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="section-icon text-red">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <h2 className="section-title">Target Job Description</h2>
                                </div>
                                <span className="tag tag-required">REQUIRED</span>
                            </div>

                            <div className="textarea-container">
                                <textarea 
                                    onChange={(e)=>setJobDesc(e.target.value)}
                                    name="jobDescription" 
                                    placeholder="Paste the full job description here...&#10;e.g., 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                                    value={jobDesc}
                                    maxLength={5000}
                                ></textarea>
                                <span className="char-counter">{jobDesc.length} / 5000 chars</span>
                            </div>
                        </div>

                        {/* Right Column: Your Profile */}
                        <div className="right">
                            <div className="section-title-wrapper">
                                <div className="title-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="section-icon text-gray">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                    <h2 className="section-title">Your Profile</h2>
                                </div>
                            </div>

                            {/* Group 1: Upload Resume */}
                            <div className="sub-group">
                                <div className="sub-group-header">
                                    <span className="sub-title">Upload Resume</span>
                                    <span className="tag tag-best">BEST RESULTS</span>
                                </div>
                                {!selectedFile ? (
                                    <label htmlFor="resume" className="file-upload-zone">
                                        <div className="upload-icon-container">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="upload-cloud-icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                            </svg>
                                        </div>
                                        <span className="upload-text-primary">Click to upload or drag & drop</span>
                                        <span className="upload-text-secondary">PDF or DOCX (Max 5MB)</span>
                                    </label>
                                ) : (
                                    <div className="file-uploaded-view">
                                        <div className="file-info-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file-icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg>
                                            <div className="file-details">
                                                <span className="file-name">{selectedFile.name}</span>
                                                <span className="file-size">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                                            </div>
                                        </div>
                                        <button onClick={handleRemoveFile} className="remove-file-btn" aria-label="Remove file">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="close-icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                <input onChange={handleFileChange} ref={resumeInputRef} type="file" name="resume" id="resume" accept=".pdf,.doc,.docx" className="hidden-file-input" />
                            </div>

                            {/* OR Separator */}
                            <div className="or-separator">
                                <span className="or-line"></span>
                                <span className="or-text">OR</span>
                                <span className="or-line"></span>
                            </div>

                            {/* Group 2: Quick Self-Description */}
                            <div className="sub-group">
                                <label htmlFor="selfDescription" className="sub-title block-label">Quick Self-Description</label>
                                <div className="textarea-container-short">
                                    <textarea 
                                        onChange={(e)=>setSelfDescription(e.target.value)}
                                        name="selfDescription" 
                                        id="selfDescription" 
                                        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Info Banner Alert */}
                            <div className="info-banner">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="info-icon">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <p className="info-text">
                                    Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Card Footer */}
                    <footer className="card-footer">
                        <span className="footer-generation-info">AI-Powered Strategy Generation • Approx 30s</span>
                        <button onClick={handleGenerateReport} disabled={loading} className="generate-btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="star-icon">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                            Generate My Interview Strategy
                        </button>
                    </footer>
                </div>

                {/* all reports */}
                <div className="reports-section">
                    <div className="reports-header">
                        <h2>Past Reports</h2>
                        <span className="reports-count">{reports.length} report{reports.length !== 1 ? 's' : ''}</span>
                    </div>
                    {reports.length === 0 ? (
                        <div className="reports-empty">
                            <p>No reports yet. Generate your first interview strategy above!</p>
                        </div>
                    ) : (
                        <div className="reports-grid">
                            {reports.map((report) => (
                                <div key={report._id} onClick={()=>navigate(`/interview/result/${report._id}`)} className="report-card">
                                    <div className="report-card-top">
                                        <div className="report-score" style={{
                                            background: report.matchScore >= 70
                                                ? 'conic-gradient(#22c55e 0deg, #22c55e ' + (report.matchScore * 3.6) + 'deg, rgba(255,255,255,0.06) ' + (report.matchScore * 3.6) + 'deg)'
                                                : report.matchScore >= 40
                                                ? 'conic-gradient(#eab308 0deg, #eab308 ' + (report.matchScore * 3.6) + 'deg, rgba(255,255,255,0.06) ' + (report.matchScore * 3.6) + 'deg)'
                                                : 'conic-gradient(#ef4444 0deg, #ef4444 ' + (report.matchScore * 3.6) + 'deg, rgba(255,255,255,0.06) ' + (report.matchScore * 3.6) + 'deg)'
                                        }}>
                                            <div className="report-score-inner">
                                                <span className="report-score-value">{report.matchScore}</span>
                                                <span className="report-score-label">match</span>
                                            </div>
                                        </div>
                                        <div className="report-card-info">
                                            <h3 className="report-title">{report.title}</h3>
                                            <p className="report-date">{new Date(report.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <div className="report-card-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="18" height="18">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom External Links Footer */}
                <footer className="external-footer">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                    <a href="#help">Help Center</a>
                </footer>
            </main>
        </div>
    );
};

export default Home;
