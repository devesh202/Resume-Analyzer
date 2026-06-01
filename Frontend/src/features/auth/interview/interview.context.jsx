
import { createContext } from "react";
import { useState } from "react";
const InterviewContext = createContext()
export const InterviewProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [report,setReport] = useState(null)
    const [reports,setReports] = useState(null)

    // generate interview report function
    
    return (
        <InterviewContext.Provider value={{loading, report,setLoading,setReport, reports}}>
            {children}
        </InterviewContext.Provider>
    )
}
