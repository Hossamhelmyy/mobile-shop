import {
	Input,
	Flex,
	Button,
	Img,
	Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

export default function InputFile({ setImageFile }) {
	const imgInputRef = useRef('');
	const [theImgPrivew, setTheImgPrivew] = useState('');
	const [preview, setPreview] = useState('');
	const [uiSize, setUiSize] = useState('');
	useEffect(() => {
		if (!theImgPrivew) return;
		setImageFile(theImgPrivew);
		const filePreview =
			window?.URL?.createObjectURL(theImgPrivew);
		setPreview(filePreview);
		return () => window.URL.revokeObjectURL(filePreview);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theImgPrivew]);
	const handleImageChange = (e, file) => {
		const imgFile = file ? file : e.target.files[0];
		if (imgFile) {
			if (imgFile.type.indexOf('image') === -1) return;
			const size = imgFile.size / 1024 / 1024;
			console.log(size);
			setUiSize(size.toString().slice(0, 5) + 'MB');
			setTheImgPrivew(imgFile);
		}
	};
	return (
		<Flex
			p='2'
			gridGap={'10px'}
			alignItems={'center'}
			flexDirection={'column'}
			bg='gray.200'>
			<Text fontWeight={'bold'} fontSize={'2xl'}>
				اضف صورة المنتج
			</Text>
			<Flex flexWrap={'wrap'} gridGap='4'>
				{preview && (
					<Flex
						flexDirection={'column'}
						alignItems={'center'}
						flex='1'>
						<Img src={preview} boxSize={'150px'} />
						<Text> حجم الصورة{uiSize} </Text>
					</Flex>
				)}
				<Flex
					flexDirection={'column'}
					p='4'
					flex='1'
					alignItems={'center'}
					border='2px'
					style={{ borderStyle: 'dashed' }}
					borderRadius={'xl'}
					// draggable
					onDragOver={(e) => e.preventDefault()}
					onDrop={(e) => {
						const imgFile = e.dataTransfer.files[0];
						if (imgFile) handleImageChange(e, imgFile);
					}}
					borderColor={'gray.600'}>
					<Button
						mt='7'
						onClick={() => imgInputRef.current.click()}
						colorScheme={'purple'}>
						{preview ? 'تغيير الصورة' : 'اضافة صورة'}
					</Button>
					<Input
						type='file'
						onChange={handleImageChange}
						name='file'
						ref={imgInputRef}
						// display={'none'}
						opacity={'0'}
					/>
					<Text>او اسحب الملف وضعه هنا</Text>
				</Flex>
			</Flex>
		</Flex>
	);
}
