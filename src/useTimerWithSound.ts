import { useEffect } from "react";
import useTimer from "./useTimer";
import useSound from "./useSound";

const preparation = 5 * 1000;

function useTimerWithSound(set: number, work: number, rest: number) {
    const [status, isPaused, toggle] = useTimer(set, work, rest);
    const [play, pause] = useSound();

    useEffect(() => {
        if ([1000, 2000, 3000].includes(status.time)) {
            play('pi', 0);
        } else if (status.time % 1000 === 0) {
            if (status.stage === 'prepare' && status.time === preparation) {
                play('pii', 0);
            } else if (status.stage === 'work' && status.time === work) {
                play('pii', 0);
            } else if (status.stage === 'rest' && status.time === rest) {
                play('pii', 0);
            } else if (status.stage === 'finished') {
                play('pii', 0);
            }
        }
    }, [status.time]);

    useEffect(() => {
        isPaused ? play() : pause();
    }, [isPaused]);

    return [status, isPaused, toggle] as const;
}

export default useTimerWithSound;
