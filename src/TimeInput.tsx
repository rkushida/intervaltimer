import type React from "react";
import type { Time } from "./typs";
import { minSecToMs, msToMinSec } from "./utils";

type Props = {
	label: string;
	time: Time;
	setTime: React.Dispatch<React.SetStateAction<Time>>;
};

function TimeInput({ label, time, setTime }: Props) {
	function handleChangeMinute(e: React.ChangeEvent<HTMLInputElement>) {
		setTime(() => ({
			...time,
			minute: Number(e.target.value),
		}));
	}

	function handleBlurMinute(e: React.FocusEvent<HTMLInputElement, Element>) {
		const ms = minSecToMs(Number(e.target.value), time.second);
		const [minutes, seconds] = msToMinSec(ms);
		setTime(() => ({
			minute: minutes,
			second: seconds,
		}));
	}

	function handleChangeSecond(e: React.ChangeEvent<HTMLInputElement>) {
		setTime(() => ({
			...time,
			second: Number(e.target.value),
		}));
	}

	function handleBlurSecond(e: React.FocusEvent<HTMLInputElement, Element>) {
		const ms = minSecToMs(time.minute, Number(e.target.value));
		const [minutes, seconds] = msToMinSec(ms);
		setTime(() => ({
			minute: minutes,
			second: seconds,
		}));
	}

	return (
		<div>
			<p>{label}</p>
			<input
				type="number"
				value={time.minute}
				onBlur={handleBlurMinute}
				onChange={handleChangeMinute}
			/>
			<input
				type="number"
				value={time.second}
				onBlur={handleBlurSecond}
				onChange={handleChangeSecond}
			/>
		</div>
	);
}

export default TimeInput;
