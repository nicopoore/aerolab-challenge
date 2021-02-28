import { Box } from '@chakra-ui/react';
import useSWR from 'swr';
import { Products, Header, Banner } from '../components';
import { User } from '../types';

const fetcher = async (url: string): Promise<any> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  }).then(res => res.json());

const Home: React.FC = (): JSX.Element => {
  const { data, error } = useSWR('/api/user/me', fetcher);

  if (error) return <p>Error fetching user</p>;
  if (!data) return <p>Loading user</p>;
  const user: User = data;
  return (
    <Box maxWidth={1300} mx="auto">
      <Header user={user} />
      <Banner />
      <Products itemsPerPage={16} user={user} />
    </Box>
  );
};

export default Home;
