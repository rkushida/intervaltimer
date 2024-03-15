import { useEffect } from "react";

type Props = {
	label: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	min: number;
};

function NumberInput({ label, value, setValue, min }: Props) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleBlur = () => {
		let valNum = Number(value);
		if (value === "" || valNum < min) {
			valNum = min;
		}
		const valStr = String(valNum);
		localStorage.setItem(label, valStr);
		setValue(valStr);
	};

	useEffect(() => {
		const valStr = localStorage.getItem(label);
		if (valStr !== null) {
			setValue(valStr);
		}
	}, [label, setValue]);

	return (
		<div>
			<p>{label}</p>
			<input
				type="number"
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		</div>
	);
}

export default NumberInput;
