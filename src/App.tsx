import { useState } from "react";
import Timer from "./Timer";
import Form from "./Form";
import { initialSet, initialWork, initialRest } from "./consts";

function App() {
	const [set, setSet] = useState(String(initialSet));
	const [work, setWork] = useState(String(initialWork));
	const [rest, setRest] = useState(String(initialRest));
	const [key, setKey] = useState(Date.now());
	const [showTimer, setShowTimer] = useState(false);

	const toggleShow = () => {
		setShowTimer(() => !showTimer);
	};

	const updateKey = () => {
		setKey(Date.now());
	};

	return (
		<div>
			{showTimer ? (
				<Timer
					key={key}
					set={Number(set)}
					work={Number(work) * 1000}
					rest={Number(rest) * 1000}
					reset={toggleShow}
					restart={updateKey}
				/>
			) : (
				<Form
					set={set}
					setSet={setSet}
					work={work}
					setWork={setWork}
					rest={rest}
					setRest={setRest}
					start={toggleShow}
				/>
			)}
		</div>
	);
}

export default App;
