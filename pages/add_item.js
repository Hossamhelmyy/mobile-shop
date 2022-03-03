import React, { useEffect } from 'react';
import AddItem from '../src/components/other/AddItem';
import { useStore } from '../store/Store';
import { useRouter } from 'next/router';

export default function Add_item() {
	const admin = useStore((state) => state.admin);
	const router = useRouter();
	useEffect(() => {
		if (!admin) {
			router.push('/');
		}
	}, []);
	return <AddItem />;
}
