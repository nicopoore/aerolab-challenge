import { Box, Flex, Text, Image, Button } from '@chakra-ui/react';
import React from 'react';
import { Product } from '../../../types';

interface Props {
  visible: boolean;
  product: Product;
  difference: number;
}

const Overlay: React.FC<Props> = (props): JSX.Element => {
  const affordable = props.difference < 0;
  return (
    <Box h="100%" left={0} position="absolute" top={0} w="100%">
      <Box
        bg={`${affordable ? 'cyan' : 'red'}.300`}
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
        direction="column"
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
        {affordable ? (
          <Button mt={2}>Redeem now</Button>
        ) : (
          <>
            <Text color="white" fontSize="lg" zIndex={1}>
              You need {props.difference}
            </Text>
            <Button mt={2}>Get more points</Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Overlay;
