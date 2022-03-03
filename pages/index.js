import Head from 'next/head';
import React, { useEffect } from 'react';
import Ad from '../src/components/other/Ad';
import Footer from '../src/components/other/Footer';
import Info from '../src/components/other/Info';
import Products from '../src/components/other/Products';
import Nav from '../src/components/layout/Nav';
import Popular from '../src/components/other/Popular';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useStore } from '../store/Store';

export default function Home() {
	const auth = getAuth();
	const user = useStore((state) => state.user);
	const router = useRouter();
	useEffect(() => {
		if (!user) {
			console.log(user);
			router.push('/login');
		} else {
			console.log(user);
			router.push('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	return (
		<>
			<Head>
				<title>الصفحه الرئيسيه</title>
				<meta
					name='description'
					content='ابو ريه للاجهزه الكهربائيه'
				/>
			</Head>
			<Nav />
			<Ad />
			<Info />
			<Popular />
			<Products />
			<Footer />
		</>
	);
}
