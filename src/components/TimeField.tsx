import { useEffect, useState } from "react";
import { sec2MinSec, minSec2Sec } from "../utils";

type Props = {
	label: string;
	time: string;
	min: number;
	setTime: React.Dispatch<React.SetStateAction<string>>;
};

function TimeField({ label, time, min, setTime }: Props) {
	const [_minutes, _seconds] = sec2MinSec(Number(time));
	const [minutes, setMinutes] = useState(String(_minutes));
	const [seconds, setSeconds] = useState(String(_seconds));

	const handleChangeMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMinutes(e.target.value);
	};

	const handleChangeSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSeconds(e.target.value);
	};

	const set = (time: string) => {
		setTime(time);
		const [minutes, seconds] = sec2MinSec(Number(time));
		setMinutes(String(minutes));
		setSeconds(String(seconds));
	};

	const handleBlur = () => {
		let timeNum = minSec2Sec(Number(minutes), Number(seconds));
		if (timeNum < min) {
			timeNum = min;
		}
		const timeStr = String(timeNum);
		localStorage.setItem(label, timeStr);
		set(timeStr);
	};

	useEffect(() => {
		const timeStr = localStorage.getItem(label);
		if (timeStr !== null) {
			set(timeStr);
		}
	}, [label, set]);

	return (
		<div>
			<p>{label}</p>
			<input
				type="number"
				value={minutes}
				onBlur={handleBlur}
				onChange={handleChangeMinute}
			/>
			<input
				type="number"
				value={seconds}
				onBlur={handleBlur}
				onChange={handleChangeSecond}
			/>
		</div>
	);
}

export default TimeField;
