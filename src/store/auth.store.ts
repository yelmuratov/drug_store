import {create} from 'zustand';
import {IUser } from '@/interfaces';

type AuthStoreType = {
    isLoading: boolean;
    isAuth: boolean;
    user: IUser,
    setUser: (user: IUser) => void;
    setLoading: (loading: boolean) => void;
    setAuth: (auth: boolean) => void;
}

export const AuthStore = create<AuthStoreType>((set => ({
    isAuth: false,
    isLoading: false,
    user: {} as IUser,
    setUser: (user) => set({user}),
    setLoading: (loading) => set({isLoading: loading}),
    setAuth: (auth) => set({isAuth: auth})
})));