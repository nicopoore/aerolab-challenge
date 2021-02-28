import { Flex, Spacer, Image, Text, Button, Link } from '@chakra-ui/react';
import { User } from '../types';

interface Props {
  user: User;
}

const Header: React.FC<Props> = (props): JSX.Element => {
  return (
    <Flex alignItems="center" height="70px" padding={3} width="100%">
      <Link href="/">
        <Image src="/aerolab-logo.svg" />
      </Link>
      <Spacer />
      <Text fontSize="2xl" lineHeight="45px" mr={4}>
        {props.user.name}
      </Text>
      <Button px={5} py={6}>
        <Text fontSize="xl" mr={2}>
          {props.user.points}
        </Text>
        <Image mt={1} src="/icons/coin.svg" />
      </Button>
    </Flex>
  );
};

export default Header;
