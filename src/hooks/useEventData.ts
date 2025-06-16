import { useEffect, useState } from "react";

interface EventData {
	title: string;
	description: string;
	pin: {
		latitude: number;
		longitude: number;
		startZoom: number;
	};
	radiusInKm: number;
}

export const useEventData = () => {
	const [eventData, setEventData] = useState<EventData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEventData = async () => {
			try {
				const response = await fetch("/event.json");
				if (!response.ok) {
					throw new Error("Failed to fetch event data");
				}
				const data = await response.json();
				setEventData(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setIsLoading(false);
			}
		};

		fetchEventData();
	}, []);

	return { eventData, isLoading, error };
};
