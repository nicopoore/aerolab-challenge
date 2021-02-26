import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

const AerolabChallenge: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default AerolabChallenge;
