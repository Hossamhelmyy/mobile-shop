import { Flex, Text, Button } from '@chakra-ui/react';
import { ImCheckmark } from 'react-icons/im';
import { useFormik } from 'formik';
import Nav from '../src/components/layout/Nav';
import CartItem from '../src/components/other/CartItem';
import { useStore } from '../store/Store';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import {
	query,
	collection,
	addDoc,
	where,
	getDocs,
	serverTimestamp,
} from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Toast from '../src/components/uts/Toast';
import { db } from '../firebase/Firebase';

export default function Cart() {
	const router = useRouter();
	const auth = getAuth();
	const [ordering, setOrdering] = useState(true);
	const cartItems = useStore((state) => state.cartItems);
	const clearState = useStore((state) => state.clearState);
	const [user, loading, error] = useAuthState(auth);
	var today = new Date('Tue mar 31 2022 04:49:15 GMT+0200');
	let month = today.getMonth() + 1;

	// sum the total price
	const sumArr = () => {
		let sum = 0;
		for (let i = 0; i < cartItems.length; i++) {
			sum = cartItems[i]?.price + sum;
		}
		return sum;
	};

	const makeOrder = async () => {
		try {
			setOrdering(true);
			const userQuery = query(
				collection(db, 'users'),
				where('uid', '==', user.uid),
			);

			const userData = await getDocs(userQuery);
			const totalquery = query(
				collection(db, 'orders'),
				where('month', '==', month),
			);
			const totalDocs = await getDocs(totalquery);
			totalDocs.forEach((order) => {
				const docRef = doc(db, 'orders', order.id);

				updateDoc(docRef, {
					TotalMonthIncome: 0,
				}).then((docc) => console.log(docc));
			});

			userData.docs.map((user) => {
				console.log(user.id);
				addDoc(collection(db, 'orders'), {
					user: user.data(),
					products: cartItems,
					month: month,

					totalPrice: sumArr(),
					date: serverTimestamp(),
				})
					.then((doc) => console.log(doc))
					.catch((e) => {
						console.log(e);
					});

				const orderQuery = query(
					collection(db, 'orders'),
					where('user', '==', user.data()),
				);
				getDocs(orderQuery)
					.then((doc) => {
						doc.docs.map((order) => {
							console.log(order.data());
						});
					})
					.catch((e) => {
						console.log(e);
					});
			});
			Toast(' تمت ايصال الطلب بنجاح', null, 'success');
			clearState();
			setOrdering(false);
		} catch (e) {
			setOrdering(false);
			console.log(e);
		}
	};
	return (
		<>
			<Nav />
			<Flex
				p='10px 20px 10px 20px'
				alignItems={'center'}
				justifyContent={'space-between'}
				gridGap={'10'}>
				<Flex padding={'10px'}>
					<Text
						color={'green.500'}
						fontWeight={'bolder'}
						fontSize='2xl'>
						طلباتك
					</Text>
				</Flex>
				<Flex padding={'10px'}>
					<Button
						dir='ltr'
						onClick={() => {
							router.push('/');
						}}
						colorScheme={'purple'}
						leftIcon={<AiOutlineArrowLeft />}>
						الرجوع للتسوق
					</Button>
				</Flex>
			</Flex>
			<Flex
				p='3'
				pb={'40px'}
				flexDirection={'column'}
				gridGap='8'>
				<Flex
					p='3'
					borderRadius={'3xl'}
					border='2px'
					borderColor='gray.300'
					flexDirection={'column'}
					flex='2'>
					<Text
						textAlign={'center'}
						color={'gray.800'}
						mb='4'
						fontWeight={'bold'}
						fontSize='xl'>
						طلباتك
					</Text>
					<hr style={{ border: '1px solid lightgray ' }} />

					<CartItem />
					{cartItems.length > 0 && (
						<>
							<hr
								style={{ border: '1px solid lightgray ' }}
							/>

							<Flex
								p='5'
								gridGap={'3'}
								flexDirection={'column'}>
								<Flex justifyContent={'space-between'}>
									<Text fontWeight={'bold'} fontSize={'xl'}>
										الاجمالي{' '}
									</Text>
									<Text
										fontSize={'xl'}
										color='blue.500'
										fontWeight={'bolder'}>
										{sumArr() + 5}
									</Text>
								</Flex>
							</Flex>
						</>
					)}
				</Flex>
				<Button
					margin={'auto'}
					w={'350px'}
					onClick={makeOrder}
					leftIcon={<ImCheckmark />}
					colorScheme='whatsapp'
					variant='solid'>
					قم بتنفيذ الطلب
				</Button>
			</Flex>
		</>
	);
}
