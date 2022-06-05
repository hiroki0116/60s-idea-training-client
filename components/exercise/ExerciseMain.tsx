import PreviousIdeaRecords from "./PreviousIdeaRecords"
import FirstSection from "./FirstSection";
import SubmitSection from "./SubmitSection";

const ExerciseMain = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-5">
        <div className="sm:col-span-3 flex flex-col gap-2 h-screen overflow-auto">
            <FirstSection />
            <SubmitSection />
        </div>
        <div className="sm:col-span-2 flex flex-col gap-2 h-screen overflow-auto">
            <PreviousIdeaRecords />
        </div>
    </div>
  )
}

export default ExerciseMain