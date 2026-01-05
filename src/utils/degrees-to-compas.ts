export function degreesToCompass(degInput: number): string {
	const deg = ((degInput % 360) + 360) % 360;
	const labels = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
	const step = 360 / labels.length;
	const idx = Math.floor((deg + step / 2) / step) % labels.length;
	return labels[idx]!;
}