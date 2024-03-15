import NumberInput from "./NumberField";
import TimeInput from "./TimeField";

type Props = {
	set: string;
	work: string;
	rest: string;
	setSet: React.Dispatch<React.SetStateAction<string>>;
	setWork: React.Dispatch<React.SetStateAction<string>>;
	setRest: React.Dispatch<React.SetStateAction<string>>;
	start: () => void;
};

function Form({ set, work, rest, setSet, setWork, setRest, start }: Props) {
	return (
		<div>
			<NumberInput label="Sets" value={set} min={1} setValue={setSet} />
			<TimeInput label="Work" time={work} min={1} setTime={setWork} />
			<TimeInput label="Rest" time={rest} min={0} setTime={setRest} />
			<button type="button" onClick={start}>
				Start
			</button>
		</div>
	);
}

export default Form;
