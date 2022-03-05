/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from 'react';
import {
	Flex,
	Heading,
	Text,
	Icon,
	Link,
	Button,
} from '@chakra-ui/react';
import {
	query,
	collection,
	addDoc,
	where,
	getDocs,
	deleteDoc,
	doc,
	serverTimestamp,
} from 'firebase/firestore';

import { FiHome, FiPieChart, FiBox } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import MyChart from '../src/components/other/MyChart';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useStore } from '../store/Store';
import { db } from '../firebase/firebase';

export default function Dashboard() {
	const [display, changeDisplay] = useState('hide');
	const [income, setIncome] = useState(0);
	const clearState = useStore((state) => state.clearState);
	const auth = getAuth();
	const router = useRouter();
	const [user, loading, error] = useAuthState(auth);
	const [value, changeValue] = useState(1);
	const [incomeOfMonth, setIncomeOfMonth] = useState(0);
	const cartItems = useStore((state) => state.cartItems);
	const [chartChange, setChartChange] = useState(false);

	var today = new Date('Sat Apr 30 2022 04:49:15 GMT+0200');
	let month = today.getMonth() + 1;
	let monthsNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	var lastDayOfMonth = new Date(
		today.getFullYear(),
		today.getMonth() + 1,
		0,
	);
	console.log(user);
	async function checkAdmin() {
		if (user === null) router.push('/');
		if (user) {
			const currentAccQuery = query(
				collection(db, 'users'),
				where('uid', '==', user.uid),
			);
			const currAccData = await getDocs(currentAccQuery);
			currAccData.docs.map((userr) => {
				console.log(userr.data());
				if (userr.data().admin === false) {
					router.push('/');
				}
			});
		}
	}
	useEffect(() => {
		checkAdmin();
		const fetchDataOfMonth = query(
			collection(db, 'orders'),
			where('month', '==', month),
		);
		getDocs(fetchDataOfMonth).then((orders) => {
			let sum = 0;
			for (let i = 0; i < orders.docs.length; i++) {
				sum = orders.docs[i]?.data().totalPrice + sum;
			}
			setIncomeOfMonth(sum);
		});
		console.log(
			today.toLocaleDateString() ===
				lastDayOfMonth.toLocaleDateString(),
		);
	}, []);
	console.log(income);
	const collectTotalOfMonths = async () => {
		const orderOfMonthQuery = query(
			collection(db, 'months'),
			where('month', '==', month),
		);
		const OrdersData = await getDocs(orderOfMonthQuery);
		OrdersData.docs.forEach((order) => {
			deleteDoc(doc(db, 'months', order.id)).then((docc) =>
				console.log(docc),
			);
		});
		if (
			today.toLocaleDateString() ===
			lastDayOfMonth.toLocaleDateString()
		) {
			addDoc(collection(db, 'months'), {
				TotalMonthIncome:
					today.toLocaleDateString() ===
					lastDayOfMonth.toLocaleDateString()
						? incomeOfMonth
						: '',

				date: serverTimestamp(),
				month: month,
			})
				.then((doc) => console.log(doc))
				.catch((e) => {
					console.log(e);
				});
			setChartChange(true);
		}
	};
	const getIncome = async () => {
		const ordersQuery = query(collection(db, 'months'));
		getDocs(ordersQuery).then((orders) => {
			let sum = 0;
			orders.docs.map((order) => {
				// console.log(order.data().TotalMonthIncome);
				sum = order.data().TotalMonthIncome + sum;
				console.log(sum);
				setIncome(sum);
			});
		});
	};

	useEffect(() => {
		getIncome();
	}, []);
	return (
		<Flex
			h={[null, null, '100vh']}
			maxW='2000px'
			flexDir={['column', 'column', 'row']}
			overflow='hidden'>
			{/* Column 1 */}
			<Flex
				w={['100%', '100%', '24%', '24%', '20%']}
				flexDir='column'
				alignItems='center'
				backgroundColor='#020202'
				color='#fff'>
				<Flex
					flexDir='column'
					h={[null, null, '100vh']}
					justifyContent='space-between'>
					<Flex
						pb={{ base: '30px', md: '0' }}
						flexDir='column'
						as='nav'>
						<Heading
							mt={50}
							mb={[25, 50, 100]}
							fontSize={['4xl', '4xl', 'md', 'xl', '2xl']}
							alignSelf='center'
							cursor={'pointer'}
							onClick={() => router.push('/')}
							letterSpacing='tight'>
							Egypt Laptop
						</Heading>
						<Flex
							flexDir={[
								'row',
								'row',
								'column',
								'column',
								'column',
							]}
							align={[
								'center',
								'center',
								'center',
								'flex-start',
								'flex-start',
							]}
							wrap={[
								'wrap',
								'wrap',
								'nowrap',
								'nowrap',
								'nowrap',
							]}
							justifyContent='center'>
							<Flex
								onClick={() => router.push('/')}
								className='sidebar-items'
								mr={[2, 6, 0, 0, 0]}>
								<Link
									display={[
										'none',
										'none',
										'flex',
										'flex',
										'flex',
									]}>
									<Icon
										as={FiHome}
										fontSize='2xl'
										className='active-icon'
									/>
								</Link>
								<Link
									_hover={{ textDecor: 'none' }}
									mr={'5px'}
									display={[
										'flex',
										'flex',
										'none',
										'flex',
										'flex',
									]}>
									<Text className='active'>Home</Text>
								</Link>
							</Flex>
							<Flex
								onClick={() => router.push('/orders')}
								className='sidebar-items'
								mr={[2, 6, 0, 0, 0]}>
								<Link
									display={[
										'none',
										'none',
										'flex',
										'flex',
										'flex',
									]}>
									<Icon as={FiPieChart} fontSize='2xl' />
								</Link>
								<Link
									mr={'5px'}
									_hover={{ textDecor: 'none' }}
									display={[
										'flex',
										'flex',
										'none',
										'flex',
										'flex',
									]}>
									<Text>Orders</Text>
								</Link>
							</Flex>
							<Flex
								onClick={() => router.push('/users')}
								className='sidebar-items'
								mr={[2, 6, 0, 0, 0]}>
								<Link
									display={[
										'none',
										'none',
										'flex',
										'flex',
										'flex',
									]}>
									<Icon as={FaUsers} fontSize='2xl' />
								</Link>
								<Link
									mr={'5px'}
									_hover={{ textDecor: 'none' }}
									display={[
										'flex',
										'flex',
										'none',
										'flex',
										'flex',
									]}>
									<Text>Users</Text>
								</Link>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>

			{/* Column 2 */}
			<Flex
				w={['100%', '100%', '80%', '80%', '80%']}
				flexDir='column'
				p={'14px 30px'}
				mt={{ base: '20px', md: '0' }}
				overflow='auto'>
				<Heading
					fontSize={{
						base: '18px',
						sm: '22px',
						md: '25px',
						lg: '28px',
					}}
					fontWeight='normal'
					mb={4}
					letterSpacing='tight'>
					Welcome back,{' '}
					<Flex display='inline-flex' fontWeight='bold'>
						Hossam
					</Flex>
				</Heading>
				<Flex
					mt={{ base: '30px', md: '0' }}
					justifyContent={'space-between'}
					flexDir='row'>
					<Flex flexDirection={'column'}>
						<Text color='gray' fontSize='sm'>
							My Balance
						</Text>
						<Text
							fontWeight='bold'
							fontSize={{
								base: '18px',
								sm: '22px',
								md: '25px',
								lg: '28px',
							}}>
							{income} $
						</Text>
					</Flex>
					<Flex>
						<Button
							onClick={collectTotalOfMonths}
							dir='ltr'
							fontSize='sm'
							size='sm'
							p={'0 24px'}
							colorScheme={'blue'}>
							collect
						</Button>
					</Flex>
				</Flex>
				<Flex mt={{ base: '60px', md: '0' }} minW={'100%'}>
					<MyChart chartChange={chartChange} />
				</Flex>
			</Flex>
		</Flex>
	);
}
