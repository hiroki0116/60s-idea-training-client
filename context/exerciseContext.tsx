import { useState, useEffect, createContext } from 'react';
import { IIdeas } from 'types/Ideas';
import { getPreviousIdeaRecords } from 'services/exercise'
import { message } from 'antd';

export enum stepEnum {
    firstSection = 0,
    submitSection = 1
}

interface ExerciseContext {
    topicTitle: string;
    setTopicTitle: (title: string) => void;
    ideas: string[];
    setIdeas: (ideas: string[]) => void;
    prevSessions: IIdeas[];
    prevSessionsLoading: boolean;
    showFirstSection: boolean;
    setShowFirstSection: (showFirstSection: boolean) => void;
    showSubmitSection:boolean;
    setShowSubmitSection: (showSubmitSection: boolean) => void;
    handleNext: ()=> void;
    handleBack: ()=> void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    handleSubmit: ()=> void;
}

const initialValue = {
    topicTitle: '',
    setTopicTitle: () => {},
    ideas: [],
    setIdeas: () => {},
    prevSessions: [],
    prevSessionsLoading: false,
    showFirstSection: true,
    setShowFirstSection: () => {},
    showSubmitSection: false,
    setShowSubmitSection: () => {},
    handleNext: () => {},
    handleBack: () => {},
    isPlaying: false,
    setIsPlaying: () => {},
    handleSubmit: () => {}
} as ExerciseContext;

export const ExerciseContext = createContext<ExerciseContext>(initialValue);


export const ExerciseProfileProvider = ({ children }) => {
    const [prevSessionsLoading, setPrevSessionsLoading] = useState(false);
    const [topicTitle, setTopicTitle] = useState<string>('');
    const [ideas, setIdeas] = useState<string[]>([])
    const [prevSessions, setPrevSessions] = useState(initialValue.prevSessions);
    const [showFirstSection, setShowFirstSection] = useState<boolean>(true);
    const [showSubmitSection, setShowSubmitSection] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);


    useEffect(() => {
        getPrevSessions();
    }, []);
    
    const getPrevSessions = async () => {
        setPrevSessionsLoading(true);
      const result = await getPreviousIdeaRecords();
      if (result?.length) setPrevSessions(result);
      setPrevSessionsLoading(false);
    };

    const handleNext = () => {
        setShowFirstSection(false);
        setShowSubmitSection(true);
    }

    const handleBack = () => {
        setShowFirstSection(true);
        setShowSubmitSection(false);
    }

    const handleSubmit = () => {
        clearSteps();
        message.success('Successfully Submitted!')
    }

    const clearSteps = () => {
        setIsPlaying(false);
        setTopicTitle('');
        setIdeas([]);
        handleBack();
    }

    const value = {
        topicTitle,
        setTopicTitle,
        ideas,
        setIdeas,
        prevSessions,
        prevSessionsLoading,
        showFirstSection,
        setShowFirstSection,
        showSubmitSection,
        setShowSubmitSection,
        handleNext,
        handleBack,
        isPlaying,
        setIsPlaying,
        handleSubmit
    };
  
    return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
  };
  
