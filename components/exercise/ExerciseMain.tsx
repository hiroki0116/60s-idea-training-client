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
    const { showFirstSection, showSubmitSection, handleBack } = useContext(ExerciseContext);

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-5 gap-8 w-full">
        <div className="sm:col-span-3 flex flex-col bg-white p-5 rounded-xl shadow-lg dark:bg-slate-800">
            <motion.div
                initial='initial'
                animate='animate'
                variants={fadeInRight}
            >
                <Steps current={showFirstSection ? stepEnum.firstSection : stepEnum.submitSection} style={{flexDirection: "row"}}>
                    <Step title={<div className='dark:text-green-400'>{showFirstSection ? 'Step 1' : 'Completed'}</div>} description={<div className={`text-xs sm:text-center p-2 rounded-lg ${showFirstSection && 'bg-yellow-50 font-bold dark:text-green-500 dark:bg-slate-900'}`}>Choose your topic and category!</div>} status={showFirstSection ? 'process' : 'finish'} onClick={handleBack} className='cursor-pointer'/>
                    <Step title={<div className='dark:text-green-400'>{showSubmitSection ? 'In Process' : 'Step 2'}</div>} description={<div className={`text-xs sm:text-center p-2 rounded-lg ${showSubmitSection && 'bg-yellow-50 font-bold dark:text-green-500 dark:bg-slate-900'}`}>Elaborate <br/>your ideas!</div>} status={showSubmitSection ? 'process' : 'wait'} />
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