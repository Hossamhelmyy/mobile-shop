import React from 'react';
import {
	Flex,
	Image,
	Text,
	IconButton,
} from '@chakra-ui/react';
import { BsFacebook } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { IoLogoWhatsapp } from 'react-icons/io';

function Footer() {
	const router = useRouter();
	return (
		<Flex
			flexDirection={{ base: 'column', md: 'row' }}
			p='7'
			// height={'30vh'}
			alignItems={'center'}
			justifyContent={'space-between'}
			bg='gray.700'
			//   bgGradient='linear(to-r, gray.500, gray.700)'
		>
			<Flex alignItems={'center'} flexDirection={'column'}>
				<Text
					fontSize={'28px'}
					fontWeight={'bold'}
					mb={'2'}
					color={'gray.100'}>
					Laptop Egypt
				</Text>
				<Flex
					cursor={'pointer'}
					onClick={() =>
						router.push(
							'https://www.linkedin.com/in/belalhaiss/',
						)
					}
					dir='ltr'
					gridGap='1'
					alignItems={'center'}>
					<Text
						fontWeight={'bold'}
						mb='20px'
						color='gray.400'
						fontSize={'12px'}>
						Copyright &copy; 2022 by Hossam Helmy
					</Text>
				</Flex>
			</Flex>
			<Flex alignItems={'center'} justifyContent={'center'}>
				<Text
					marginLeft={'10px'}
					fontWeight={'bold'}
					color='gray.400'
					fontSize={'18px'}>
					تواصل معنا علي :
				</Text>
				<IconButton
					cursor={'pointer'}
					ml={'9px'}
					aria-label='whatsapp'
					colorScheme={'whatsapp'}
					icon={<IoLogoWhatsapp />}
				/>
				<IconButton
					colorScheme={'facebook'}
					cursor={'pointer'}
					arial-label='facebook'
					icon={<BsFacebook />}
				/>
			</Flex>
		</Flex>
	);
}

export default Footer;
