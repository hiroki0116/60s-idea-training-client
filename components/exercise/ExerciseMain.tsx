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
    <div className="flex flex-col sm:grid sm:grid-cols-5 sm:gap-8 w-full">
        <div className="sm:col-span-3 flex flex-col bg-white p-5 rounded-xl shadow-lg">
            <motion.div
                initial='initial'
                animate='animate'
                variants={fadeInRight}
            >
                <Steps current={showFirstSection ? stepEnum.firstSection : stepEnum.submitSection} style={{flexDirection: "row"}}>
                    <Step title={showFirstSection ? "Step 1" : "Completed"} description={<div className={`text-xs sm:text-center p-2 rounded-lg ${showFirstSection && 'bg-yellow-50 font-bold'}`}>Choose your topic and category!</div>} status={showFirstSection ? 'process' : 'finish'} onClick={handleBack} className='cursor-pointer'/>
                    <Step title={showSubmitSection ? 'In Process' : 'Step 2'} description={<div className={`text-xs sm:text-center p-2 rounded-lg ${showSubmitSection && 'bg-yellow-50 font-bold'}`}>Elaborate your ideas!</div>} status={showSubmitSection ? 'process' : 'wait'} />
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