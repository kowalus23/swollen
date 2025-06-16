import { useQuery } from "@tanstack/react-query";

interface NewCollection {
	description: string;
	additionalDescription: string;
	previewImages: string[];
}

export const useNewCollection = () => {
	return useQuery<NewCollection>({
		queryKey: ["newCollection"],
		queryFn: async () => {
			const response = await fetch("/new-collection.json");
			if (!response.ok) {
				throw new Error("Failed to fetch new collection data");
			}
			return response.json();
		},
	});
};
