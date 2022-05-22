import { useState } from 'react';
import CountDownTimer from './CountDownTimer';
const ExerciseMain = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlay = () => {setIsPlaying(true)};
    const handleReset = () => {setIsPlaying(false)};



  return (
        <>
            <CountDownTimer isPlaying={isPlaying} />
        
        </>
  )
}

export default ExerciseMain