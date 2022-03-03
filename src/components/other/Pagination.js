import React from 'react';
import { Flex, IconBu, IconButton } from '@chakra-ui/react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { useState } from 'react';
function Pagination({ setPagination, prevFunc, nextFunc }) {
	const [active, setActive] = useState('');
	return (
		<Flex
			p='3'
			w='100%'
			alignItems={'center'}
			justifyContent={'center'}
			bg='white'>
			<Flex
				px='5'
				py='1'
				justifyContent='center'
				gridGap={'4'}>
				<IconButton
					onClick={() => {
						setActive('next');
						nextFunc();
					}}
					colorScheme={active === 'next' ? 'green' : 'gray'}
					aria-label='التالي'
					icon={<GrNext />}
				/>
				<IconButton
					onClick={() => {
						setActive('prev');
						prevFunc();
					}}
					colorScheme={active === 'prev' ? 'green' : 'gray'}
					aria-label='السابق'
					icon={<GrPrevious />}
				/>
			</Flex>
		</Flex>
	);
}

export default Pagination;
