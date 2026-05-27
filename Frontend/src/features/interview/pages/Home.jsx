import React from 'react'
import "../style/home.scss";

const Home = () => {
    return (
        <main className='home'>
            <div className="interview-input-grp">
                <div className="left">
                <textarea name="jobDescription" id="" placeholder="Job Description"></textarea>

            </div>

            <div className="right">

                <label htmlFor="resume">Upload Resume</label>
                <input type="file" name="resume" id="resume" accept=".pdf,.doc,.docx" />

                <div className="input-group">
                <label htmlFor="selfDescription">Self Description</label>
                <textarea name="selfDescription" id="selfDescription" placeholder="Describe yourself"></textarea>
            </div>

            <button className="generate-btn">Generate Interview Report</button>
            </div>
            </div>
            

            
        </main>
    )
}

export default Home
