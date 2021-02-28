import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { mutate } from 'swr';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}

const AddPoints: React.FC<Props> = (props): JSX.Element => {
  const [isRedeeming, setIsRedeeming] = useState({ 1: false, 2: false, 3: false });
  const initialRef = React.useRef();

  const handleAdd = async (amount: number, index: number): Promise<void> => {
    setIsRedeeming({ ...isRedeeming, [index]: true });
    await fetch('/api/user/points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
      }),
    });
    setIsRedeeming({ ...isRedeeming, [index]: false });
    mutate('/api/user/me', { ...props, points: props.points + amount });
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add points</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>You currently have {props.points} points</Text>
        </ModalBody>
        <ModalFooter>
          <Stack direction="row">
            {[1000, 5000, 7500].map((number, index) => (
              <Button
                key={`add-${number}`}
                ref={index === 0 ? initialRef : null}
                isLoading={isRedeeming[index]}
                onClick={() => handleAdd(number, index)}
              >
                <Text>Add {number}</Text>
              </Button>
            ))}
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPoints;
