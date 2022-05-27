import { API } from 'utils/api';


export const getTotalSessionsAndIdeas = async () => {
    try {
        const {data} = await API.get(`/ideas/ideas-sessions-count`,{errorHandle: false});
        return data.totalIdeasAndSessions[0];
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

