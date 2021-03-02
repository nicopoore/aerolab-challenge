import { Box, Divider, Image, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ProductType } from '../../../utils/types';
import Badge from './Badge';
import Overlay from './Overlay';

interface FullProps {
  type: 'full';
  product: ProductType;
  userPoints: number;
  openAddPoints: () => void;
}

interface SkeletonProps {
  type: 'skeleton';
}

type Props = FullProps | SkeletonProps;

const ProductItem: React.FC<Props> = (props): JSX.Element => {
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  if (props.type === 'skeleton') {
    return (
      <Box bg="white" m={6} p={4} position="relative" shadow="sm" w="240px">
        <Skeleton>
          <Box h={40} w={40} />
        </Skeleton>
        <Divider my={4} />
        <SkeletonText noOfLines={2} spacing={2} w={24} />
      </Box>
    );
  }

  const difference = props.product.cost - props.userPoints;
  const showOverlay = (): void => {
    setOverlayIsVisible(() => true);
  };
  const hideOverlay = (): void => {
    setOverlayIsVisible(() => false);
  };
  return (
    <Box
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
        product={props.product}
        userPoints={props.userPoints}
        visible={overlayIsVisible}
      />
      <Badge difference={difference} overlayIsVisible={overlayIsVisible} />
    </Box>
  );
};

export default ProductItem;
