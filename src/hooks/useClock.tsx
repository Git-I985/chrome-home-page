import dayjs from "dayjs";
import { useEffect, useState } from "react";

export function useClock() {
	const [now, setNow] = useState(() => dayjs());

	useEffect(() => {
		const id = setInterval(() => setNow(dayjs()), 1000);
		return () => clearInterval(id);
	}, []);

	return { date: now.format("ddd, D MMM"), time: now.format("HH:mm:ss") };
}