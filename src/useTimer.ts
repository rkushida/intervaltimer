import { useState, useEffect, useRef, useCallback } from "react";
import { preparation } from "./consts";

type Status = {
	set: number;
	time: number;
	stage: "prepare" | "work" | "rest" | "finished";
};

function useTimer(set: number, work: number, rest: number) {
	const interval = 100;
	const intervalIdRef = useRef(0);
	const [isPaused, setIsPaused] = useState(false);
	const [status, setStatus] = useState<Status>({
		set,
		time: preparation,
		stage: "prepare",
	});

	const statusUpdater = useCallback(
		(status: Status) => {
			const newStatus = { ...status };
			newStatus.time = status.time - interval;
			if (newStatus.time === 0) {
				switch (status.stage) {
					case "prepare":
						newStatus.time = work;
						newStatus.stage = "work";
						break;
					case "work":
						if (status.set === 1) {
							newStatus.set = 0;
							newStatus.time = 0;
							newStatus.stage = "finished";
						} else {
							newStatus.time = rest;
							newStatus.stage = "rest";
						}
						break;
					case "rest":
						newStatus.set = status.set - 1;
						newStatus.time = work;
						newStatus.stage = "work";
						break;
				}
			}
			return newStatus;
		},
		[rest, work],
	);

	const clearTimer = useCallback(() => {
		clearInterval(intervalIdRef.current);
		intervalIdRef.current = 0;
	}, []);

	const setTimer = useCallback(() => {
		intervalIdRef.current = setInterval(() => {
			status.stage === "finished" ? clearTimer() : setStatus(statusUpdater);
		}, interval);
	}, [status.stage, clearTimer, statusUpdater]);

	const toggle = useCallback(() => {
		setIsPaused(() => !isPaused);
		isPaused ? setTimer() : clearTimer();
	}, [isPaused, setTimer, clearTimer]);

	useEffect(() => {
		setTimer();
		return clearTimer;
	}, [setTimer, clearTimer]);

	return [status, isPaused, toggle] as const;
}

export default useTimer;
