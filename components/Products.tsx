import { Box, Divider, Image, SimpleGrid, Text } from '@chakra-ui/react';
import useSWR from 'swr';

const fetcher = async (url: string): Promise<any> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  }).then(res => res.json());

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

const Products: React.FC = (): JSX.Element => {
  const { data, error } = useSWR('/api/products', fetcher);

  if (error) return <p>Error loading products</p>;
  if (!data) return <p>Loading products...</p>;

  return (
    <SimpleGrid minChildWidth={220} mx={100} spacing={10}>
      {data.map((product: Product) => (
        <Box key={product._id}>
          <Image alt={product.name} src={product.img.url} />
          <Divider />
          <Text>{product.category}</Text>
          <Text>{product.name}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Products;
