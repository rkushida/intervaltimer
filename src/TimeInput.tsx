import type React from "react";
import { useState } from "react";
import { sec2MinSec, minSec2Sec } from "./utils";

type Props = {
	label: string;
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
};

function TimeInput({ label, time, setTime }: Props) {
	const [min, sec] = sec2MinSec(time);
	const [minutes, setMinutes] = useState(String(min));
	const [seconds, setSeconds] = useState(String(sec));

	function handleChangeMinute(e: React.ChangeEvent<HTMLInputElement>) {
		setMinutes(e.target.value);
	}

	function handleBlurMinute(e: React.FocusEvent<HTMLInputElement, Element>) {
		const time = minSec2Sec(Number(e.target.value), Number(seconds));
		const [min, sec] = sec2MinSec(time);
		setTime(time);
		setMinutes(String(min));
		setSeconds(String(sec));
	}

	function handleChangeSecond(e: React.ChangeEvent<HTMLInputElement>) {
		setSeconds(e.target.value);
	}

	function handleBlurSecond(e: React.FocusEvent<HTMLInputElement, Element>) {
		const time = minSec2Sec(Number(minutes), Number(e.target.value));
		const [min, sec] = sec2MinSec(time);
		setTime(time);
		setMinutes(String(min));
		setSeconds(String(sec));
	}

	return (
		<div>
			<p>{label}</p>
			<input
				type="number"
				value={minutes}
				onBlur={handleBlurMinute}
				onChange={handleChangeMinute}
			/>
			<input
				type="number"
				value={seconds}
				onBlur={handleBlurSecond}
				onChange={handleChangeSecond}
			/>
		</div>
	);
}

export default TimeInput;
