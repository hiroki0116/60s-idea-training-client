import { useContext } from 'react';
import {ExerciseContext} from 'context/exerciseContext';
import PreviousIdeaRecords from "./PreviousIdeaRecords"
import FirstSection from "./FirstSection";
import SubmitSection from "./SubmitSection";
import { motion } from 'framer-motion';
import { fadeInRight } from 'utils/animations';
import { stepEnum } from 'context/exerciseContext';
import { Steps } from 'antd';

const { Step } = Steps;

const ExerciseMain = () => {
    const { showFirstSection, showSubmitSection } = useContext(ExerciseContext);

  return (
    <div className="flex flex-col sm:grid grid-cols-5 gap-4">
        <div className="sm:col-span-3 flex flex-col h-screen overflow-auto mx-5">
            <motion.div
                initial='initial'
                animate='animate'
                variants={fadeInRight}
            >
                <Steps current={showFirstSection ? stepEnum.firstSection : stepEnum.submitSection} >
                    <Step title="Step 1" description="What's your topic?" status={!showSubmitSection ? 'finish' : 'process'} />
                    <Step title="Step 2" description="Elaborate your ideas" />
                </Steps>
            </motion.div>
            <FirstSection />
            <SubmitSection />
        </div>
        <div className="sm:col-span-2 flex flex-col h-screen overflow-auto">
            <PreviousIdeaRecords />
        </div>
    </div>
  )
}

export default ExerciseMain