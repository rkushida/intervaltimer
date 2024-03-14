import { useCallback, useEffect } from "react";
import useTimer from "./useTimer";
import useSound from "./useSound";
import { initialPreparation } from "./consts";

function useTimerWithSound(set: number, work: number, rest: number) {
	const preparation = initialPreparation * 1000;
	const [status, isPaused, _toggle] = useTimer(set, work, rest);
	const [play, pause] = useSound();

	useEffect(() => {
		if ([1000, 2000, 3000].includes(status.time)) {
			play("pi", 0);
		} else if (status.time % 1000 === 0) {
			if (status.stage === "prepare" && status.time === preparation) {
				play("pii", 0);
			} else if (status.stage === "work" && status.time === work) {
				play("pii", 0);
			} else if (status.stage === "rest" && status.time === rest) {
				play("pii", 0);
			} else if (status.stage === "finished") {
				play("pii", 0);
			}
		}
	}, [status.time, status.stage, rest, work, preparation, play]);

	const toggle = useCallback(() => {
		_toggle();
		isPaused ? play() : pause();
	}, [isPaused, _toggle, play, pause]);

	return [status, isPaused, toggle, pause] as const;
}

export default useTimerWithSound;
