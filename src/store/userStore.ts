import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserState {
	user: User | null;
	name: string | null;
	email: string | null;
	phone: string | null;
	agreement1: boolean;
	agreement2: boolean;
	sentRequest: boolean;
	setUser: (user: User | null) => void;
	setName: (name: string | null) => void;
	setEmail: (email: string | null) => void;
	setPhone: (phone: string | null) => void;
	setAgreement1: (agreement: boolean) => void;
	setAgreement2: (agreement: boolean) => void;
	setSentRequest: (sent: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	name: null,
	email: null,
	phone: null,
	agreement1: false,
	agreement2: false,
	sentRequest: false,
	setUser: (user) => set({ user }),
	setName: (name) => set({ name }),
	setEmail: (email) => set({ email }),
	setPhone: (phone) => set({ phone }),
	setAgreement1: (agreement) => set({ agreement1: agreement }),
	setAgreement2: (agreement) => set({ agreement2: agreement }),
	setSentRequest: (sent) => set({ sentRequest: sent }),
}));
