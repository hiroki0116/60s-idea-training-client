import { useContext } from 'react';
import {ExerciseContext, stepEnum} from 'context/exerciseContext';
import { Steps } from 'antd';
import { motion } from 'framer-motion';
import { fadeInRight } from 'utils/animations';

const SubmitSection = () => {
    const { showSubmitSection } = useContext(ExerciseContext);
    const { Step } = Steps;


  return (
    showSubmitSection ? (
<          ></>
      ) : null
  )
}
export default SubmitSection