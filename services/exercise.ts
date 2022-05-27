import { API } from 'utils/api';

export const handleSubmitIdeas = async (topicTitle: string,ideas:string[]) => {
    try {
        const res = await API.post('/ideas',{topicTitle,ideas});
        return { success: res.data.success, ideas: res.data.ideaRecord };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

