import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import useSWR from 'swr';
import ProductItem from './ProductItem';
import Toolbar from './Toolbar/index';

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

interface Props {
  itemsPerPage: number;
}

const Products: React.FC<Props> = (props): JSX.Element => {
  const { data, error } = useSWR('/api/products', fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  const initialSort: 'recent' | 'lowest' | 'highest' = 'recent';
  const [sort, setSort] = useState(initialSort);

  if (error) return <p>Error loading products</p>;
  if (!data) return <p>Loading products...</p>;

  const itemSlice = [props.itemsPerPage * (currentPage - 1), props.itemsPerPage * currentPage];

  const sortingAlgorithm = <T extends Product>(
    sort: 'recent' | 'lowest' | 'highest'
  ): ((a: T, b: T) => number) => {
    if (sort === 'recent') return (a, b) => (a._id > b._id ? 1 : -1);
    else return (a, b) => (a.cost - b.cost) * (sort === 'lowest' ? 1 : -1);
  };

  return (
    <Box bgColor="gray.50" pb={12} px={16}>
      <Toolbar
        currentPage={currentPage}
        itemsPerPage={props.itemsPerPage}
        nOfItems={data.length}
        setCurrentPage={setCurrentPage}
        setSort={setSort}
        sort={sort}
      />
      <Flex justify="space-between" pt={4} wrap="wrap">
        {data
          .sort(sortingAlgorithm(sort))
          .slice(itemSlice[0], itemSlice[1])
          .map((product: Product) => (
            <ProductItem key={product._id} product={product} />
          ))}
      </Flex>
      <Toolbar
        noSort
        currentPage={currentPage}
        itemsPerPage={props.itemsPerPage}
        nOfItems={data.length}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default Products;
