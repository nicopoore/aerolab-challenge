import { Box, Divider, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Product, User } from '../../../types';
import Badge from './Badge';
import Overlay from './Overlay';

interface Props {
  product: Product;
  user: User;
}

const ProductItem: React.FC<Props> = (props): JSX.Element => {
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);
  const showOverlay = (): void => {
    setOverlayIsVisible(() => true);
  };
  const hideOverlay = (): void => {
    setOverlayIsVisible(() => false);
  };
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
      <Image alt={props.product.name} src={props.product.img.url} />
      <Divider my={4} />
      <Text color="gray.400" fontSize="md">
        {props.product.category}
      </Text>
      <Text fontSize="lg">{props.product.name}</Text>
      <Overlay product={props.product} visible={overlayIsVisible} />
      <Badge
        difference={props.product.cost - props.user.points}
        overlayIsVisible={overlayIsVisible}
      />
    </Box>
  );
};

export default ProductItem;
