import { Tag, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  overlayIsVisible: boolean;
  difference: number;
}

const Badge: React.FC<Props> = (props): JSX.Element => {
  const formatNumbers = (value: number): string => value.toLocaleString('en-US');
  return (
    <>
      {props.difference <= 0 ? (
        <Image
          fallbackSrc={`/icons/buy-${props.overlayIsVisible ? 'white' : 'blue'}.svg`}
          position="absolute"
          right={props.overlayIsVisible ? 0.5 : 2}
          src={`/icons/buy-${props.overlayIsVisible ? 'white' : 'blue'}.svg`}
          top={props.overlayIsVisible ? 1.5 : 2}
        />
      ) : (
        <Tag
          bg="blackAlpha.500"
          borderRadius="full"
          color="white"
          opacity={props.overlayIsVisible ? '0' : '1'}
          position="absolute"
          right={2}
          size="lg"
          top={2}
          transition="opacity .2s"
        >
          <Text mr={1}>You need {formatNumbers(props.difference)}</Text>
          <Image
            fallbackSrc="/icons/coin.svg"
            src="/icons/coin.svg"
            verticalAlign="center"
            width="25px"
          />
        </Tag>
      )}
    </>
  );
};

export default Badge;
