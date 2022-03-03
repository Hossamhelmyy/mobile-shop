import React, { useState, useEffect } from 'react';
import { Flex, Image } from '@chakra-ui/react';
// import '../../../styles/App.css';
export const SliderData = [
	{
		image: 'imgs/Get_A_qoutation.jpg',
	},
	{
		image: 'imgs/wp2747126-computer-shop-background.jpg',
	},
	{
		image: 'imgs/asus-ux325-2.png',
	},
	{
		image: 'imgs/wp2747165-computer-shop-background.jpg',
	},
	{
		image: 'imgs/intel-league-of-legends.jpg',
	},
];

export default function Ad() {
	const [current, setCurrent] = useState(0);
	const [change, setChange] = useState(true);
	const length = SliderData.length;

	// console.log(length, current);

	useEffect(() => {
		const adset = setTimeout(() => {
			if (current === length - 1) {
				setCurrent(0);
			} else {
				setCurrent(current + 1);
			}
		}, 5000);

		return () => {
			clearTimeout(adset);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [current]);
	if (
		!Array.isArray(SliderData) ||
		SliderData.length <= 0
	) {
		return null;
	}

	return (
		<section className='slider'>
			{SliderData.map((slide, index) => {
				return (
					<Flex
						className={
							index === current ? 'slide active' : 'slide'
						}
						key={index}>
						{index === current && (
							<Image
								h={{ base: '0', md: '50vh', lg: '60vh' }}
								src={slide.image}
								alt='travel image'
								className='image'
							/>
						)}
					</Flex>
				);
			})}
		</section>
	);
}
