export function divmod(x: number, y: number): [number, number] {
  return [Math.floor(x / y), x % y];
}

export function sec2MinSec(time: number) {
  return divmod(time, 60);
}

export function minSec2Sec(minutes: number, seconds: number) {
  return minutes * 60 + seconds;
}

export function ms2Sec(time: number) {
  return Math.ceil(time / 1000);
}

export function formatMinSec(minutes: number, seconds: number) {
  const min = String(minutes).padStart(2, "0");
  const sec = String(seconds).padStart(2, "0");
  return `${min}:${sec}`;
}

export function clamp(x: number, min: number, max: number) {
  return Math.min(max, Math.max(min, x));
}
