import { Flex, Text } from '@chakra-ui/react';

const Banner: React.FC = (): JSX.Element => {
  return (
    <Flex alignItems="flex-end" bgImage="url(/header-x2.png)" bgSize="100%" h="400px" w="100%">
      <Text color="white" fontSize="6xl" fontWeight="bold" mb={8} ml={24}>
        Electronics
      </Text>
    </Flex>
  );
};

export default Banner;
