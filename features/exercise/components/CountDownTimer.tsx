import { useContext } from "react";
import { ExerciseContext } from "features/exercise/stores/context/exerciseContext";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CountDownTimer = () => {
  const { isPlaying, handleSubmit } = useContext(ExerciseContext);

  const renderTimeLeft = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="text-16 font-bold">Time out ...</div>;
    }

    return (
      <div className="text-center h-22 p-2">
        <div className="font-bold text-3xl">{remainingTime}</div>
        <div>seconds</div>
      </div>
    );
  };

  return (
    <>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={60}
        colors={["#0a2339", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
        size={150}
        onComplete={handleSubmit}
      >
        {renderTimeLeft}
      </CountdownCircleTimer>
    </>
  );
};

export default CountDownTimer;
