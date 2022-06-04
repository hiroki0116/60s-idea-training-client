import { useState, useEffect, createContext } from 'react';
import { IIdeas } from 'types/Ideas';
import { getPreviousSessions } from 'services/exercise'

interface ExerciseContext {
    topicTitle: string;
    setTopicTitle: (title: string) => void;
    ideas: string[];
    setIdeas: (ideas: string[]) => void;
    prevSessions: IIdeas[];
    prevSessionsLoading: boolean;
}

const initialValue = {
    topicTitle: '',
    setTopicTitle: () => {},
    ideas: [],
    setIdeas: () => {},
    prevSessions: [],
    prevSessionsLoading: false
} as ExerciseContext;

export const ExerciseContext = createContext<ExerciseContext>(initialValue);


export const ExerciseProfileProvider = ({ children }) => {
    const [prevSessionsLoading, setPrevSessionsLoading] = useState(false);
    const [topicTitle, setTopicTitle] = useState<string>('');
    const [ideas, setIdeas] = useState<string[]>([])
    const [prevSessions, setPrevSessions] = useState(initialValue.prevSessions);

    useEffect(() => {
        getPrevSessions();
    }, []);
  
    const getPrevSessions = async () => {
        setPrevSessionsLoading(true);
      const result = await getPreviousSessions();
      if (result?.length) setPrevSessions(result);
      setPrevSessionsLoading(false);
    };
  
    const value = {
        topicTitle,
        setTopicTitle,
        ideas,
        setIdeas,
        prevSessions,
        prevSessionsLoading
    };
  
    return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
  };
  
