import { useState, useEffect, createContext } from 'react';
import { IIdeas } from 'types/Ideas';
import { GET_MOST_RECENT_IDEA_RECORDS } from 'graphql/queries/ideaRecord';
import { useMutation, useLazyQuery } from '@apollo/client';
import { message } from 'antd';
import { APIWithoutAuth } from 'utils/api';
import { handleSubmitIdeas } from 'services/exercise'

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
    contextLoading: boolean;
    setContextLoading: (contextLoading:boolean)=> void;
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
    contextLoading: false,
    setContextLoading: () => {}
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
    const [contextLoading, setContextLoading] = useState<boolean>(false);
    const [ getMostRecentIdeaRecords, { 
        data: mostRecentIdeaRecords, 
        loading: loadingPrevSessions, 
        error: loadingPrevSessionsError }] = useLazyQuery(GET_MOST_RECENT_IDEA_RECORDS, { errorPolicy: 'all' });

    useEffect(() => {
        getMostRecentIdeaRecords();
    }, []);

    useEffect(()=> {
        if(mostRecentIdeaRecords) {
            setPrevSessions(mostRecentIdeaRecords?.getMostRecentIdeaRecords);
        }else {
            setPrevSessions([])
        }
    },[mostRecentIdeaRecords])
    
    const handleNext = () => {
        setShowFirstSection(false);
        setShowSubmitSection(true);
    }

    const handleBack = () => {
        setShowFirstSection(true);
        setShowSubmitSection(false);
    }

    const handleSubmit = async () => {
        try {
            setContextLoading(true);
            const {newSession} = await handleSubmitIdeas(topicTitle,ideas,category);
            setPrevSessions([newSession,...prevSessions])
            setContextLoading(false);
            message.success('Successfully Saved!')
        } catch (error:any) {
            await APIWithoutAuth.post('/error-message',{clientError:error.message}, { errorHandle: false});
            setContextLoading(false);
            message.error(error.message)
        } finally {
            clearSteps();
        }
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
        loadingPrevSessions,
        showFirstSection,
        setShowFirstSection,
        showSubmitSection,
        setShowSubmitSection,
        handleNext,
        handleBack,
        isPlaying,
        setIsPlaying,
        handleSubmit,
        contextLoading,
        setContextLoading
    };
  
    return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
  };
  
