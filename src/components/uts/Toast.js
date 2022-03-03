import { createStandaloneToast } from '@chakra-ui/react';
const toast = createStandaloneToast();

export default function Toast(
	text,
	description,
	type = 'error',
) {
	return toast({
		title: text,
		position: 'top-right',
		description: description && description,
		status: `${type}`,
		duration: 3000,
	});
}
