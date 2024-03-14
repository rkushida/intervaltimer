import { formatMinSec, msToMinSec } from "./utils";
import useTimerWithSound from "./useTimerWithSound";

type Props = {
    set: number;
    work: number;
    rest: number;
    reset: () => void;
    restart: () => void;
};

function Timer({set, work, rest, reset, restart}: Props) {
    const [status, isPaused, toggle, pause] = useTimerWithSound(set, work, rest);

    const isHidden = status.stage === 'finished';
    const pauseText = isPaused ? 'Start' : 'Pause';
    const time = formatMinSec(...msToMinSec(status.time));
    const _reset = () => {
        reset();
        pause();
    }

    return (
        <>
            <p>Sets: {status.set}</p>
            <p>Time: {time}</p>
            <p>Stage: {status.stage}</p>
            <button onClick={toggle} hidden={isHidden}>{pauseText}</button>
            <button onClick={restart} hidden={!isHidden}>Restart</button>
            <button onClick={_reset}>Reset</button>
        </>
    );
}

export default Timer;
