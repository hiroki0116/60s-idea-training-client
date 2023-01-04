import { API } from 'utils/api';



export const getTotalSessionsAndIdeas = async () => {
    try {
        const {data} = await API.get(`/ideas/total/all`, {errorHandle: false});
        return data.data[0];
    } catch (error: any) {
        return { success:false, message: error.message};
    }
}

export const getTodaySessionsIdeas = async () => {
    try {
        const {data} = await API.get('/ideas/total/today', {errorHandle: false});
        return data.data[0];
    } catch (error:any) {
        return { success:false, message: error.message};   
    }
}

export const getWeeklyRecords = async () => {
    try {
        const {data} = await API.get('/ideas/weekly', {errorHandle: false});
        return data;
    } catch (error:any) {
        return { success:false, message: error.message}
    }
}

export const getConsecutiveDays = async () => {
    try{
        const { data } = await API.get('/ideas/total/consecutive', { errorHandle: false});
        return data.data;
    }catch(error:any){
        return { success: false, message: error.message} 
    }
}