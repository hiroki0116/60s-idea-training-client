import { API } from 'utils/api';


export const getTotalSessionsAndIdeas = async () => {
    try {
        const {data} = await API.get(`/ideas/ideas-sessions-count`,{errorHandle: false});
        return data.totalIdeasAndSessions[0];
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export const getTodaySessionsIdeas = async () => {
    try {
        const {data} = await API.get('/ideas/today-count', {errorHandle: false});
        return data.todayTotal[0];
    } catch (error) {
        return { success: false, message: error.message };      
    }
}

export const getWeeklyRecords = async () => {
    try {
        const {data} = await API.get('/ideas/weekly-records', {errorHandle: false});
        return data;
    } catch (error:any) {
        return { success:false, message: error.message}
    }
}

export const getConsecutiveDays = async () => {
    try{
        
    }catch(error:any){

    }
}