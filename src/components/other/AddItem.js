import { AiOutlineCaretDown } from 'react-icons/ai';
import { Spinner } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import {
	Flex,
	Text,
	Checkbox,
	Input,
	InputLeftAddon,
	InputGroup,
	Select,
	Button,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import InputFile from './InputFile';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
// import { useStore } from '../../store/store';
import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} from 'firebase/storage';
import {
	collection,
	addDoc,
	serverTimestamp,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

import Loader from '../uts/Loader';
import swal from 'sweetalert';
export default function AddItem() {
	const [imageFile, setImageFile] = useState('');
	const [star, setStar] = useState(false);
	const [loading, setLoading] = useState(false);
	const db = getFirestore();
	const [type, setType] = useState('');

	useEffect(() => {
		if (imageFile) {
			formik.setFieldValue('img', imageFile.name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageFile]);

	const validate = (values) => {
		let errors = {};

		if (
			!values.name ||
			!values.price ||
			!values.modelNum ||
			!values.productModel ||
			!values.cpu ||
			!values.cpuGenerate ||
			!values.cpuDetails ||
			!values.graphicsCard ||
			!values.graphicsCardSize ||
			!values.memorySize ||
			!values.HardSize ||
			!values.monitorSize ||
			!values.monitorQuality ||
			!values.rateOfUpdatingMonitor ||
			!values.windows ||
			!values.ssd ||
			!values.warranty ||
			!values.brand ||
			!values.type ||
			!values.img ||
			!values.camera
		) {
			errors.message = 'البيانات غير مكتمله';
		}
		return errors;
	};
	const drugInfo = [
		{ label: 'اسم المنتج', name: 'name' },
		{ label: 'رقم الموديل', name: 'modelNum' },
		{ label: 'موديل المنتج', name: 'productModel' },
		{ label: 'المعالج', name: 'cpu' },
		{ label: 'جيل المعالج', name: 'cpuGenerate' },
		{ label: 'تفاصيل المعالج', name: 'cpuDetails' },
		{ label: 'كارت الشاشه', name: 'graphicsCard' },
		{
			label: 'مساحه كارت الشاشه',
			name: 'graphicsCardSize',
		},
		{ label: 'سعه الذاكره', name: 'memorySize' },
		{ label: 'سعه التخزين', name: 'HardSize' },
		{ label: 'مقاس الشاشه', name: 'monitorSize' },
		{ label: 'جوده الشاشه', name: 'monitorQuality' },
		{
			label: 'معدل تحديث الشاشة',
			name: 'rateOfUpdatingMonitor',
		},
		{ label: 'نظام التشغيل', name: 'windows' },

		{ label: 'يدعم اس اس دي', name: 'ssd' },

		{ label: 'الكاميرا', name: 'camera' },
		{ label: 'الضمان', name: 'warranty' },
		{ label: 'السعر', name: 'price' },
	];
	console.log(type);
	const addDrug = async () => {
		console.log(uuidv4());
		setLoading(true);
		const storage = getStorage();
		const imgName = imageFile.name;
		const storageRef = ref(storage, imgName);
		try {
			const uploadedFile = await uploadBytes(
				storageRef,
				imageFile,
			);
			console.log(uploadedFile);

			if (uploadedFile) {
				const imgURL = await getDownloadURL(
					uploadedFile.ref,
				);

				const fireStoreData = await addDoc(
					collection(db, 'products'),
					{
						...formik.values,
						img: imgURL,
						star: star,
						createdAt: serverTimestamp(),
						id: uuidv4(),
					},
				);
				console.log(fireStoreData);
			}
			setLoading(false);
			swal({
				title: 'Good job!',
				text: 'item has been added',
				icon: 'success',
				button: 'ok',
			});
		} catch (error) {
			console.error(error.message);
			swal({
				title: 'Erorr happens',
				text: 'something went wrong',
				icon: 'warning',
				buttons: 'Try Again',
				dangerMode: true,
			});
			setLoading(false);
		}
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			type: '',
			brand: '',
			img: '',
			modelNum: '',
			productModel: '',
			cpu: '',
			cpuGenerate: '',
			cpuDetails: '',
			graphicsCard: '',
			graphicsCardSize: '',
			memorySize: '',
			HardSize: '',
			monitorSize: '',
			monitorQuality: '',
			rateOfUpdatingMonitor: '',

			windows: '',
			keyboard: '',
			ssd: '',
			charger: '',
			camera: '',
			warranty: '',
			price: '',
		},
		validate,
		onSubmit: (values) => {
			addDrug();
			console.log(values);
		},
	});

	return (
		<>
			{loading && <Loader />}
			{!loading && (
				<Flex
					maxW={1000}
					margin='18px auto'
					bg='gray.100'
					p='18px 70px'
					borderRadius={'xl'}
					flexDirection={'column'}>
					<form onSubmit={formik.handleSubmit}>
						<Flex justifyContent={'center'} pb={'28px'}>
							<Text
								color={'red'}
								fontWeight={'bold'}
								fontSize={'24px'}>
								<NextLink href='/'>
									الصفحه الرئيسية
								</NextLink>
							</Text>
						</Flex>
						<Flex
							flexWrap={'wrap'}
							gridGap={10}
							alignItems='center'
							justifyContent={'center'}>
							{drugInfo.map((item) => (
								<InputGroup
									flexDirection={{
										base: 'column',
										md: 'row',
									}}
									flexBasis={'230px'}
									key={item.name}>
									<InputLeftAddon
										fontSize={'12px'}
										textAlign='center'
										border='2px'
										borderColor={'purple.300'}
										w='100px'
										height='30px'
										// eslint-disable-next-line react/no-children-prop
										children={item.label}
									/>
									<Input
										onChange={formik.handleChange}
										name={item.name}
										type={
											item.name === 'price'
												? 'number'
												: 'text'
										}
										border={'2px'}
										bg='white'
										borderColor={'gray.600'}
										height='30px'
										value={formik.values[item.name]}
									/>
								</InputGroup>
							))}

							<Select
								size='sm'
								icon={<AiOutlineCaretDown />}
								className='select-menu'
								maxW='300px'
								bg='white'
								border='2px'
								borderRadius={'xl'}
								borderColor={'purple.400'}
								p='3'
								isRequired
								onChange={(e) => {
									formik.setFieldValue(
										'type',
										e.target.value,
									);
									setType(e.target.value);
								}}
								placeholder='نوع المنتج'>
								<option value='other'>Accessories</option>
								<option value='laptops'>Laptops</option>
								<option value='pcs'>Pcs</option>
							</Select>

							<Select
								size='sm'
								icon={<AiOutlineCaretDown />}
								className='select-menu'
								maxW='280px'
								bg='white'
								border='2px'
								borderRadius={'xl'}
								borderColor={'purple.400'}
								p='2'
								isRequired
								onChange={(e) =>
									formik.setFieldValue(
										'brand',
										e.target.value,
									)
								}
								placeholder='الماركه'>
								{type === 'other' ? (
									<>
										{' '}
										<option value='Mouses'>Mouses</option>
										<option value='Keyboards'>
											Keyboards
										</option>
										<option value='Charger'>Charger</option>
										<option value='Head Phone'>
											Head Phone
										</option>
										<option value='Pada'>Pada</option>
									</>
								) : (
									<>
										<option value='Lenuvu'>Lenuvu</option>
										<option value='Hp'>Hp</option>
										<option value='Apple'>Apple</option>
										<option value='Dell'>Dell</option>{' '}
									</>
								)}
							</Select>
							<Flex mb='4' alignItems='center'>
								<Text fontWeight={'bold'}>
									عرض في المنتجات المميزة
								</Text>
								<Flex px='8' dir='ltr'>
									<Checkbox
										isInvalid={!star ? true : false}
										onChange={() => setStar(!star)}
										size='lg'
										colorScheme='green'>
										نعم
									</Checkbox>
								</Flex>
							</Flex>
						</Flex>

						<InputFile setImageFile={setImageFile} />

						<Flex
							justifyContent='center'
							mt='9'
							gridGap='3'>
							<Button
								w='300px'
								fontSize='15px'
								bg={'green.400'}
								color={'white'}
								onClick={formik.handleSubmit}
								type='submit'
								_hover={{
									bg: 'green.500',
								}}>
								اضف المنتج
							</Button>
							{formik.values !== formik.initialValues && (
								<Button
									w='300px'
									fontSize='15px'
									colorScheme='red'
									onClick={(e) => {
										formik.handleReset(e);
									}}>
									الغاء
								</Button>
							)}
						</Flex>
					</form>
				</Flex>
			)}
		</>
	);
}
