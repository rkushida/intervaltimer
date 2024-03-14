import { useState, useRef, useEffect } from "react";
import { formatMinSec, msToMinSec } from "./utils";
import useSound from "./useSound";

type Asdf = {
    set: number;
    time: number;
    stage: 'prepare' | 'work' | 'rest' | 'finished';
};

type Props = {
    set: number;
    work: number;
    rest: number;
    reset: () => void;
};

function Timer({set, work, rest, reset}: Props) {
    const [playAudio, pauseAudio, nowPlaying] = useSound();
    const interval = 100;
    const preparation =  5 * 1000;
    const intervalRef = useRef(0);
    const [isPaused, setIsPaused] = useState(false);
    const [asdf, setAsdf] = useState<Asdf>({
        set,
        time: preparation,
        stage: 'prepare',
    });

    useEffect(() => {
        if ([1000, 2000, 3000].includes(asdf.time)) {
            playAudio('pi', 0);
        } else if (asdf.time % 1000 === 0) {
            if (asdf.stage === 'prepare' && asdf.time === preparation) {
                playAudio('pii', 0);
            } else if (asdf.stage === 'work' && asdf.time === work) {
                playAudio('pii', 0);
            } else if (asdf.stage === 'rest' && asdf.time === rest) {
                playAudio('pii', 0);
            } else if (asdf.stage === 'finished') {
                playAudio('pii', 0);
            }
        }
    }, [asdf.time]);

    useEffect(() => {
        setTimer();
        return clearTimer;
    }, [intervalRef, asdf]);

    function setTimer() {
        intervalRef.current = setInterval(() => {
            if (asdf.stage === 'finished') {
                clearTimer();
            } else {
                setAsdf((asdf) => {
                    const mise = {...asdf};
                    mise.time = asdf.time - interval;
                    if (mise.time === 0) {
                        switch (asdf.stage) {
                            case 'prepare':
                                mise.time = work;
                                mise.stage = 'work';
                                break;
                            case 'work':
                                if (asdf.set === 1) {
                                    mise.set = 0;
                                    mise.time = 0;
                                    mise.stage = 'finished';
                                } else {
                                    mise.time = rest;
                                    mise.stage = 'rest';
                                }
                                break;
                            case 'rest':
                                mise.set = asdf.set - 1;
                                mise.time = work;
                                mise.stage = 'work';
                                break;
                        }
                    }
                    return mise;
                });
            }
        }, interval);
    }

    function clearTimer() {
        clearInterval(intervalRef.current);
        intervalRef.current = 0;
    }

    function pause() {
        setIsPaused(() => !isPaused);
        isPaused ? setTimer() : clearTimer();
        isPaused ? playAudio(nowPlaying) : pauseAudio(nowPlaying);
    }

    const isHidden = asdf.stage === 'finished';
    const pauseText = isPaused ? 'Start' : 'Pause';
    const time = formatMinSec(...msToMinSec(asdf.time));

    return (
        <>
            <p>Sets: {asdf.set}</p>
            <p>Time: {time}</p>
            <p>Stage: {asdf.stage}</p>
            <button onClick={pause} hidden={isHidden}>{pauseText}</button>
            <button onClick={reset}>Reset</button>
        </>
    );
}

export default Timer;
