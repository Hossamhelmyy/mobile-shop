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
import { db } from '../firebase/Firebase';
export default function Users() {
	const [myData, setmyData] = useState([]);

	console.log(myData);
	useEffect(() => {
		fetch();
	}, []);

	async function fetch() {
		try {
			const fetchData = query(
				collection(db, 'users'),
				where('admin', '==', false),
			);
			const item = await getDocs(fetchData);
			setmyData(item.docs);
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
				minH={'100vh'}>
				<Flex
					flexDirection={'column'}
					flexWrap='wrap'
					alignItems={'center'}
					p={'4'}>
					<Text
						fontSize={'26px'}
						borderBottom='2px solid #000'
						color='#3a3737'
						mt={'20px'}
						textAlign={'center'}
						fontWeight={'bold'}>
						المستخدمين
					</Text>

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
								mt='30px'
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
									</Flex>
								</>
							</Flex>
						))}
				</Flex>
			</Flex>
		</>
	);
}
