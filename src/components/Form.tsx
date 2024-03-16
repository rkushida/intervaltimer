import NumberInput from "./NumberField";
import TimeInput from "./TimeField";

type Props = {
  set: string;
  setSet: React.Dispatch<React.SetStateAction<string>>;
  work: string;
  setWork: React.Dispatch<React.SetStateAction<string>>;
  rest: string;
  setRest: React.Dispatch<React.SetStateAction<string>>;
  start: () => void;
};

function Form({ set, setSet, work, setWork, rest, setRest, start }: Props) {
  return (
    <div>
      <NumberInput
        label="Sets"
        value={set}
        setValue={setSet}
        min={1}
        max={999}
      />
      <TimeInput
        label="Work"
        time={work}
        setTime={setWork}
        min={1}
        max={60 * 99 + 59}
      />
      <TimeInput
        label="Rest"
        time={rest}
        setTime={setRest}
        min={0}
        max={99 * 60 + 59}
      />
      <button type="button" onClick={start}>
        Start
      </button>
    </div>
  );
}

export default Form;
