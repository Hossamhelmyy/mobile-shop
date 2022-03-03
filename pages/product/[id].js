import React, {
	useEffect,
	useState,
	useLayoutEffect,
} from 'react';
import { BsCart2 } from 'react-icons/bs';

import Nav from '../../src/components/layout/Nav';
import {
	Flex,
	Text,
	Checkbox,
	Input,
	InputLeftAddon,
	InputGroup,
	Select,
	Button,
	Image,
} from '@chakra-ui/react';
import Footer from '../../src/components/other/Footer';
import {
	query,
	where,
	collection,
	getDocs,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

function Item({ id }) {
	const db = getFirestore();
	const [myData, setMyData] = useState({});

	useEffect(() => {
		fetch();
	}, []);

	async function fetch() {
		try {
			const fetchData = query(
				collection(db, 'products'),
				where('id', '==', id),
			);
			const item = await getDocs(fetchData);
			item.docs.map((itemm) => setMyData(itemm.data()));
		} catch (e) {
			console.log(e);
		}
	}
	return (
		<>
			<Nav src={'../../public/imgs/logo_bchz-og2.png'} />
			<Flex alignItems={'center'} justifyContent='center'>
				<Text
					display={'inline-block'}
					color={'blue.700'}
					borderBottom='2px solid #2b197a'
					fontSize={'28px'}
					pt='20px'
					fontWeight='bold'
					fontFamily='sans-serif'>
					Product Details
				</Text>
			</Flex>
			<Flex
				pb={'50px'}
				alignItems={'center'}
				justifyContent='space-around'>
				<Flex
					mt={'-110px'}
					flexDirection='column'
					alignItems={'center'}
					flexBasis={'50%'}>
					<Flex pb={'30px'}>
						<Text
							fontFamily={'sans-serif'}
							color={'blue.600'}
							fontSize={'20px'}
							fontWeight='bold'>
							{myData.name}
						</Text>
					</Flex>
					<Image
						boxShadow={'3px 3px 3px 5px rgba(0,0,0,.1)'}
						maxW={'460px'}
						alt='img'
						pb={'40px'}
						src={myData.img}
						transition='all .5s ease-in'
						_hover={{ transform: 'scale(1.04)' }}
					/>
					<Button
						mt={'20px'}
						w='460px'
						p={'4px 0'}
						// onClick={() => {
						// 	addToCart(doc.data(), doc.id);
						// 	Toast(' تمت الاضافة بنجاح', null, 'success');
						// }}
						dir='ltr'
						leftIcon={<BsCart2 fontSize={'1.3rem'} />}
						fontSize='sm'
						size='sm'
						colorScheme={'blue'}>
						أضف الي العربة
					</Button>
				</Flex>
				<Flex
					mt={'50px'}
					gridRowGap='8px'
					flexDirection={'column'}
					justifyContent={'space-between'}
					color='blue.600'
					fontFamily={'sans-serif'}
					fontWeight='bold'
					boxShadow={'3px 3px 3px 5px rgba(0,0,0,.1)'}
					w={'40vw'}>
					<Flex
						flexDirection={'row'}
						p={'10px 20px 2px 20px'}
						align='center'
						justify={'space-between'}>
						<Text>الماركة : </Text>
						<Text>{myData.brand}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						w={'100%'}
						bg={'gray.100'}
						justify={'space-between'}>
						<Text>رقم الموديل : </Text>
						<Text>{myData.modelNum}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						justify={'space-between'}>
						<Text>موديل المنتج : </Text>
						<Text>{myData.productModel}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						bg={'gray.100'}
						align='center'
						justify={'space-between'}>
						<Text>المعالج : </Text>
						<Text>{myData.cpu}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						justify={'space-between'}>
						<Text>جيل المعالج : </Text>
						<Text>{myData.cpuGenerate}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						bg={'gray.100'}
						align='center'
						justify={'space-between'}>
						<Text>تفاصيل المعالج : </Text>
						<Text>{myData.cpuDetails}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						justify={'space-between'}>
						<Text>كارت الشاشة : </Text>
						<Text>{myData.graphicsCard}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						bg={'gray.100'}
						justify={'space-between'}>
						<Text>مساحه كارت الشاشه : </Text>
						<Text>{myData.graphicsCardSize}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						justify={'space-between'}>
						<Text>السعر : </Text>
						<Text>{myData.price}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						bg={'gray.100'}
						align='center'
						justify={'space-between'}>
						<Text>سعة الذاكرة : </Text>
						<Text>{myData.memorySize}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						justify={'space-between'}>
						<Text>سعه التخزين : </Text>
						<Text>{myData.HardSize}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						bg={'gray.100'}
						align='center'
						justify={'space-between'}>
						<Text>مقاس الشاشه : </Text>
						<Text>{myData.monitorSize}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						justify={'space-between'}>
						<Text>جوده الشاشه : </Text>
						<Text>{myData.monitorQuality}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						bg={'gray.100'}
						justify={'space-between'}>
						<Text>معدل تحديث الشاشة : </Text>
						<Text>{myData.rateOfUpdatingMonitor}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						justify={'space-between'}>
						<Text>نظام التشغيل : </Text>
						<Text>{myData.windows}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						bg={'gray.100'}
						justify={'space-between'}>
						<Text>يدعم اس اس دي : </Text>
						<Text>{myData.ssd}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						justify={'space-between'}>
						<Text>الكاميرا : </Text>
						<Text>{myData.camera}</Text>
					</Flex>
					<Flex
						flexDirection={'row'}
						p={'6px 20px'}
						align='center'
						bg={'gray.100'}
						justify={'space-between'}>
						<Text>الضمان : </Text>
						<Text>{myData.warranty}</Text>
					</Flex>
				</Flex>
			</Flex>
			<Footer />
		</>
	);
}

export default Item;
Item.getInitialProps = ({ query }) => {
	return { id: query?.id };
};
