import { useContext } from 'react';
import {ExerciseContext} from 'context/exerciseContext';

const FirstSection = () => {
    const { showFirstSection } = useContext(ExerciseContext);
  return (
    showFirstSection ? (
        <>
            
        </>
      ) : null
  )
}

export default FirstSection