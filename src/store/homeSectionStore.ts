import { create } from "zustand";

export enum HomeSection {
	HERO = "hero",
	SHOP = "shop",
	EVENTS = "events",
	PREVIEW_ITEMS = "previewItems",
	SOCIAL_MEDIA = "socialMedia",
}

interface HomeSectionStore {
	currentSection: HomeSection;
	setCurrentSection: (section: HomeSection) => void;
}

export const useHomeSectionStore = create<HomeSectionStore>((set) => ({
	currentSection: HomeSection.HERO,
	setCurrentSection: (section) => set({ currentSection: section }),
}));
