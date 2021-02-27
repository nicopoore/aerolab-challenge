import { Box } from '@chakra-ui/react';
import { Products, Header, Banner } from '../components';

const Home: React.FC = (): JSX.Element => {
  return (
    <Box maxWidth={1300} mt={50} mx="auto">
      <Header />
      <Banner />
      <Products />
    </Box>
  );
};

export default Home;
