import { Box, Divider, Button, Text } from '@chakra-ui/react';

interface Props {
  sort: 'recent' | 'lowest' | 'highest';
  // eslint-disable-next-line no-unused-vars
  setSort: (T: any) => void;
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (T: any) => void;
}

interface buttonProperties {
  name: string;
  onClickParam: 'recent' | 'lowest' | 'highest';
}

const Sorting: React.FC<Props> = (props): JSX.Element => {
  const buttons: buttonProperties[] = [
    {
      name: 'Most recent',
      onClickParam: 'recent',
    },
    {
      name: 'Lowest price',
      onClickParam: 'lowest',
    },
    {
      name: 'Highest price',
      onClickParam: 'highest',
    },
  ];

  const handleClick = <T extends 'recent' | 'lowest' | 'highest'>(newSort: T): void => {
    props.setSort(() => newSort);
    props.setCurrentPage(() => 1);
  };
  return (
    <>
      <Box height="32px">
        <Divider mx={4} orientation="vertical" />
      </Box>
      <Text color="gray.400" fontSize="xl">
        Sort by:
      </Text>
      {buttons.map(button => {
        const active = props.sort === button.onClickParam;
        return (
          <Button
            key={button.name}
            _hover={{ bgColor: active ? 'cyan.400' : 'gray.300' }}
            bgColor={active ? 'cyan.300' : 'gray.200'}
            color={active ? 'white' : 'gray.500'}
            fontSize="lg"
            ml={4}
            onClick={() => handleClick(button.onClickParam)}
          >
            {button.name}
          </Button>
        );
      })}
    </>
  );
};

export default Sorting;
