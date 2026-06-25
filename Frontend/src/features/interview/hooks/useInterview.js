import {getAllInterviewReports, getInterviewReportById, generateInterviewReport, downloadResumePdf} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = (id) => {
    const context = useContext(InterviewContext);
    if(!context){
        throw new Error("useInterview must be used within InterviewProvider");
    }
    const {loading, setLoading, report, setReport, setReports, reports} = context;

    useEffect(() => {
        if (id && (!report || report._id !== id)) {
            getReportById(id)
        }
        else{
            getAllReports()
        }
    }, [id])
    const generateReport = async({jobDescription,selfDescription, resumeFile}) => {
        setLoading(true)
        try{
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile,
            });
            setReport(response.data);
            return response;
        }catch(err){
            return err.response.data;
        }
        finally {
            setLoading(false)
        }
    }

    const getAllReports = async() => {
        setLoading(true)
        try{
            const response = await getAllInterviewReports();
            setReports(response.data);
            return response;
        }catch(err){
            return err.response.data;
        }finally {
            setLoading(false)
        }
    }
    const getReportById = async(id) => {
        setLoading(true)
        try{
            const response = await getInterviewReportById(id);
            setReport(response.data);
            return response;
        }catch(err){
            return err.response.data;
        }finally {
            setLoading(false)
        }
    }

    const downloadResume = async(interviewId) => {
        setLoading(true)
        try{
            const blob = await downloadResumePdf(interviewId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resume-${interviewId}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            return { success: true };
        }catch(err){
            return err.response?.data || { success: false, message: "Failed to generate resume" };
        }finally {
            setLoading(false)
        }
    }
    return {
        generateReport,
        getAllReports,
        getReportById,
        downloadResume,
        loading,
        report,
        reports,
    }
}
// generate report

// get all reports

// get report by id