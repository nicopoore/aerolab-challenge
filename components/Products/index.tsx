import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../utils/functions';
import { ProductType } from '../../utils/types';
import ProductItem from './ProductItem/index';
import Toolbar from './Toolbar/index';

interface Props {
  itemsPerPage: number;
  points: number | 'loading';
  openAddPoints: () => void;
}

const Products: React.FC<Props> = (props): JSX.Element => {
  const { data, error } = useSWR('/api/products', fetcher);
  const [currentPage, setCurrentPage] = useState(1);

  const initialSort: 'recent' | 'lowest' | 'highest' = 'recent';
  const [sort, setSort] = useState(initialSort);

  if (error) return <p>Error loading products</p>;

  const itemSlice = [props.itemsPerPage * (currentPage - 1), props.itemsPerPage * currentPage];

  const sortingAlgorithm = <T extends ProductType>(
    sort: 'recent' | 'lowest' | 'highest'
    // eslint-disable-next-line no-unused-vars
  ): ((a: T, b: T) => number) => {
    if (sort === 'recent') return (a, b) => (a._id > b._id ? 1 : -1);
    else return (a, b) => (a.cost - b.cost) * (sort === 'lowest' ? 1 : -1);
  };

  return (
    <Box bgColor="gray.50" pb={12} px={[6, 16]}>
      <Toolbar
        currentPage={currentPage}
        itemsPerPage={props.itemsPerPage}
        nOfItems={data ? data.length : 'loading'}
        setCurrentPage={setCurrentPage}
        setSort={setSort}
        sort={sort}
      />
      <Flex justify="space-around" pt={4} wrap="wrap">
        {data && props.points !== 'loading'
          ? data
              .sort(sortingAlgorithm(sort))
              .slice(itemSlice[0], itemSlice[1])
              .map((product: ProductType) => (
                <ProductItem
                  key={product._id}
                  openAddPoints={props.openAddPoints}
                  product={product}
                  type="full"
                  userPoints={props.points !== 'loading' && props.points}
                />
              ))
          : [...Array(props.itemsPerPage)].map((e, i) => <ProductItem key={i} type="skeleton" />)}
      </Flex>
      <Toolbar
        noSort
        currentPage={currentPage}
        itemsPerPage={props.itemsPerPage}
        nOfItems={data ? data.length : 'loading'}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default Products;
