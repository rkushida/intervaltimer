import { useState } from 'react';
import Timer from './Timer';
import NumberInput from './NumberInput';
import TimeInput from './TimeInput';
import { minSecToMs } from './utils';
import { Time } from "./typs";

const initialWork: Time = {
    minute: 0,
    second: 10,
};

const initialRest: Time = {
    minute: 0,
    second: 5,
};

function App() {
    const [set, setSet] = useState(3);
    const [work, setWork] = useState(initialWork);
    const [rest, setRest] = useState(initialRest);
    const [showTimer, setShowTimer] = useState(false);

    function toggleShow() {
        setShowTimer(() => !showTimer);
    }

    const workMs = minSecToMs(work.minute, work.second);
    const restMs = minSecToMs(rest.minute, rest.second);

    return (
        <div>
            {
                showTimer ?
                <Timer set={set} work={workMs} rest={restMs} reset={toggleShow} /> :
                <div>
                    <NumberInput label="Sets" value={set} setValue={setSet} />
                    <TimeInput label="Work" time={work} setTime={setWork} />
                    <TimeInput label="Rest" time={rest} setTime={setRest} />
                    <button onClick={toggleShow}>Start</button>
                </div>
            }
        </div>
    );
}

export default App;
