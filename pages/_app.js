import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { firebaseApp } from '../firebase/firebase';
import { Provider, useCreateStore } from '../store/Store';

function MyApp({ Component, pageProps }) {
	const createStore = useCreateStore(
		pageProps.initialZustandState,
	);

	return (
		<Provider createStore={createStore}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	);
}
export default MyApp;
