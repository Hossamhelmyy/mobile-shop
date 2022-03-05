/* eslint-disable @next/next/link-passhref */
import React from 'react';
import {
	Image,
	Flex,
	Text,
	Button,
	Heading,
	GridItem,
	Grid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { doc, updateDoc } from 'firebase/firestore';

import swalToast from '../uts/Toast';
import {
	query,
	where,
	collection,
	deleteDoc,
	limit,
	orderBy,
	getDocs,
} from 'firebase/firestore';
import Link from 'next/link';

import { db } from '../../../uit/firebase';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsCart2 } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

import Loader from '../uts/Loader';
import { useStore } from '../../../store/Store';
import { CgDetailsMore } from 'react-icons/cg';
import Toast from '../uts/Toast';

function PopularProducts() {
	const [loading, setLoading] = useState(true);
	const [mustFetch, setMustFetch] = useState(true);
	const [myArray, setMyArray] = useState([]);
	const [imgLoading, setImgLoading] = useState(true);
	const addToCart = useStore((state) => state.addToCart);
	const updateCart = useStore((state) => state.updateCart);
	const admin = useStore((state) => state.admin);
	const cartItems = useStore((state) => state.cartItems);
	const fetch = async () => {
		try {
			const mainQuery = query(
				collection(db, 'products'),
				where('star', '==', true),
			);
			const docs = await getDocs(mainQuery);
			console.log(docs);
			if (docs) {
				setMyArray(docs.docs);

				setMustFetch(false);
				setLoading(false);
			}
		} catch (error) {
			setMustFetch(false);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (mustFetch && db) {
			fetch();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mustFetch]);
	console.log(myArray);
	const deleteItemFromPopular = async (id) => {
		console.log(id);
		try {
			const ProductQuery = query(
				collection(db, 'products'),
				where('id', '==', id),
			);
			const productData = await getDocs(ProductQuery);
			productData.docs.map((prod) => {
				const docRef = doc(db, 'products', prod.id);
				updateDoc(docRef, {
					star: false,
				}).then((docc) => console.log(docc));
			});
			setLoading(true);
			setMustFetch(true);
			swalToast(
				'good Job',
				'item has been deleted from popular products',
				'success',
				'ok',
			);
		} catch (e) {
			console.log(e);
			swalToast(
				'error',
				'something went wrong',
				'warning',
				'ok',
				true,
			);
		}
	};
	const addItems = (product, id) => {
		const exist = cartItems.find((item) => item.id === id);
		if (exist) {
			updateCart(id, exist.quantity + 1);
		} else {
			addToCart({
				product: product,
				quantity: 1,
				price: product.price,
				id: id,
			});
		}
	};

	return (
		<>
			<Flex
				fontWeight={'bold'}
				m='40px 0'
				bg={'white'}
				fontFamily={'sans-serif'}
				justifyContent={'center'}>
				<Heading
					borderBottom={'2.3px solid #180952 '}
					color={'#180952'}
					pb={'6px'}
					fontSize={{
						base: '12px',
						xs: '15px',
						sm: '17px',
						md: '26px',
					}}>
					المنتجات الاكثر طلبا من العملاء
				</Heading>
			</Flex>

			{!loading && (
				<Grid
					w='80vw'
					p={{ base: '1', sm: '3' }}
					marginBottom={'20px'}
					margin={'10px auto'}
					backgroundColor={'#fff'}
					// rowGap={'20px'}
					className='grid-popular'
					// gridColumnGap={'4px'}
					placeItems={'center'}
					gridRowGap='22px'
					templateColumns={
						'repeat(auto-fit , minMax(260px , 1fr))'
					}>
					{myArray?.map((item, i) => (
						<GridItem key={i}>
							<Flex
								borderBottomLeftRadius={'6px'}
								borderBottomRightRadius={'6px'}
								borderTopLeftRadius={'6px'}
								borderTopRightRadius={'6px'}
								cursor={'pointer'}
								bg={'#fffefe'}
								boxShadow={
									'1px 1px 4px .4px rgba(0,0,0,.2)'
								}
								_hover={{
									boxShadow:
										'1.5px 1.5px 5px .7px rgba(0 , 0 , 0 , .1.1)',
									transform: 'scale(1.07)',
									transition: 'all .3s ease-in',
								}}
								height={'360px'}
								transition={'all .2s ease-in-out'}
								p='2'
								w={{
									base: '70vw',
									sm: '240px',
									md: '250px',
								}}
								flexDirection={'column'}
								alignItems={'center'}>
								{imgLoading && (
									<Loader color={'pink.300'} />
								)}
								<Image
									src={
										'imgs/DELL-G3-3500-INTEL-CORE-I5-10300H-egyptlaptop_k1j7-1r.jpg.png'
									}
									alt='img'
									display={imgLoading ? 'none' : 'block'}
									// w={{ base: '70px', sm: '160px' }}
									onLoad={() => setImgLoading(false)}
									pb={'10px'}
									maxW={'164px'}
									height={'164px'}
								/>

								<Text
									color={'#464545'}
									p='2'
									height={'90px'}
									// maxW={{ base: '160px', md: 'auto' }}
									lineHeight={'1.86'}
									alignSelf={'flex-start'}
									fontFamily={'sans-serif'}
									fontWeight='bold'
									fontSize={{ base: '12px', sm: '12px' }}>
									{/* {doc.data().name} */}
									{item.data().name}
								</Text>

								<Heading
									p={'20px 8px 14px 0'}
									alignSelf={'flex-start'}
									fontSize={'16px'}
									fontFamily={'sans-serif'}
									fontWeight={'bold'}
									color={'#1b1b1b'}>
									{/* {` ${doc.data().price} جنيه`} */}
									{item.data().price} جنيه
								</Heading>
								{!admin && (
									<Flex
										w={'100%'}
										flexDirection='row-reverse'
										alignItems={'center'}
										justifyContent='space-between'>
										{/* // eslint-disable-next-line @next/next/link-passhref */}
										<Link
											href={`/product/${item.data().id}`}>
											<Button
												dir='ltr'
												leftIcon={
													<CgDetailsMore
														fontSize={'1.3rem'}
													/>
												}
												fontSize='sm'
												size='sm'
												colorScheme={'blue'}>
												تقاصيل
											</Button>
										</Link>
										<Button
											onClick={() => {
												addItems(
													item.data(),
													item.data().id,
												);
												Toast(
													' تمت الاضافة بنجاح',
													null,
													'success',
												);
											}}
											dir='ltr'
											leftIcon={
												<BsCart2 fontSize={'1.3rem'} />
											}
											fontSize='sm'
											size='sm'
											colorScheme={'green'}>
											أضف الي العربة
										</Button>
									</Flex>
								)}

								{admin && (
									<Button
										onClick={() =>
											deleteItemFromPopular(item.data().id)
										}
										m='8px'
										leftIcon={<AiFillDelete />}
										colorScheme={'red'}>
										حذف المنتج من المنتجات المميزه
									</Button>
								)}
							</Flex>
						</GridItem>
					))}
				</Grid>
			)}
		</>
	);
}

export default PopularProducts;
