import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCAy5fMaIyeKHEA_TKVu9BAH6nZSAxcpPQ',
	authDomain: 'electronics-store-31797.firebaseapp.com',
	projectId: 'electronics-store-31797',
	storageBucket: 'electronics-store-31797.appspot.com',
	messagingSenderId: '302058798796',
	appId: '1:302058798796:web:fb585fb3b9f9e0ad90cc69',
	measurementId: 'G-H3Y5VYX9GN',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
