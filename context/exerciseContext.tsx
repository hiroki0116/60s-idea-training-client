import { useState, useEffect, createContext } from 'react';
import { IIdeas } from 'types/Ideas';
import message from 'antd/lib/message';
import { API } from 'utils/api';

export enum stepEnum {
    firstSection = 0,
    submitSection = 1
}

interface ExerciseContext {
    topicTitle: string;
    setTopicTitle: (title: string) => void;
    category: string;
    setCategory: (category: string) => void;
    ideas: string[];
    setIdeas: (ideas: string[]) => void;
    prevSessions: IIdeas[];
    loadingPrevSessions: boolean;
    showFirstSection: boolean;
    setShowFirstSection: (showFirstSection: boolean) => void;
    showSubmitSection:boolean;
    setShowSubmitSection: (showSubmitSection: boolean) => void;
    handleNext: ()=> void;
    handleBack: ()=> void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    handleSubmit: ()=> void;
    createLoading: boolean;
}

const initialValue = {
    topicTitle: '',
    setTopicTitle: () => {},
    category: '',
    setCategory: () => {},
    ideas: [],
    setIdeas: () => {},
    prevSessions: [],
    loadingPrevSessions: false,
    showFirstSection: true,
    setShowFirstSection: () => {},
    showSubmitSection: false,
    setShowSubmitSection: () => {},
    handleNext: () => {},
    handleBack: () => {},
    isPlaying: false,
    setIsPlaying: () => {},
    handleSubmit: () => {},
    createLoading: false,
} as ExerciseContext;

export const ExerciseContext = createContext<ExerciseContext>(initialValue);


export const ExerciseProfileProvider = ({ children }) => {
    const [prevSessions, setPrevSessions] = useState<IIdeas[]>([]);
    const [topicTitle, setTopicTitle] = useState<string | undefined>('');
    const [category, setCategory] = useState<string>('');
    const [ideas, setIdeas] = useState<string[]>([])
    const [showFirstSection, setShowFirstSection] = useState<boolean>(true);
    const [showSubmitSection, setShowSubmitSection] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [createLoading, setCreateLoading] = useState<boolean>(false);

    useEffect(() => {
        getMostRecentIdeaRecords();
        // eslint-disable-next-line
    }, []);
    
    const handleNext = () => {
        setShowFirstSection(false);
        setShowSubmitSection(true);
    }

    const handleBack = () => {
        setShowFirstSection(true);
        setShowSubmitSection(false);
    }

    const handleSubmit = async() => {
        try {
            setCreateLoading(true)
            const response = await API.post('/ideas/', {
                topicTitle: topicTitle,
                ideas: ideas,
                category,
            })
            if (response.data.success){
                message.success('New ideas created!')
                setPrevSessions([response.data.data, ...prevSessions])
                clearSteps();
            }
        } catch (error: any) {
            message.error(error.message)
        } finally {
            setCreateLoading(false)
        }
    }

    const getMostRecentIdeaRecords = async () => {
        setLoading(true);
        const response = await API.get("/ideas/recent")
        setPrevSessions(response.data.data);
        setLoading(false);
    }

    const clearSteps = () => {
        setIsPlaying(false);
        setTopicTitle('');
        setCategory('');
        setIdeas([]);
        handleBack();
    }

    const value = {
        topicTitle,
        setTopicTitle,
        category,
        setCategory,
        ideas,
        setIdeas,
        prevSessions,
        // loadingPrevSessions:getMostRecentIdeaRecordsRes?.loading,
        loadingPrevSessions: loading,
        showFirstSection,
        setShowFirstSection,
        showSubmitSection,
        setShowSubmitSection,
        handleNext,
        handleBack,
        isPlaying,
        setIsPlaying,
        handleSubmit,
        createLoading,
    };
  
    return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
  };
  
