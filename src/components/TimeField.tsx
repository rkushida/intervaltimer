import { useCallback, useEffect, useState } from "react";
import { sec2MinSec, minSec2Sec, clamp } from "../utils";

type Props = {
  label: string;
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  min: number;
  max: number;
};

function TimeField({ label, time, setTime, min, max }: Props) {
  const [_minutes, _seconds] = sec2MinSec(Number(time));
  const [minutes, setMinutes] = useState(String(_minutes));
  const [seconds, setSeconds] = useState(String(_seconds));

  const set = useCallback((time: string) => {
    const [minutes, seconds] = sec2MinSec(Number(time));
    setTime(time);
    setMinutes(String(minutes));
    setSeconds(String(seconds));
  }, [setTime]);

  const handleChangeMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(e.target.value);
  };

  const handleChangeSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeconds(e.target.value);
  };

  const handleBlur = () => {
    const time = minSec2Sec(Number(minutes), Number(seconds));
    const newTime = String(clamp(time, min, max));
    set(newTime);
    localStorage.setItem(label, newTime);
  };

  useEffect(() => {
    const lsTime = localStorage.getItem(label);
    if (lsTime !== null) {
      const newTime = String(clamp(Number(lsTime), min, max));
      set(newTime);
    }
  }, [label, min, max, set]);

  return (
    <div>
      <p>{label}</p>
      <input
        type="number"
        value={minutes}
        onBlur={handleBlur}
        onChange={handleChangeMinute}
      />
      <input
        type="number"
        value={seconds}
        onBlur={handleBlur}
        onChange={handleChangeSecond}
      />
    </div>
  );
}

export default TimeField;
