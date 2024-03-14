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

    const finished = status.stage === 'finished';
    const pauseText = isPaused ? 'Start' : 'Pause';
    const time = formatMinSec(...msToMinSec(status.time));
    const _reset = () => {
        reset();
        pause();
    }

    return (
        <div>
            <div>
                <p>Sets: {status.set}</p>
                <p>Time: {time}</p>
                <p>Stage: {status.stage}</p>
            </div>
            {finished ? <button onClick={restart}>Restart</button> : <button onClick={toggle}>{pauseText}</button>}
            <button onClick={_reset}>Reset</button>
        </div>
    );
}

export default Timer;
