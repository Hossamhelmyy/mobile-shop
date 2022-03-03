import create from 'zustand';
import { useLayoutEffect } from 'react';
import createContext from 'zustand/context';
import { devtools, persist } from 'zustand/middleware';

let store;
const initialState = {
	cartItems: [],
	incomes: [],
	admin: false,
	user: '',
};

const zustandContext = createContext();
export const Provider = zustandContext.Provider;
// An example of how to get types
/** @type {import('zustand/index').UseStore<typeof initialState>} */
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
	return create(
		devtools(
			persist((set, get) => ({
				...initialState,
				...preloadedState,
				addToCart: (product) => {
					set((state) => ({
						cartItems: [...state.cartItems, product],
					}));
				},
				updateCart: (id, quantity) => {
					set((state) => ({
						cartItems: state.cartItems.map((item) => {
							if (item.id === id) {
								return {
									...item,
									quantity: +quantity,
									price: +item.product.price * +quantity,
								};
							}
							return item;
						}),
					}));
				},
				removeFromCart: (id) =>
					set((state) => ({
						cartItems: state.cartItems.filter(
							(item) => item.id !== id,
						),
					})),
				clearState: () =>
					set((state) => ({
						cartItems: [],
						user: {},
					})),
				collectIncome: (...arr) => {
					set((state) => ({
						incomes: [...state.incomes, ...arr],
					}));
				},
				adminCheck: (admin) => {
					set((state) => {
						state.admin = admin;
					});
				},
				userCheck: (user) => {
					set((state) => {
						state.user = user;
					});
				},
			})),
		),
	);
};

export function useCreateStore(initialState) {
	// For SSR & SSG, always use a new store.
	if (typeof window === 'undefined') {
		return () => initializeStore(initialState);
	}

	// For CSR, always re-use same store.
	store = store ?? initializeStore(initialState);
	// And if initialState changes, then merge states in the next render cycle.
	//
	// eslint complaining "React Hooks must be called in the exact same order in every component render"
	// is ignorable as this code runs in same order in a given environment
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useLayoutEffect(() => {
		if (initialState && store) {
			store.setState({
				...store.getState(),
				...initialState,
			});
		}
	}, [initialState]);

	return () => store;
}
