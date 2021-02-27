import { Flex, Spacer, Image, Text, Button, Icon, Link } from '@chakra-ui/react';
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
  const user: User = data;

  return (
    <Flex height="70px" padding={3} width="100%">
      <Link href="/">
        <Image src="/aerolab-logo.svg" />
      </Link>
      <Spacer />
      <Text fontSize="2xl" lineHeight="45px" mr={4}>
        {user.name}
      </Text>
      <Button px={5} py={6}>
        <Text fontSize="xl" mr={2}>
          {user.points}
        </Text>
        <Image mt={1} src="/icons/coin.svg" />
      </Button>
    </Flex>
  );
};

export default Header;
