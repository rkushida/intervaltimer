type Props = {
	label: string;
	value: number;
	setValue: React.Dispatch<React.SetStateAction<number>>;
};

function NumberInput({ label, value, setValue }: Props) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(() => Number(e.target.value));
	}

	return (
		<div>
			<p>{label}</p>
			<input type="number" value={value} onChange={handleChange} />
		</div>
	);
}

export default NumberInput;
