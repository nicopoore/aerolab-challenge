import {
  Spacer,
  Image,
  Text,
  Button,
  Link,
  ButtonGroup,
  IconButton,
  Stack,
  SkeletonText,
  Tooltip,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { UserType } from '../utils/types';

interface Props {
  user: UserType | 'loading';
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
      {props.user !== 'loading' ? (
        <Text as="h4" fontSize={['xl', '2xl']} lineHeight="45px" mr={2}>
          {props.user.name}
        </Text>
      ) : (
        <SkeletonText mr={2} noOfLines={2} w={28} />
      )}
      <ButtonGroup isAttached>
        <Tooltip label="Transaction history" openDelay={150}>
          <Button pl={5} py={6} onClick={props.openUserHistory}>
            {props.user !== 'loading' ? (
              <Text as="h5" fontSize="xl" mr={2}>
                {props.user.points}
              </Text>
            ) : (
              <SkeletonText mr={2} noOfLines={1} w={8} />
            )}
            <Image mt={1} src="/icons/coin.svg" />
          </Button>
        </Tooltip>
        <Tooltip label="Add more points" openDelay={150}>
          <IconButton
            aria-label="add points"
            icon={<SmallAddIcon />}
            pr={5}
            py={6}
            onClick={props.openAddPoints}
          />
        </Tooltip>
      </ButtonGroup>
    </Stack>
  );
};

export default Header;
