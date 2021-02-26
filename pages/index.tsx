import { Box } from '@chakra-ui/react';
import { Products, Header, Banner } from '../components';

const Home: React.FC = (): JSX.Element => {
  return (
    <Box margin="auto" maxWidth={1400}>
      <Header />
      <Banner />
      <Products />
    </Box>
  );
};

export default Home;
