import { useState, useEffect, createContext } from 'react';
import { IIdeas } from 'types/Ideas';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GET_MOST_RECENT_IDEA_RECORDS } from 'graphql/queries/ideaRecord';
import { CREATE_NEW_IDEA_RECORD } from 'graphql/mutations/ideaRecord';
import { message } from 'antd';

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
    const [ getMostRecentIdeaRecords, getMostRecentIdeaRecordsRes] = useLazyQuery(GET_MOST_RECENT_IDEA_RECORDS, { errorPolicy: 'all' });

    const [createNewIdeaRecord, {
        data: createdRes,
        loading: createLoading,
        error: createdError }] = useMutation(CREATE_NEW_IDEA_RECORD)

    useEffect(() => {
        getMostRecentIdeaRecords();
        // eslint-disable-next-line
    }, []);

    useEffect(()=> {
        setPrevSessions(getMostRecentIdeaRecordsRes?.data?.getMostRecentIdeaRecords);
    },[getMostRecentIdeaRecordsRes?.data?.getMostRecentIdeaRecords]);

    useEffect(() => {
        if (createdRes?.createNewIdeaRecord?._id){
            setPrevSessions([createdRes.createNewIdeaRecord,...prevSessions])
            clearSteps();
        }
        if(createdError) message.error(`Failed to create new idea record. ${createdError.message}`);
        // eslint-disable-next-line
      }, [createdRes, createdError]);
    
    const handleNext = () => {
        setShowFirstSection(false);
        setShowSubmitSection(true);
    }

    const handleBack = () => {
        setShowFirstSection(true);
        setShowSubmitSection(false);
    }

    const handleSubmit = () => {
        createNewIdeaRecord({ variables: {
            topicTitle,
            category,
            ideas
        }});
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
        loadingPrevSessions:getMostRecentIdeaRecordsRes?.data?.loading,
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
  
