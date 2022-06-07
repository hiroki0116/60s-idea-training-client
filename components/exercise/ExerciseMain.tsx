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
    const { showFirstSection, showSubmitSection,handleBack } = useContext(ExerciseContext);

  return (
    <div className="flex flex-col sm:grid grid-cols-5 gap-4">
        <div className="sm:col-span-3 flex flex-col mx-5 bg-white p-5 rounded-lg shadow-lg">
            <motion.div
                initial='initial'
                animate='animate'
                variants={fadeInRight}
            >
                <Steps current={showFirstSection ? stepEnum.firstSection : stepEnum.submitSection} >
                    <Step title={showFirstSection ? "Step 1" : "Completed"} description="What's your topic?" status={showFirstSection ? 'process' : 'finish'} onClick={handleBack} className='cursor-pointer'/>
                    <Step title={showSubmitSection ? 'In Process' : 'Step 2'} description="Elaborate your ideas!" status={showSubmitSection ? 'process' : 'wait'} />
                </Steps>
                <FirstSection />
                <SubmitSection />
            </motion.div>
        </div>
        <div className="sm:col-span-2 flex flex-col overflow-auto">
            <PreviousIdeaRecords />
        </div>
    </div>
  )
}

export default ExerciseMain