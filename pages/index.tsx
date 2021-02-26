import { Box } from '@chakra-ui/react';
import useSWR from 'swr';

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
  const { data, error } = useSWR('/api/user/history', fetcher);

  if (error) return <p>error</p>;
  if (!data) return <p>loading</p>;

  return <Box>Helloooo {console.log(data)}</Box>;
};

export default Home;
