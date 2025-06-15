import { useQuery } from "@tanstack/react-query";

export interface Product {
	id: number;
	internalName: string;
	name: string;
	description: string;
	price: number;
	sizes: string[];
	image: string;
}

interface ProductsData {
	products: Product[];
}

async function fetchProducts(): Promise<ProductsData> {
	const response = await fetch("/shop.json");
	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}
	return response.json();
}

export function useProducts() {
	return useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
		staleTime: 1 * 60 * 1000, // 1 minute
	});
}
