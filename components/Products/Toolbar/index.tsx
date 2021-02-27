import { Divider, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import NavButtons from './NavButtons';
import Sorting from './Sorting';

interface Props {
  nOfItems: number;
  itemsPerPage: number;
  noSort?: boolean;
  sort?: 'recent' | 'lowest' | 'highest';
  setSort?: (T: any) => void;
  currentPage: number;
  setCurrentPage: (T: any) => void;
}

const Toolbar: React.FC<Props> = (props): JSX.Element => {
  const previousPage = (): void => {
    if (firstPage) return null;
    props.setCurrentPage(() => props.currentPage - 1);
  };
  const nextPage = (): void => {
    if (lastPage) return null;
    props.setCurrentPage(() => props.currentPage + 1);
  };

  const currentItems = props.itemsPerPage * props.currentPage;
  const firstPage = props.currentPage === 1;
  const lastPage = currentItems === props.nOfItems;
  return (
    <>
      <Flex alignItems="center" py={8}>
        <Text fontSize="xl">
          {currentItems - props.itemsPerPage + 1}-{currentItems} of {props.nOfItems} products
        </Text>
        {!props.noSort && <Sorting setSort={props.setSort} sort={props.sort} />}
        <Spacer />
        <NavButtons
          firstPage={firstPage}
          lastPage={lastPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </Flex>
      <Divider />
    </>
  );
};

export default Toolbar;
