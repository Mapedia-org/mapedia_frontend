import { Box, Center } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';
import { PuffLoader } from 'react-spinners';
import { theme } from '../../../theme/theme';
import { MapOptions } from './map.utils';

interface BaseMapProps {
  options: MapOptions;
  renderTopLeft?: ReactNode;
  renderBottomMiddleLeft?: ReactNode;
  renderBottomMiddleRight?: ReactNode;
  isLoading?: boolean;
}
export const BaseMap = forwardRef<SVGSVGElement, BaseMapProps>(
  ({ options, renderTopLeft, renderBottomMiddleLeft, renderBottomMiddleRight, isLoading }, ref) => {
    return (
      <Box position="relative">
        {isLoading && (
          <Center position="absolute" w={`${options.pxWidth}px`} h={`${options.pxHeight}px`}>
            <PuffLoader size={Math.floor(options.pxWidth / 3)} color={theme.colors.blue[300]} />
          </Center>
        )}
        <svg
          ref={ref}
          width={`${options.pxWidth}px`}
          height={`${options.pxHeight}px`}
          style={{ backgroundColor: theme.colors.gray[600] }}
        />
        {renderBottomMiddleLeft && (
          <Box
            position="absolute"
            bottom={`${options.pxHeight / 20}px`}
            left={options.pxWidth / 4}
            transform="translate(-50%, 0)"
          >
            {renderBottomMiddleLeft}
          </Box>
        )}
        {renderBottomMiddleRight && (
          <Box
            position="absolute"
            bottom={`${options.pxHeight / 20}px`}
            left={(3 * options.pxWidth) / 4}
            transform="translate(-50%, 0)"
          >
            {renderBottomMiddleRight}
          </Box>
        )}
      </Box>
    );
  }
);
