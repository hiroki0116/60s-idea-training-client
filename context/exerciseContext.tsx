import { useState, useEffect, createContext } from 'react';
import { IIdeas } from 'types/Ideas';
import { getPreviousIdeaRecords } from 'services/exercise'

interface ExerciseContext {
    topicTitle: string;
    setTopicTitle: (title: string) => void;
    ideas: string[];
    setIdeas: (ideas: string[]) => void;
    prevSessions: IIdeas[];
    prevSessionsLoading: boolean;
    showFirstSection: boolean;
    showSubmitSection:boolean;
}

const initialValue = {
    topicTitle: '',
    setTopicTitle: () => {},
    ideas: [],
    setIdeas: () => {},
    prevSessions: [],
    prevSessionsLoading: false,
    showFirstSection: true,
    showSubmitSection: false
} as ExerciseContext;

export const ExerciseContext = createContext<ExerciseContext>(initialValue);


export const ExerciseProfileProvider = ({ children }) => {
    const [prevSessionsLoading, setPrevSessionsLoading] = useState(false);
    const [topicTitle, setTopicTitle] = useState<string>('');
    const [ideas, setIdeas] = useState<string[]>([])
    const [prevSessions, setPrevSessions] = useState(initialValue.prevSessions);
    const [showFirstSection, setShowFirstSection] = useState<boolean>(true);
    const [showSubmitSection, setShowSubmitSection] = useState<boolean>(false);

    useEffect(() => {
        getPrevSessions();
    }, []);
  
    const getPrevSessions = async () => {
        setPrevSessionsLoading(true);
      const result = await getPreviousIdeaRecords();
      if (result?.length) setPrevSessions(result);
      setPrevSessionsLoading(false);
    };
  
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
        setShowSubmitSection
    };
  
    return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
  };
  
