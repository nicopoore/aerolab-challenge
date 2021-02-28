import {
  Spacer,
  Image,
  Text,
  Button,
  Link,
  ButtonGroup,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { UserType } from '../utils/types';

interface Props {
  user: UserType;
  openAddPoints: () => void;
  openUserHistory: () => void;
}

const Header: React.FC<Props> = (props): JSX.Element => {
  return (
    <Stack alignItems="center" direction="row" height="70px" padding={3} width="100%">
      <Link href="/">
        <Image src="/aerolab-logo.svg" />
      </Link>
      <Spacer />
      <Text fontSize="2xl" lineHeight="45px" mr={4}>
        {props.user.name}
      </Text>
      <ButtonGroup isAttached>
        <Button pl={5} py={6} onClick={props.openUserHistory}>
          <Text fontSize="xl" mr={2}>
            {props.user.points}
          </Text>
          <Image mt={1} src="/icons/coin.svg" />
        </Button>
        <IconButton
          aria-label="add points"
          icon={<SmallAddIcon />}
          pr={5}
          py={6}
          onClick={props.openAddPoints}
        />
      </ButtonGroup>
    </Stack>
  );
};

export default Header;
