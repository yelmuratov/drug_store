import {create} from 'zustand';
import { IDrug } from '@/interfaces';

type DrugStoreType = {
    drugs: IDrug[];
    setDrugs: (drugs: IDrug[]) => void;
}

export const drugStore = create<DrugStoreType>((set => ({
    drugs: [],
    setDrugs: (drugs) => set({drugs})
})));