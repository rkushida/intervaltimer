import NumberInput from "./NumberInput";
import TimeInput from "./TimeInput";

type Props = {
	set: number;
	work: number;
	rest: number;
	setSet: React.Dispatch<React.SetStateAction<number>>;
	setWork: React.Dispatch<React.SetStateAction<number>>;
	setRest: React.Dispatch<React.SetStateAction<number>>;
	start: () => void;
};

function Form({ set, work, rest, setSet, setWork, setRest, start }: Props) {
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
