/* eslint-disable @next/next/link-passhref */
import {
	Image,
	Flex,
	Text,
	Button,
	Heading,
	GridItem,
	Grid,
	Input,
	InputGroup,
} from '@chakra-ui/react';

import { BsCart2 } from 'react-icons/bs';
import Loader from '../uts/Loader';
import { AiFillDelete } from 'react-icons/ai';
import Toast from '../uts/Toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import {
	query,
	where,
	collection,
	getDocs,
	doc,
	deleteDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStore } from '../../../store/Store';
import Pagination from './Pagination';

export default function Products() {
	const [imgLoading, setImgLoading] = useState(true);
	const auth = getAuth();
	const [pagination, setPagination] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const [mainCategory, setMainCategory] = useState('pcs');
	const [filter, setFilter] = useState('');
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [mustFetch, setMustFetch] = useState(true);
	const [myArray, setMyArray] = useState([]);
	const db = getFirestore();
	const addToCart = useStore((state) => state.addToCart);
	const updateCart = useStore((state) => state.updateCart);
	const cartItems = useStore((state) => state.cartItems);
	const admin = useStore((state) => state.admin);

	const [searchTerm, setSearchTerm] = useState('');
	const mainQuery = query(
		collection(db, 'products'),
		where('type', '==', mainCategory),
	);

	const filterQuery = query(
		collection(db, 'products'),
		where('type', '==', mainCategory),
		where('brand', '==', filter),
	);

	const fetch = async () => {
		const theQuery = filter ? filterQuery : mainQuery;
		try {
			const documents = await getDocs(theQuery);

			if (documents) {
				setMyArray(documents.docs);
				addData(documents.docs);
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
	}, [mainCategory, filter, mustFetch]);

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
	let indexOfLastPost = currentPage * postsPerPage;
	let indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = myArray?.slice(
		indexOfFirstPost,
		indexOfLastPost,
	);
	const pages = myArray.length / postsPerPage;
	const nextFunc = () => {
		if (currentPage < pages) {
			setCurrentPage((oldState) => oldState + 1);
		}
	};
	const prevFunc = () => {
		if (currentPage > 1) {
			setLoading(true);
			setCurrentPage(currentPage - 1);
		} else {
			setCurrentPage(1);
		}
		setLoading(false);
	};
	const laptops = [
		{ value: 'Hp', name: 'Hp' },
		{ value: 'Dell', name: 'Dell' },
		{ value: 'Lenuvu', name: 'Lenuvu' },
		{ value: 'Apple', name: 'Apple' },
		{ value: 'Samsung', name: 'Samsung' },
	];
	const pcs = [
		{ value: 'Hp', name: 'Hp' },
		{ value: 'Dell', name: 'Dell' },
		{ value: 'Lenuvu', name: 'Lenuvu' },
		{ value: 'Apple', name: 'Apple' },
		{ value: 'Samsung', name: 'Samsung' },
	];
	const other = [
		{ value: 'Mouses', name: 'Mouses' },
		{ value: 'Keyboards', name: 'Keyboards' },
		{ value: 'Charger', name: 'Charger' },
		{ value: 'Head phone', name: 'Head phone' },
		{ value: 'Pada', name: 'Pada' },
	];
	const deleteDrug = async (id) => {
		try {
			await deleteDoc(doc(db, 'products', id));
			setLoading(true);
			setMustFetch(true);
			Toast(
				'good Job',
				'item has been deleted',
				'success',
				'ok',
			);
		} catch (e) {
			Toast(
				'error',
				'something went wrong',
				'warning',
				'ok',
				true,
			);
		}
	};
	function fetching() {
		if (searchTerm === '' && !loading) {
			return currentPosts.map((item, i) => {
				if (!item.star) {
					return (
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
									{item.data().price} جنيه
								</Heading>
								{!admin && (
									<Flex
										w={'100%'}
										flexDirection='row-reverse'
										alignItems={'center'}
										justifyContent='space-between'>
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
												تفاصيل
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
										onClick={() => deleteDrug(item.id)}
										leftIcon={<AiFillDelete />}
										m='8px'
										colorScheme={'red'}>
										حذف المنتج
									</Button>
								)}
							</Flex>
						</GridItem>
					);
				}
			});
		} else if ((!loading, searchTerm)) {
			const newArr = myArray.filter(
				(item) =>
					item
						.data()
						.name.toLowerCase()
						.indexOf(searchTerm) !== -1,
			);

			return newArr.map((item, i) => {
				if (!item.star) {
					return (
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
									{item.data().price}جنيه
								</Heading>
								<Flex
									w={'100%'}
									flexDirection='row-reverse'
									alignItems={'center'}
									justifyContent='space-between'>
									<Link href={`/product/${item.data().id}`}>
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
											تفاصيل
										</Button>
									</Link>
									<Button
										onClick={() => {
											addItems(item.data(), item.data().id);
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
								{admin && (
									<Button
										onClick={() =>
											deleteDrug(item.data().id)
										}
										leftIcon={<AiFillDelete />}
										colorScheme={'red'}>
										حذف المنتج
									</Button>
								)}
							</Flex>
						</GridItem>
					);
				}
			});
		}
	}
	return (
		<>
			<Flex
				gridGap='5'
				p='5'
				backgroundColor={'gray.100'}
				mt='3'
				flexDirection={'column'}
				alignItems={'center'}>
				<Text fontSize='3xl' fontWeight={'bolder'}>
					تصفح بعض من الادوية المتوفرة
				</Text>
				<InputGroup
					mt={'10px'}
					mb={'10px'}
					width={{ base: '80vw', md: '40vw' }}
					bg={'gray.200'}
					flexWrap={'wrap'}
					borderRadius={'xl'}>
					<Input
						placeholder='ابحث عن منتجك'
						type={'text'}
						name={'ابحث عن الدواء'}
						bg='white'
						onKeyUp={(e) => {
							setSearchTerm(e.target.value);
						}}
						fontSize={'lg'}
						flex='4'
					/>
				</InputGroup>
				{searchTerm === '' && (
					<>
						{' '}
						<Flex
							flexWrap={'wrap'}
							p={{ base: '1', sm: '6' }}
							maxW={{ base: '200px', sm: '100%' }}
							borderRadius={'xl'}
							bg='gray.900'
							alignItems={'center'}
							justifyContent={'center'}
							gridGap={'4'}>
							<Button
								onClick={() => {
									setFilter('');

									setMustFetch(true);

									setCurrentPage(1);
									setMainCategory('laptops');
								}}
								colorScheme={
									mainCategory === 'laptops'
										? 'green'
										: 'gray'
								}>
								لابات
							</Button>
							<Button
								onClick={() => {
									setFilter('');

									setMustFetch(true);

									setCurrentPage(1);
									setMainCategory('pcs');
								}}
								colorScheme={
									mainCategory === 'pcs' ? 'green' : 'gray'
								}>
								اجهزه
							</Button>
							<Button
								onClick={() => {
									setFilter('');

									setMustFetch(true);
									setMainCategory('other');

									setCurrentPage(1);
								}}
								_hover={{
									bg: `${
										mainCategory === 'other'
											? 'green.500'
											: 'white'
									} `,
								}}
								_active={{
									bg: `${
										mainCategory === 'other'
											? 'green.500'
											: 'white'
									} `,
								}}
								color={
									mainCategory === 'other'
										? 'white'
										: 'black'
								}
								bg={
									mainCategory === 'other'
										? 'green.500'
										: 'white'
								}>
								اكسسوارات
							</Button>
						</Flex>
						<Flex
							flexWrap={'wrap'}
							p='4'
							borderRadius={'xl'}
							bg='gray.300'
							gridGap={'4'}>
							{mainCategory === 'pcs' &&
								pcs.map((category, i) => (
									<Flex
										p='2'
										borderRadius={'xl'}
										key={i}
										bg={
											filter === category.value
												? 'blue.500'
												: 'white'
										}
										gridGap={'2'}
										alignItems={'center'}
										cursor={'pointer'}
										onClick={() => {
											setCurrentPage(1);
											setFilter((oldState) => {
												setPagination('');
												setMustFetch(true);

												return oldState === category.value
													? ''
													: category.value;
											});
										}}>
										<Text
											fontSize={'lg'}
											color={
												filter === category.value
													? 'white'
													: 'gray.600'
											}>
											{category.name}
										</Text>
									</Flex>
								))}
							{mainCategory === 'other' &&
								other.map((category, i) => (
									<Flex
										p='2'
										borderRadius={'xl'}
										key={i}
										bg={
											filter === category.value
												? 'blue.500'
												: 'white'
										}
										gridGap={'2'}
										alignItems={'center'}
										cursor={'pointer'}
										onClick={() => {
											setCurrentPage(1);
											setFilter((oldState) => {
												setPagination('');
												setMustFetch(true);

												return oldState === category.value
													? ''
													: category.value;
											});
										}}>
										<Text
											fontSize={'lg'}
											color={
												filter === category.value
													? 'white'
													: 'gray.600'
											}>
											{category.name}
										</Text>
									</Flex>
								))}
							{mainCategory === 'laptops' &&
								laptops.map((category, i) => (
									<Flex
										onClick={() => {
											setCurrentPage(1);
											setFilter((oldState) => {
												setPagination('');
												setMustFetch(true);

												return oldState === category.value
													? ''
													: category.value;
											});
										}}
										bg={
											filter === category.value
												? 'blue.500'
												: 'white'
										}
										p='2'
										borderRadius={'xl'}
										key={i}
										gridGap={'2'}
										alignItems={'center'}
										cursor={'pointer'}>
										<Text
											fontSize={'lg'}
											color={
												filter === category.value
													? 'white'
													: 'gray.600'
											}>
											{category.name}
										</Text>
									</Flex>
								))}
						</Flex>
					</>
				)}
			</Flex>

			<Grid
				m={' 20px auto'}
				h={'auto'}
				w='80vw'
				p={{ base: '1', sm: '6' }}
				marginBottom={'20px'}
				backgroundColor={'#fff'}
				className='grid-popular'
				placeItems={'center'}
				gridRowGap='22px'
				templateColumns={
					'repeat(auto-fit , minMax(260px , 1fr))'
				}>
				{fetching()}
			</Grid>
			<Pagination nextFunc={nextFunc} prevFunc={prevFunc} />
		</>
	);
}
