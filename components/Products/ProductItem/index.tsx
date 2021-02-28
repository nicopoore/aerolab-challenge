import { Box, Divider, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ProductType, UserType } from '../../../utils/types';
import Badge from './Badge';
import Overlay from './Overlay';

interface Props {
  product: ProductType;
  user: UserType;
  openAddPoints: () => void;
}

const ProductItem: React.FC<Props> = (props): JSX.Element => {
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  const showOverlay = (): void => {
    setOverlayIsVisible(() => true);
  };
  const hideOverlay = (): void => {
    setOverlayIsVisible(() => false);
  };

  const difference = props.product.cost - props.user.points;
  return (
    <Box
      key={props.product._id}
      _hover={{
        transform: 'translate(0, -5px)',
        transition: 'transform .2s, box-shadow .2s',
        shadow: 'md',
      }}
      bg="white"
      m={6}
      p={4}
      position="relative"
      shadow="sm"
      transition="transform .3s, box-shadow .3s"
      w="240px"
      onMouseEnter={showOverlay}
      onMouseLeave={hideOverlay}
    >
      <Image
        alt={props.product.name}
        fallbackSrc={props.product.img.url}
        src={props.product.img.hdUrl}
      />
      <Divider my={4} />
      <Text color="gray.400" fontSize="md">
        {props.product.category}
      </Text>
      <Text fontSize="lg">{props.product.name}</Text>
      <Overlay
        cost={props.product.cost}
        openAddPoints={props.openAddPoints}
        points={props.user.points}
        product={props.product}
        visible={overlayIsVisible}
      />
      <Badge difference={difference} overlayIsVisible={overlayIsVisible} />
    </Box>
  );
};

export default ProductItem;
