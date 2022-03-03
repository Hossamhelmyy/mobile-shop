import React from 'react';
import {
	Flex,
	Text,
	Icon,
	Button,
	Image,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Portal,
} from '@chakra-ui/react';
import { BsWhatsapp, BsCart2 } from 'react-icons/bs';

import { HiArrowSmDown } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import { useStore } from '../../../store/Store';
import {
	query,
	collection,
	where,
	getDocs,
	addDoc,
	serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../firebase/Firebase';

export default function Nav({}) {
	const cartItems = useStore((state) => state.cartItems);
	const adminCheck = useStore((state) => state.adminCheck);
	const admin = useStore((state) => state.admin);

	const auth = getAuth();
	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		checkAdmin();
	}, [user]);

	async function checkAdmin() {
		if (user) {
			const currentAccQuery = query(
				collection(db, 'users'),
				where('uid', '==', user.uid),
			);
			const currAccData = await getDocs(currentAccQuery);
			currAccData.docs.map((user) => {
				if (user.data().admin === true) {
					adminCheck(true);
					console.log(user.data());
				}
			});
		}
		console.log('no user');
	}
	const clearState = useStore((state) => state.clearState);
	const router = useRouter();

	const goToLoginPage = () => {
		router.push('/login');
	};

	const signout = async () => {
		try {
			await signOut(auth);
			clearState();
			localStorage.removeItem('undefined');
			setAdmin(false);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<nav>
			<Flex
				flexWrap={'wrap'}
				alignItems={'center'}
				justifyContent={'space-between'}
				padding={'12px 20px 12px 20px'}
				backgroundColor='#589deb'
				gridGap={5}>
				<Flex flexDirection={'column'}>
					<Flex
						gridGap={'2'}
						alignItems={'center'}
						cursor='pointer'
						onClick={() => router.push('/')}>
						<Image
							width={{ base: '115px', md: '160px' }}
							alt='img'
							src={'imgs/logo_bchz-og2.png'}></Image>
					</Flex>
				</Flex>
				{!admin && user ? (
					<Flex
						_hover={{
							bg: '#6dacf3',
							boxShadow: '2px 2px 1px rgba(0,0,0, .2)',
						}}
						cursor={'pointer'}
						p={'4px 18px'}
						borderRadius={'60px'}
						align={'center'}
						justifyContent='center'
						flexDirection={'row'}>
						<Flex>
							<Icon
								color={'#fff'}
								fontSize={'25px'}
								as={CgProfile}
							/>
						</Flex>
						<Menu>
							<MenuButton>
								<Flex
									mt={'8px'}
									mr={'5px'}
									alignItems={'center'}
									justifyContent='center'>
									<Text
										// fontWeight='bold'
										fontSize={'17px'}
										color={'#fff'}>
										حسابي
									</Text>
									<Icon
										color={'#fff'}
										fontSize={'15px'}
										as={HiArrowSmDown}
									/>
								</Flex>
							</MenuButton>
							<Portal>
								<MenuList>
									<MenuItem
										onClick={() =>
											router.push('/myOrders')
										}>
										طلباتي
									</MenuItem>
									<MenuItem
										onClick={() => router.push('/profile')}>
										الملف الشخصي
									</MenuItem>
								</MenuList>
							</Portal>
						</Menu>
					</Flex>
				) : (
					''
				)}

				{!user && (
					<Button
						_hover={{
							color: '#fff6f6',
							bg: '#6dacf3',
							boxShadow: '1px 1px 1px 1px rgba(0,0,0,.1)',
						}}
						transition={'all .5s ease-in-out'}
						order={3}
						onClick={goToLoginPage}
						boxShadow={'2px 2px 1px rgba(0,0,0, .2)'}
						height={{ base: '28px', md: '36px' }}
						width={{ base: '110px', md: '122px' }}
						fontSize={{ base: '12px', md: '15px' }}
						bg={'#f2f5ef'}
						color={'#428de2'}>
						تسجيل الدخول
					</Button>
				)}
				{admin && user ? (
					<>
						<Button
							_hover={{
								color: '#fff6f6',
								bg: '#6dacf3',
								boxShadow: '1px 1px 1px 1px rgba(0,0,0,.1)',
							}}
							transition={'all .5s ease-in-out'}
							order={3}
							onClick={() => router.push('/add_item')}
							fontFamily={'sans-serif'}
							boxShadow={'2px 2px 1px #b1a2a233'}
							height={{ base: '30px', md: '36px' }}
							width={{ base: '110px', md: '122px' }}
							fontSize={{ base: '12px', md: '15px' }}
							bg={'#f2f5ef'}
							color={'#6dacf3'}>
							اضافه منتج
						</Button>
						<Button
							_hover={{
								color: '#fff6f6',
								bg: '#6dacf3',
								boxShadow: '1px 1px 1px 1px rgba(0,0,0,.1)',
							}}
							transition={'all .5s ease-in-out'}
							order={4}
							fontFamily={'sans-serif'}
							onClick={() => {
								router.push('/dashboard');
							}}
							boxShadow={'2px 2px 1px rgba(0,0,0, .2)'}
							height={{ base: '34px', md: '36ox' }}
							width={{ base: '110px', md: '122px' }}
							fontSize={{ base: '12px', md: '16px' }}
							bg={'#f2f5ef'}
							color={'#6dacf3'}>
							التقارير و التفاصيل
						</Button>
					</>
				) : (
					''
				)}
				{user ? (
					<>
						<Button
							_hover={{
								color: '#fff6f6',
								bg: '#6dacf3',
								boxShadow: '1px 1px 1px 1px rgba(0,0,0,.1)',
							}}
							transition={'all .5s ease-in-out'}
							order={4}
							fontFamily={'sans-serif'}
							onClick={signout}
							boxShadow={'2px 2px 1px rgba(0,0,0, .2)'}
							height={{ base: '34px', md: '36px' }}
							width={{ base: '110px', md: '122px' }}
							fontSize={{ base: '12px', md: '16px' }}
							bg={'#f2f5ef'}
							color={'#6dacf3'}>
							تسجيل الخروج
						</Button>

						<Flex
							order={5}
							flexDirection={'column'}
							onClick={() => router.push('/cart')}>
							<Text
								fontWeight={'bold'}
								color={'#e2d2d3'}
								mb='-3'
								mr='3'>
								{cartItems.length}
							</Text>
							<Icon
								cursor={'pointer'}
								as={BsCart2}
								w='7'
								h='7'
								onClick={() => router.push('/cart')}
								color={'#f2f5ef'}
							/>
						</Flex>
					</>
				) : (
					''
				)}
			</Flex>
		</nav>
	);
}
