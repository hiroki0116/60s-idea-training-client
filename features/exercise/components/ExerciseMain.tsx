import { useContext } from "react";
import dynamic from "next/dynamic";
// components
const PreviousIdeaRecords = dynamic(() => import("./PreviousIdeaRecords"));
import FirstSection from "./FirstSection";
import SubmitSection from "./SubmitSection";
import { ExerciseContext } from "features/exercise/stores/context/exerciseContext";
import { stepEnum } from "features/exercise/stores/context/exerciseContext";
// third parties
import { motion } from "framer-motion";
import Steps from "antd/lib/steps";
// utils
import { fadeInRight } from "utils/animations";

const ExerciseMain = () => {
  const { currentStep, setCurrentStep } = useContext(ExerciseContext);

  const items = [
    {
      title: (
        <div className="dark:text-green-400">
          {currentStep === stepEnum.firstSection ? "Step 1" : "Completed"}
        </div>
      ),
      description: "Choose your topic and category!",
    },
    {
      title: (
        <div className="dark:text-green-400">
          {currentStep === stepEnum.submitSection ? "In Process" : "Step 2"}
        </div>
      ),
      description: (
        <div
          className={`text-xs sm:text-center p-2 rounded-lg ${
            currentStep === stepEnum.submitSection &&
            "bg-yellow-50 font-bold dark:text-green-500 dark:bg-slate-900"
          }`}
        >
          Elaborate <br />
          your ideas!
        </div>
      ),
      disabled: true,
    },
  ];

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 gap-8 w-full">
      <div className="md:col-span-3 flex flex-col bg-white p-5 rounded-xl shadow-lg dark:bg-slate-800">
        <motion.div initial="initial" animate="animate" variants={fadeInRight}>
          <Steps
            onChange={(value) => {
              setCurrentStep(value);
            }}
            current={currentStep}
            items={items}
          />

          {currentStep === stepEnum.firstSection ? (
            <FirstSection />
          ) : currentStep === stepEnum.submitSection ? (
            <SubmitSection />
          ) : null}
        </motion.div>
      </div>
      <div className="md:col-span-2 flex flex-col overflow-auto">
        <PreviousIdeaRecords />
      </div>
    </div>
  );
};

export default ExerciseMain;
