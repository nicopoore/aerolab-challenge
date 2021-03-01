import { Divider, Flex, Spacer, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import NavButtons from './NavButtons';
import Sorting from './Sorting';

interface Props {
  nOfItems: number;
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

  const currentItems = props.itemsPerPage * props.currentPage;
  const firstPage = props.currentPage === 1;
  const lastPage = currentItems === props.nOfItems;
  return (
    <>
      <Stack alignItems="center" direction="row" justify="center" py={8} wrap="wrap">
        <Text fontSize="xl">
          {currentItems - props.itemsPerPage + 1}-{currentItems} of {props.nOfItems} products
        </Text>

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
        <NavButtons
          firstPage={firstPage}
          lastPage={lastPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </Stack>
      <Divider />
    </>
  );
};

export default Toolbar;
