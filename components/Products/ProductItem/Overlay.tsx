import { Box, Flex, Text, Image, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { mutate } from 'swr';
import { formatNumbers } from '../../../utils/functions';
import { ProductType } from '../../../utils/types';

interface Props {
  visible: boolean;
  product: ProductType;
  points: number;
  cost: number;
  openAddPoints: () => void;
}

const Overlay: React.FC<Props> = (props): JSX.Element => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const handleRedeem = async (productId: string): Promise<void> => {
    setIsRedeeming(() => true);
    await fetch('/api/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });
    setIsRedeeming(() => false);
    mutate('/api/user/me', { ...props, points: props.points - props.cost });
    mutate('/api/user/history');
  };
  const difference = props.cost - props.points;
  const affordable = difference <= 0;
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
            {formatNumbers(props.product.cost)}
          </Text>
          <Image src="/icons/coin.svg" zIndex={1} />
        </Flex>
        {affordable ? (
          <Button isLoading={isRedeeming} mt={2} onClick={() => handleRedeem(props.product._id)}>
            Redeem now
          </Button>
        ) : (
          <>
            <Text color="white" fontSize="lg" zIndex={1}>
              You need {formatNumbers(difference)}
            </Text>
            <Button mt={2} onClick={props.openAddPoints}>
              Get more points
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Overlay;
