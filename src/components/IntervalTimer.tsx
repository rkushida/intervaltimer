import { useState } from "react";
import Timer from "./Timer";
import Form from "./Form";
import { initialSet, initialWork, initialRest } from "../constants";

function IntervalTimer() {
  const [set, setSet] = useState(String(initialSet));
  const [work, setWork] = useState(String(initialWork));
  const [rest, setRest] = useState(String(initialRest));
  const [key, setKey] = useState(Date.now());
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => {
    setIsActive(() => !isActive);
  };

  const updateKey = () => {
    setKey(Date.now());
  };

  return (
    <div>
      {isActive ? (
        <Timer
          key={key}
          set={Number(set)}
          work={Number(work) * 1000}
          rest={Number(rest) * 1000}
          reset={toggleIsActive}
          restart={updateKey}
        />
      ) : (
        <Form
          set={set}
          setSet={setSet}
          work={work}
          setWork={setWork}
          rest={rest}
          setRest={setRest}
          start={toggleIsActive}
        />
      )}
    </div>
  );
}

export default IntervalTimer;
