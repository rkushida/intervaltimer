import { useState, useEffect, useRef } from "react";

type Status = {
    set: number;
    time: number;
    stage: 'prepare' | 'work' | 'rest' | 'finished';
};

const preparation = 5 * 1000;

function useTimer(set: number, work: number, rest: number) {
    const interval = 100;
    const intervalIdRef = useRef(0);
    const [isPaused, setIsPaused] = useState(false);
    const [status, setStatus] = useState<Status>({
        set,
        time: preparation,
        stage: 'prepare',
    });

    useEffect(() => {
        setTimer();
        return clearTimer;
    }, [intervalIdRef, status]);

    useEffect(() => {
        isPaused ? setTimer() : clearTimer();
    }, [isPaused]);

    function statusUpdater(status: Status) {
        const newStatus = {...status};
        newStatus.time = status.time - interval;
        if (newStatus.time === 0) {
            switch (status.stage) {
                case 'prepare':
                    newStatus.time = work;
                    newStatus.stage = 'work';
                    break;
                case 'work':
                    if (status.set === 1) {
                        newStatus.set = 0;
                        newStatus.time = 0;
                        newStatus.stage = 'finished';
                    } else {
                        newStatus.time = rest;
                        newStatus.stage = 'rest';
                    }
                    break;
                case 'rest':
                    newStatus.set = status.set - 1;
                    newStatus.time = work;
                    newStatus.stage = 'work';
                    break;
            }
        }
        return newStatus;
    }

    function setTimer() {
        intervalIdRef.current = setInterval(() => {
            status.stage === 'finished' ? clearTimer() : setStatus(statusUpdater);
        }, interval);
    }

    function clearTimer() {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = 0;
    }

    function toggle() {
        setIsPaused(() => !isPaused);
    }

    return [status, isPaused, toggle] as const;
}

export default useTimer;
