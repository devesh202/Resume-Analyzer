import axios from "axios"
const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials:true,
})
/**
 * @description Generate interview report on basis of self description and job description, resume pdf
 * @access Private
 * @param {string} jobDescription
 * @param {string} selfDescription
 * @param {File} resumeFile
 * @returns {Promise<Object>}
 */
export const generateInterviewReport = async({jobDescription,selfDescription,resumeFile}) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)
    const response = await api.post("/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}
/**
 * @description Get interview report by id
 * @access Private
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const getInterviewReportById = async(id) => {
    const response = await api.get(`/interview/report/${id}`);
    return response.data;
}
/**
 * @description Get all interview reports for a user
 * @access Private
 * @returns {Promise<Object>}
 */
export const getAllInterviewReports = async() => {
    const response = await api.get(`/interview/report/getAllInterviewReports`);
    return response.data;
}
/**
 * @description Generate and download resume PDF for an interview report
 * @access Private
 * @param {string} interviewId
 * @returns {Promise<Blob>}
 */
export const downloadResumePdf = async(interviewId) => {
    const response = await api.post(`/interview/resume/${interviewId}`, {}, {
        responseType: 'blob',
    });
    return response.data;
}
