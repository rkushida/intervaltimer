export function minSecToMs(minutes: number, seconds: number) {
	return (minutes * 60 + seconds) * 1000;
}

export function msToMinSec(time: number) {
	return divmod(Math.ceil(time / 1000), 60);
}

export function formatMinSec(minutes: number, seconds: number) {
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
		2,
		"0",
	)}`;
}

export function divmod(x: number, y: number): [number, number] {
	return [Math.floor(x / y), x % y];
}
