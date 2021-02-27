import { Box, Divider, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface Product {
  img: {
    url: string;
    hdUrl: string;
  };
  _id: string;
  name: string;
  cost: number;
  category: string;
}

const ProductItem: React.FC<{ product: Product }> = (props): JSX.Element => {
  return (
    <Box key={props.product._id} bgColor="white" m={6} p={4} shadow="sm" w="240px">
      <Image alt={props.product.name} src={props.product.img.url} />
      <Divider my={4} />
      <Text color="gray.400" fontSize="md">
        {props.product.category}
      </Text>
      <Text fontSize="lg">{props.product.name}</Text>
    </Box>
  );
};

export default ProductItem;
