import {create} from 'zustand';
import { IDrug } from '@/interfaces';

export type DrugCartStoreType = {
    drugsCart: IDrug[];
    setDrugs: (drugs: IDrug[]) => void;
}

export const drugCartStore = create<DrugCartStoreType>((set => ({
    drugsCart: [],
    setDrugs: (drugs) => set({drugsCart: drugs})
})));