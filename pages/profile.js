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
import { db } from '../uit/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Profile() {
	const [myData, setmyData] = useState([]);
	const auth = getAuth();
	const router = useRouter();
	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (!user) {
			router.push('/');
		}
		fetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	async function fetch() {
		try {
			if (user) {
				console.log(user);
				const fetchUser = query(
					collection(db, 'users'),
					where('uid', '==', user.uid),
				);
				const userTepical = await getDocs(fetchUser);

				setmyData(userTepical.docs);
			}
		} catch (e) {
			console.log(e);
		}
	}
	return (
		<>
			<Nav />
			<Flex
				bg={'#a4bef3'}
				flexDirection='column'
				h={'100vh'}>
				<Flex
					flexDirection={'column'}
					flexWrap='wrap'
					alignItems={'center'}
					p={'4'}>
					{myData &&
						myData.map((item, i) => (
							<Flex
								key={i}
								gridRowGap='18px'
								flexDirection={'column'}
								justifyContent={'space-between'}
								color='black'
								fontFamily={'sans-serif'}
								fontWeight='bold'
								mt='50px'
								borderRadius={'10px'}
								boxShadow={'3px 3px 3px 5px rgba(0,0,0,.1)'}
								w={'80vw'}>
								<>
									<Flex
										fontSize={'12px'}
										flexDirection={'column'}
										key={i}
										gridRowGap='6px'
										borderRadius={'20px'}
										mb='2'>
										<Flex
											fontSize={'12px'}
											fontFamily={'sans-serif'}
											flexDirection={'row'}
											p={'10px 20px 2px 20px'}
											align='center'
											bg='white'
											borderRadius={'10px'}
											justify={'space-between'}>
											<Text>البريد الالكتروني : </Text>
											<Text>{item.data().email}</Text>
										</Flex>
										<Flex
											flexDirection={'row'}
											p={'10px 20px 2px 20px'}
											align='center'
											bg='white'
											borderRadius={'10px'}
											justify={'space-between'}>
											<Text>العنوان : </Text>
											<Text>{item.data().address}</Text>
										</Flex>
										<Flex
											flexDirection={'row'}
											p={'6px 20px'}
											align='center'
											w={'100%'}
											bg='white'
											borderRadius={'10px'}
											justify={'space-between'}>
											<Text>رقم الموبايل : </Text>
											<Text>{item.data().phoneNum}</Text>
										</Flex>

										<Flex
											flexDirection={'row'}
											p={'6px 20px'}
											align='center'
											bg='white'
											borderRadius={'10px'}
											justify={'space-between'}>
											<Text>الاسم : </Text>
											<Text>{item.data().username}</Text>
										</Flex>
										<Flex
											flexDirection={'row'}
											p={'6px 20px'}
											align='center'
											bg='white'
											borderRadius={'10px'}
											justify={'space-between'}>
											<Text>الرقم السري : </Text>
											<Text>{item.data().password}</Text>
										</Flex>
									</Flex>
								</>
							</Flex>
						))}
				</Flex>
			</Flex>
		</>
	);
}
