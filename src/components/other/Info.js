import {
	Image,
	Flex,
	Text,
	Button,
	WrapItem,
} from '@chakra-ui/react';
const adButtons = [
	{ text1: '100%', text2: 'الجوده', color: 'blue' },
	{ text1: '100%', text2: 'ثقه', color: 'red' },
];
export default function Info() {
	return (
		<>
			<Flex
				// borderBottom={'1px solid #0b173b'}
				flexDirection={{ base: 'column', md: 'row' }}
				gridGap={5}
				minH={{ base: '46vh', md: '60vh' }}
				height='auto'
				p={'40px , 10px , 20px , 10px'}
				marginBottom={'30px'}
				backgroundColor={'gray.100'}
				alignItems={'center'}>
				<Flex flex='1' justifyContent={'center'}>
					<Image
						textAlign={'center'}
						maxW={{ base: '200px', sm: '500px' }}
						src='/imgs/Winter-haven-FL-computer-repair.png'
						alt='computers'
					/>
				</Flex>
				<Flex
					flex='1'
					alignItems={'center'}
					flexDirection={'column'}>
					<Text
						mb='1'
						color='gray.800'
						fontSize={{ base: 'md', sm: '38px' }}
						fontWeight={'bold'}>
						أحدث أجهزه و أقل سعر.
					</Text>
					<Text mb='8' color='gray.500' fontSize={'20px'}>
						كل اجهزتك عندنا و بأقل تكلفه
					</Text>
					{/* button */}
					<Flex dir='ltr' gridGap={'2'}>
						{adButtons.map((info) => (
							<Button
								size='sm'
								flexDirection={'column'}
								alignItems={'center'}
								colorScheme={info.color}
								p={{ base: '2', sm: '8' }}
								key={info.text2}>
								<Text
									fontSize={{ base: '10px', sm: '14px' }}
									fontWeight={'bold'}>
									{' '}
									{info.text1}
								</Text>
								<Text
									fontSize={{ base: '10px', sm: '14px' }}
									fontWeight={'bold'}>
									{' '}
									{info.text2}{' '}
								</Text>
							</Button>
						))}
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
