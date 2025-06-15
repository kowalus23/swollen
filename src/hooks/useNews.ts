import { useQuery } from "@tanstack/react-query";

interface NewsData {
	news: {
		title: string;
		description: string;
		isVisible: boolean;
		isVisibleFromDate: boolean;
		visibilityFromDate: string;
		visibilityToDate: string;
	};
}

async function fetchNews(): Promise<NewsData> {
	const response = await fetch("/news.json");
	if (!response.ok) {
		throw new Error("Failed to fetch news");
	}
	return response.json();
}

export function useNews() {
	return useQuery({
		queryKey: ["news"],
		queryFn: fetchNews,
		staleTime: 1 * 60 * 1000, // Consider data fresh for 1 minutes
	});
}
