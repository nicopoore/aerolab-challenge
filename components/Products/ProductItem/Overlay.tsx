import { Box, Flex, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { Product } from '../../../types';

interface Props {
  visible: boolean;
  product: Product;
}

const Overlay: React.FC<Props> = (props): JSX.Element => {
  return (
    <Box h="100%" left={0} position="absolute" top={0} w="100%">
      <Box
        bg="cyan.300"
        h="100%"
        left={0}
        opacity={props.visible ? '.95' : '0'}
        position="absolute"
        top={0}
        transition="opacity .2s"
        w="100%"
      />
      <Flex
        alignItems="center"
        h="100%"
        justify="center"
        opacity={props.visible ? '1' : '0'}
        transition="opacity .2s"
        w="100%"
      >
        <Flex>
          <Text color="white" fontSize="xl" fontWeight="bold" mr={1} zIndex={1}>
            {props.product.cost}
          </Text>
          <Image src="/icons/coin.svg" zIndex={1} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Overlay;
