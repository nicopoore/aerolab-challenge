import { Divider, Flex, SkeletonText, Spacer, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import NavButtons from './NavButtons';
import Sorting from './Sorting';

interface Props {
  nOfItems: number | 'loading';
  itemsPerPage: number;
  noSort?: boolean;
  sort?: 'recent' | 'lowest' | 'highest';
  // eslint-disable-next-line no-unused-vars
  setSort?: (T: any) => void;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
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

  let itemsThisPage: number;
  let currentItems: number;
  let firstPage: boolean;
  let lastPage: boolean;

  if (props.nOfItems !== 'loading') {
    itemsThisPage = props.itemsPerPage * props.currentPage;
    currentItems = itemsThisPage < props.nOfItems ? itemsThisPage : props.nOfItems;
    firstPage = props.currentPage === 1;
    lastPage = currentItems === props.nOfItems;
  }
  return (
    <>
      <Stack alignItems="center" direction="row" justify="center" py={8} wrap="wrap">
        {props.nOfItems !== 'loading' ? (
          <Text fontSize="xl">
            {currentItems - props.itemsPerPage + 1}-{currentItems} of {props.nOfItems} products
          </Text>
        ) : (
          <SkeletonText noOfLines={1} w={48} />
        )}

        {!props.noSort && (
          <Flex alignItems="center" order={[-1, 0]} width={['60%', 'initial']}>
            <Divider display={['none', 'initial']} h="32px" mx={2} orientation="vertical" pr={2} />
            <Sorting
              setCurrentPage={props.setCurrentPage}
              setSort={props.setSort}
              sort={props.sort}
            />
          </Flex>
        )}
        <Spacer />
        {props.nOfItems !== 'loading' && (
          <NavButtons
            firstPage={firstPage}
            lastPage={lastPage}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        )}
      </Stack>
      <Divider />
    </>
  );
};

export default Toolbar;
