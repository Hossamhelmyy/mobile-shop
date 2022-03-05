import React, { useState, useEffect } from 'react';
import Nav from '../src/components/layout/Nav';
import {
	Flex,
	Heading,
	Avatar,
	Text,
	Icon,
	Link,
} from '@chakra-ui/react';
import {
	query,
	collection,
	addDoc,
	where,
	getDocs,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
export default function Orders() {
	const [myData, setmyData] = useState([]);

	console.log(myData);
	useEffect(() => {
		fetch();
	}, []);

	async function fetch() {
		try {
			const fetchData = query(collection(db, 'orders'));
			const item = await getDocs(fetchData);
			setmyData(item.docs);
		} catch (e) {
			console.log(e);
		}
	}
	return (
		// #6d9feb
		<>
			<Nav />
			<Flex
				bg={'#a4bef3'}
				flexDirection='column'
				minH={'100vh'}>
				{myData &&
					myData.map((item, i) => (
						<>
							<Text
								textAlign={'right'}
								fontSize='22px'
								m={'20px 24px 5px 0px'}
								fontWeight={'bold'}>
								Order {i + 1}
							</Text>

							<Flex
								borderBottom={'2px solid #4b4949'}
								key={i}
								flexDirection={'column'}
								flexWrap='wrap'
								alignItems={'center'}
								p={'4'}>
								<Text
									fontSize={'26px'}
									borderBottom='2px solid #000'
									color='#3a3737'
									mt={'60px'}
									mb='20px'
									textAlign={'center'}
									fontWeight={'bold'}>
									المنتجات
								</Text>

								<Flex
									gridRowGap='12px'
									flexDirection={'column'}
									justifyContent={'space-between'}
									color='black'
									fontFamily={'sans-serif'}
									fontWeight='bold'
									pt={'6px'}
									borderRadius={'10px'}
									boxShadow={
										'3px 3px 3px 5px rgba(0,0,0,.1)'
									}
									w={'80vw'}>
									{myData &&
										item.data().products.map((item, i) => (
											<>
												<Flex
													fontSize={'12px'}
													flexDirection={'column'}
													key={i}
													gridRowGap='6px'
													borderRadius={'20px'}
													mb='2'
													//
												>
													<Flex
														fontSize={'12px'}
														fontFamily={'sans-serif'}
														flexDirection={'row'}
														p={'10px 20px 2px 20px'}
														align='center'
														bg='white'
														borderRadius={'10px'}
														justify={'space-between'}>
														<Text>اسم المنتج : </Text>
														<Text>{item.product.name}</Text>
													</Flex>
													<Flex
														flexDirection={'row'}
														p={'10px 20px 2px 20px'}
														align='center'
														bg='white'
														borderRadius={'10px'}
														justify={'space-between'}>
														<Text>الماركة : </Text>
														<Text>
															{item.product.brand}
														</Text>
													</Flex>
													<Flex
														flexDirection={'row'}
														p={'6px 20px'}
														align='center'
														w={'100%'}
														bg='white'
														borderRadius={'10px'}
														justify={'space-between'}>
														<Text>رقم الموديل : </Text>
														<Text>
															{item.product.modelNum}
														</Text>
													</Flex>

													<Flex
														flexDirection={'row'}
														p={'6px 20px'}
														align='center'
														bg='white'
														borderRadius={'10px'}
														justify={'space-between'}>
														<Text>السعر : </Text>
														<Text>
															{item.product.price}
														</Text>
													</Flex>
												</Flex>
											</>
										))}
								</Flex>
								<Flex
									flexDirection={'row'}
									m={'40px 20px 30px 20px'}
									align='center'
									fontSize={'22px'}
									borderBottom='2px solid #000'
									justify={'space-between'}>
									<Text fontWeight={'bold'}>
										تفاصيل العميل
									</Text>
								</Flex>
								<Flex
									mb='20px'
									gridRowGap='8px'
									flexDirection={'column'}
									justifyContent={'space-between'}
									color='black'
									fontFamily={'sans-serif'}
									fontWeight='bold'
									boxShadow={
										'3px 3px 3px 5px rgba(0,0,0,.1)'
									}
									w={'60vw'}>
									<Flex
										flexDirection={'row'}
										p={'6px 20px'}
										align='center'
										bg={'white'}
										justify={'space-between'}>
										<Text>اسم العميل : </Text>
										<Text>{item.data().user.username}</Text>
									</Flex>
									<Flex
										flexDirection={'row'}
										p={'6px 20px'}
										bg='white'
										borderRadius={'10px'}
										align='center'
										justify={'space-between'}>
										<Text>عنوان العميل : </Text>
										<Text>{item.data().user.address}</Text>
									</Flex>
									<Flex
										flexDirection={'row'}
										p={'6px 20px'}
										bg='white'
										borderRadius={'10px'}
										align='center'
										justify={'space-between'}>
										<Text>البريد الالكتروني للعميل : </Text>
										<Text>{item.data().user.email}</Text>
									</Flex>
									<Flex
										flexDirection={'row'}
										p={'6px 20px'}
										align='center'
										bg='white'
										justify={'space-between'}>
										<Text>رقم الموبايل : </Text>
										<Text>{item.data().user.phoneNum}</Text>
									</Flex>
								</Flex>
							</Flex>
						</>
					))}
			</Flex>
		</>
	);
}
