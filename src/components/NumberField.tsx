import { useEffect } from "react";
import { clamp } from "../utils";

type Props = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  min: number;
  max: number;
};

function NumberField({ label, value, setValue, min, max }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    const newValue = String(
      value === "" ? min : clamp(Number(value), min, max),
    );
    setValue(newValue);
    localStorage.setItem(label, newValue);
  };

  useEffect(() => {
    const lsValue = localStorage.getItem(label);
    if (lsValue !== null) {
      const newValue = String(clamp(Number(lsValue), min, max));
      setValue(newValue);
    }
  }, [label, setValue, min, max]);

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

export default NumberField;
