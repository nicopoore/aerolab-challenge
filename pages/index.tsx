import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import useSWR from 'swr';
import { Products, Header, Banner, AddPoints, UserHistory } from '../components';
import { fetcher } from '../utils/functions';
import { UserType } from '../utils/types';

const Home: React.FC = (): JSX.Element => {
  const { data, error } = useSWR('/api/user/me', fetcher);
  const [addPointsIsOpen, setAddPointsIsOpen] = useState(false);
  const [userHistoryIsOpen, setUserHistoryIsOpen] = useState(false);

  const openAddPoints = (): void => {
    setAddPointsIsOpen(true);
  };

  const closeAddPoints = (): void => {
    setAddPointsIsOpen(false);
  };

  const openUserHistory = (): void => {
    setUserHistoryIsOpen(true);
  };

  const closeUserHistory = (): void => {
    setUserHistoryIsOpen(false);
  };

  if (error) return <p>Error fetching user</p>;
  if (!data) return <p>Loading user</p>;
  const user: UserType = data;
  return (
    <Box maxWidth={1300} mx="auto">
      <Header openAddPoints={openAddPoints} openUserHistory={openUserHistory} user={user} />
      <Banner />
      <Products itemsPerPage={16} openAddPoints={openAddPoints} user={user} />
      <AddPoints isOpen={addPointsIsOpen} points={user.points} onClose={closeAddPoints} />
      <UserHistory isOpen={userHistoryIsOpen} onClose={closeUserHistory} />
    </Box>
  );
};

export default Home;
