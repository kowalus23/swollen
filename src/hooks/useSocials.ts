import { useQuery } from "@tanstack/react-query";

interface SocialsData {
	facebookUrl: string;
	instagramUrl: string;
	tiktokUrl: string;
}

async function fetchSocials(): Promise<SocialsData> {
	const response = await fetch("/socials.json");
	if (!response.ok) {
		throw new Error("Failed to fetch socials");
	}
	return response.json();
}

export function useSocials() {
	return useQuery({
		queryKey: ["socials"],
		queryFn: fetchSocials,
		staleTime: 1 * 60 * 1000, // Consider data fresh for 1 minute
	});
}
