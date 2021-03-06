import {
	Flex,
	Input,
	InputLeftAddon,
	InputGroup,
	Icon,
	Text,
	Image,
	Button,
	IconButton,
} from '@chakra-ui/react';
// import { useStore } from '../../store/store.js';
import { useFormik } from 'formik';
import { BiHide, BiShow } from 'react-icons/bi';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import swal from 'sweetalert';
import { db } from '../uit/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useStore } from '../../../store/Store';
let errors = [];
let errors2 = [];

export default function Login() {
	const auth = getAuth();
	const userCheck = useStore((state) => state.userCheck);
	const [show, setShow] = useState(false);
	const [LoginForm, setLoginForm] = useState(true);
	const router = useRouter();
	const userbol = useStore((state) => state.user);
	const goToHome = () => {
		router.push('/');
	};
	const validate = (values) => {
		if (LoginForm) {
			if (values.email === '' || values.password === '') {
				errors2.push('required');
			} else {
				errors2 = [];
			}
		} else {
			if (
				values.email === '' ||
				values.password === '' ||
				values.phoneNum === '' ||
				values.address === '' ||
				values.username === ''
			) {
				errors.push('required');
			} else {
				errors = [];
			}
		}
	};
	const formik = useFormik({
		initialValues: {
			username: '',
			address: '',
			phoneNum: '',
			email: '',
			password: '',
		},

		validate,
		onSubmit: (values) => {
			handleLogin();
		},
	});
	console.log(formik.errors);
	const email = formik.values?.email;
	const username = formik.values.username;
	const phoneNum = formik.values.phoneNum;
	const address = formik.values.address;
	const passWord = formik.values?.password;

	const handleLogin = async (e) => {
		if (LoginForm) {
		} else {
			try {
				const userCardential =
					await createUserWithEmailAndPassword(
						auth,
						email,
						passWord,
					);
				if (userCardential) {
					const docRef = await addDoc(
						collection(db, 'users'),
						{
							email: email,
							username: username,
							phoneNum: phoneNum,
							password: passWord,
							address: address,
							admin: false,
							uid: userCardential.user.uid,
						},
					);
					swal({
						title: '?????????? ??????????',
						text: '???? ?????????????? ??????????',
						icon: '????',
						button: 'ok',
					});
					userCheck(userCardential.user);
					router.push('/');
				}
			} catch (e) {
				console.log(e);
				return swal({
					title: '???????? ?????? ??????',
					text: `${e}`,
					icon: 'warning',
					buttons: '???????? ?????? ????????',
					dangerMode: true,
				});
			}
		}
	};
	const LoginDone = async () => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				email,
				passWord,
			);
			if (user) {
				swal({
					title: '?????????? ??????????',
					text: '???? ???????????? ??????????',

					button: 'ok',
				});
				userCheck(user.user);
				console.log(userbol);
				router.push('/');
			}
		} catch (e) {
			console.log(e);
			return swal({
				title: '???????? ?????? ??????',
				text: '???????? ???????? ???? ???????????? ???????????????????? ?????? ??????????',
				icon: 'warning',
				buttons: '???????? ?????? ????????',
				dangerMode: true,
			});
		}
	};
	return (
		<Flex
			flex='3'
			p='5'
			flexDirection={'column'}
			alignItems={'center'}>
			<Flex alignItems={'center'} gridGap={3}>
				<Text
					onClick={goToHome}
					cursor={'pointer'}
					color='blue.900'
					fontSize={'3xl'}
					fontWeight={'bolder'}>
					Laptop Egypt
				</Text>
			</Flex>

			<Flex
				flexDirection={'column'}
				p='50px 78px'
				mt='4'
				border={'2px'}
				borderColor={'blue.400'}
				backgroundColor={'gray.100'}
				alignItems={'center'}>
				<Text
					fontSize='xl'
					fontWeight={'bold'}
					color='gray.600'>
					?????????? ????????????
				</Text>
				<form onSubmit={formik.handleSubmit}>
					{LoginForm && (
						<Flex dir='rtl' mt='3' flexDirection={'column'}>
							{' '}
							<InputGroup
								flexDirection={{
									base: 'column',
									sm: 'row',
								}}
								mb='3'>
								<InputLeftAddon
									border='2px'
									borderColor={'blue.400'}
									w='90px'
									// eslint-disable-next-line react/no-children-prop
									children='????????????'
								/>
								<Input
									border={'2px'}
									borderColor={'gray.600'}
									type='email'
									color='blue.800'
									name='email'
									value={formik.values.email}
									onChange={formik.handleChange}
									placeholder='hossam@gmail.com'
								/>
							</InputGroup>
							<InputGroup
								flexDirection={{
									base: 'column',
									sm: 'row',
								}}>
								<InputLeftAddon
									border='2px'
									borderColor={'blue.400'}
									w='90px'
									// eslint-disable-next-line react/no-children-prop
									children='???????? ????????'
								/>
								<Flex position={'relative'}>
									<Input
										border={'2px'}
										borderColor={'gray.600'}
										type={!show ? 'password' : 'text'}
										name='password'
										value={formik.values.password}
										onChange={formik.handleChange}
										zIndex={1}
										flex='1'
										color='blue.800'
										placeholder='***********'
									/>

									<IconButton
										position={'absolute'}
										top='1.5'
										zIndex={10}
										left='1.5'
										colorScheme={show ? 'red' : 'blue'}
										aria-label={show ? '??????????' : '??????????'}
										icon={!show ? <BiHide /> : <BiShow />}
										h='1.75rem'
										size='sm'
										onClick={() =>
											setShow(!show)
										}></IconButton>
								</Flex>
							</InputGroup>
							<Text
								cursor={'pointer'}
								pt={'13px'}
								fontWeight='bold'
								fontSize='17px'
								onClick={() => setLoginForm(false)}
								color='blue'>
								?????? ???????? ?????????? ?? ???????? ??????????????
							</Text>
							<Button
								colorScheme={'blue'}
								onClick={LoginDone}
								type='submit'
								disabled={errors2.length > 0}
								mt='10'>
								????????????
							</Button>
						</Flex>
					)}
					{!LoginForm && (
						<Flex dir='rtl' mt='3' flexDirection={'column'}>
							<InputGroup
								flexDirection={{
									base: 'column',
									sm: 'row',
								}}
								mb='3'>
								<InputLeftAddon
									border='2px'
									borderColor={'blue.400'}
									w='90px'
									// eslint-disable-next-line react/no-children-prop
									children='??????????'
								/>
								<Input
									border={'2px'}
									borderColor={'gray.600'}
									type='text'
									color='blue.800'
									name='username'
									value={formik.values.username}
									onChange={formik.handleChange}
									placeholder='hossam'
								/>
							</InputGroup>
							<InputGroup
								flexDirection={{
									base: 'column',
									sm: 'row',
								}}
								mb='3'>
								<InputLeftAddon
									border='2px'
									borderColor={'blue.400'}
									w='90px'
									// eslint-disable-next-line react/no-children-prop
									children='??????????????'
								/>
								<Input
									border={'2px'}
									borderColor={'gray.600'}
									type='text'
									color='blue.800'
									name='address'
									value={formik.values.address}
									onChange={formik.handleChange}
									placeholder='??????????????'
								/>
							</InputGroup>
							<InputGroup
								flexDirection={{
									base: 'column',
									sm: 'row',
								}}
								mb='3'>
								<InputLeftAddon
									border='2px'
									borderColor={'blue.400'}
									w='90px'
									// eslint-disable-next-line react/no-children-prop
									children='?????? ????????????????'
								/>
								<Input
									border={'2px'}
									borderColor={'gray.600'}
									type='number'
									color='blue.800'
									name='phoneNum'
									value={formik.values.phoneNum}
									onChange={formik.handleChange}
									placeholder='???????? ?????? ???????????????? '
								/>
							</InputGroup>
							<InputGroup
								flexDirection={{
									base: 'column',
									sm: 'row',
								}}
								mb='3'>
								<InputLeftAddon
									border='2px'
									borderColor={'blue.400'}
									w='90px'
									// eslint-disable-next-line react/no-children-prop
									children='????????????'
								/>
								<Input
									border={'2px'}
									borderColor={'gray.600'}
									type='email'
									color='blue.800'
									name='email'
									value={formik.values.email}
									onChange={formik.handleChange}
									placeholder='hossam@gmail.com'
								/>
							</InputGroup>
							<InputGroup
								flexDirection={{
									base: 'column',
									sm: 'row',
								}}>
								<InputLeftAddon
									border='2px'
									borderColor={'blue.400'}
									w='90px'
									// eslint-disable-next-line react/no-children-prop
									children='???????? ????????'
								/>
								<Flex position={'relative'}>
									<Input
										border={'2px'}
										borderColor={'gray.600'}
										type={!show ? 'password' : 'text'}
										name='password'
										value={formik.values.password}
										onChange={formik.handleChange}
										zIndex={1}
										flex='1'
										color='blue.800'
										placeholder='***********'
									/>

									<IconButton
										position={'absolute'}
										top='1.5'
										zIndex={10}
										left='1.5'
										colorScheme={show ? 'red' : 'blue'}
										aria-label={show ? '??????????' : '??????????'}
										icon={!show ? <BiHide /> : <BiShow />}
										h='1.75rem'
										size='sm'
										onClick={() =>
											setShow(!show)
										}></IconButton>
								</Flex>
							</InputGroup>
							<Text
								cursor={'pointer'}
								pt={'13px'}
								fontWeight='bold'
								fontSize='17px'
								onClick={() => setLoginForm(true)}
								color='blue'>
								???????? ???????????? ?????????? ??
							</Text>
							<Button
								colorScheme={'blue'}
								type='submit'
								disabled={errors.length > 0}
								mt='10'>
								??????????????
							</Button>
						</Flex>
					)}
				</form>
			</Flex>
		</Flex>
	);
}
