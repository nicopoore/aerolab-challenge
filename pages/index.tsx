import { Box } from '@chakra-ui/react';
import { Products, Header, Banner } from '../components';

const Home: React.FC = (): JSX.Element => {
  return (
    <Box maxWidth={1300} mx="auto">
      <Header />
      <Banner />
      <Products itemsPerPage={16} />
    </Box>
  );
};

export default Home;
