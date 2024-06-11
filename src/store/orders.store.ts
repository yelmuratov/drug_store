import { ICartState } from "@/interfaces";
import { create } from "zustand";

export const useCartStore = create<ICartState>((set) => ({
    drugs: [],
    cartQuantity: 0,
    setOrderedProducts: (drugs) => set({ drugs, cartQuantity: drugs.reduce((total, drug) => total + drug.quantity, 0) }),
    setCartQuantity: (quantity) => set({ cartQuantity: quantity }),
  }));