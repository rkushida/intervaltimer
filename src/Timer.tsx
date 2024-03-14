import { formatMinSec, sec2MinSec, ms2Sec } from "./utils";
import useTimerWithSound from "./useTimerWithSound";

type Props = {
	set: number;
	work: number;
	rest: number;
	reset: () => void;
	restart: () => void;
};

function Timer({ set, work, rest, reset, restart }: Props) {
	const [status, isPaused, toggle, pause] = useTimerWithSound(
		set,
		work * 1000,
		rest * 1000,
	);

	const isFinished = status.stage === "finished";
	const pauseText = isPaused ? "Start" : "Pause";
	const time = formatMinSec(...sec2MinSec(ms2Sec(status.time)));
	const _reset = () => {
		reset();
		pause();
	};

	return (
		<div>
			<div>
				<p>Sets: {status.set}</p>
				<p>Time: {time}</p>
				<p>Stage: {status.stage}</p>
			</div>
			<button type="button" onClick={isFinished ? restart : toggle}>
				{isFinished ? "Restart" : pauseText}
			</button>
			<button type="button" onClick={_reset}>
				Reset
			</button>
		</div>
	);
}

export default Timer;
