import { useState } from 'react';
import Timer from './Timer';
import { minSecToMs } from './utils';
import Form from './Form';
import { initialWork, initialRest } from './consts';

function App() {
    const [set, setSet] = useState(3);
    const [work, setWork] = useState(initialWork);
    const [rest, setRest] = useState(initialRest);
    const [key, setKey] = useState(Date.now());
    const [showTimer, setShowTimer] = useState(false);

    function toggleShow() {
        setShowTimer(() => !showTimer);
    }

    function updateKey() {
        setKey(Date.now());
    }

    const workMs = minSecToMs(work.minute, work.second);
    const restMs = minSecToMs(rest.minute, rest.second);

    return (
        <div>
            {
                showTimer ?
                <Timer key={key} set={set} work={workMs} rest={restMs} reset={toggleShow} restart={updateKey} /> :
                <Form  set={set} setSet={setSet} work={work} setWork={setWork} rest={rest} setRest={setRest} start={toggleShow}/>
            }
        </div>
    );
}

export default App;
