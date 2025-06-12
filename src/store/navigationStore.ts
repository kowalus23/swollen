import { create } from "zustand";

interface NavigationState {
	darkNavigation: boolean;
	setDarkNavigation: (value: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
	darkNavigation: false,
	setDarkNavigation: (value) => set({ darkNavigation: value }),
}));
