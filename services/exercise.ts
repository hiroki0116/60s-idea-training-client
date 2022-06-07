import { API } from 'utils/api';

export const handleSubmitIdeas = async (topicTitle: string,ideas:string[]) => {
    try {
        const res = await API.post('/ideas',{topicTitle,ideas});
        return { success: res.data.success, newSession: res.data.ideaRecord };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export const getPreviousIdeaRecords = async () => {
    try {
        const res = await API.get('/ideas/most-recent', {errorHandle:false});
        return res.data.prevSessions;
    } catch (error: any) {
        return {success: false, message: error.message}
    }
}