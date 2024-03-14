import NumberInput from "./NumberInput";
import TimeInput from "./TimeInput";
import type { Time } from "./typs";

type Props = {
	set: number;
	setSet: React.Dispatch<React.SetStateAction<number>>;
	work: Time;
	setWork: React.Dispatch<React.SetStateAction<Time>>;
	rest: Time;
	setRest: React.Dispatch<React.SetStateAction<Time>>;
	start: () => void;
};

function Form({ set, setSet, work, setWork, rest, setRest, start }: Props) {
	return (
		<div>
			<NumberInput label="Sets" value={set} setValue={setSet} />
			<TimeInput label="Work" time={work} setTime={setWork} />
			<TimeInput label="Rest" time={rest} setTime={setRest} />
			<button type="button" onClick={start}>
				Start
			</button>
		</div>
	);
}

export default Form;
