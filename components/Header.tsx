import { Flex, Spacer, Image } from '@chakra-ui/react';
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

interface User {
  _id: string;
  name: string;
  points: number;
  createDate: Date;
  redeemHistory: [];
  __v: number;
}

const Header: React.FC = (): JSX.Element => {
  const { data, error } = useSWR('/api/user/me', fetcher);

  if (error) return <p>Error fetching user</p>;
  if (!data) return <p>Loading user</p>;

  return (
    <Flex width="100%">
      <Image src="/aerolab-logo.svg" />
      <Spacer />
      {data.name}
      {data.points}
    </Flex>
  );
};

export default Header;
