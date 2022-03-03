import { Flex, Spinner, Text } from '@chakra-ui/react';

export default function Loader({ color }) {
	return (
		<Flex
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			margin=' 60px 0 0 0'>
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.400'
				color={color ? color : 'red'}
				size='xl'
			/>
			<Text
				fontWeight='bold'
				color={color ? color : 'red'}
				fontSize='18px'>
				...
			</Text>
		</Flex>
	);
}
