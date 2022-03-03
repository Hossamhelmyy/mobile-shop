import {
	Select,
	Flex,
	Text,
	Icon,
	Button,
	Img,
	IconButton,
} from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useStore } from '../../../store/Store';
export default function CartItem() {
	const cartItems = useStore((state) => state.cartItems);

	const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const removeFromCart = useStore(
		(state) => state.removeFromCart,
	);
	const updateCart = useStore((state) => state.updateCart);
	return (
		<>
			{cartItems?.length > 0 &&
				cartItems.map((item, i) => (
					<Flex
						p='2'
						flexDirection={{ base: 'column', sm: 'row ' }}
						gridGap='3'
						borderBottom={'1px'}
						borderColor={'gray.100'}
						key={i}>
						<Flex
							boxShadow={'1px 1px 3px  rgba(0,0,0,.1)'}
							justifyContent={'center'}
							flex='1'>
							<Img w='110px' src={item?.product.img} />
						</Flex>
						<Flex
							flex='3'
							flexDirection='column'
							flexWrap={'wrap'}
							gridGap={'2'}>
							<Flex
								alignItems={'center'}
								justifyContent='space-between'
								gridGap={'3'}>
								<Text
									fontFamily={'sans-serif'}
									fontSize='14px'
									fontWeight={'bold'}>
									{item.product.name}
								</Text>
								<Text color='green.500'>{item.price}</Text>
							</Flex>
							<Flex
								alignItems={'center'}
								justifyContent={'space-between'}>
								<Select
									onChange={(e) =>
										updateCart(item.id, e.target.value)
									}
									defaultValue={item.quantity}
									w='60px'
									dir='ltr'
									variant='filled'>
									{values.map((value) => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</Select>
							</Flex>
						</Flex>
						<IconButton
							onClick={() => removeFromCart(item.id)}
							colorScheme={'red'}
							icon={<AiOutlineDelete />}
						/>
					</Flex>
				))}
		</>
	);
}
