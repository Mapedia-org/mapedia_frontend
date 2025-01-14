import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Stack, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { CgArrowsExpandRight } from '@react-icons/all-files/cg/CgArrowsExpandRight';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { routerPushToPage } from '../../../pages/PageInfo';
import { TopicPageInfo } from '../../../pages/RoutesPageInfos';
import { theme } from '../../../theme/theme';
import { useElementSize } from '../../../util/useElementSize';
import { ExploreMap } from './ExploreMap';
import { MapProps } from './Map';
import { MapTopicDataFragment } from './map.utils.generated';
import { MapHeader, MapType } from './MapHeader';

const Map = dynamic<MapProps>(
  () =>
    import('./Map').then((res) => {
      const { Map } = res;
      return Map;
    }),
  { ssr: false }
);

interface MinimapProps {
  isLoading: boolean;
  topic: MapTopicDataFragment;
  subTopics: MapTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  pxWidth?: number;
  pxHeight?: number;
}

export const Minimap: React.FC<MinimapProps> = ({
  topic,
  subTopics,
  parentTopic,
  isLoading,
  pxWidth = 320,
  pxHeight = (320 * 4) / 7,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMapType, setSelectedMapType] = useState<MapType>(MapType.SUBTOPICS);
  return (
    <Stack spacing={0}>
      <MapHeader value={selectedMapType} onChange={setSelectedMapType} size={pxWidth > 400 ? 'sm' : 'xs'} />

      <Box
        w={`${pxWidth}px`}
        h={`${pxHeight}px`}
        boxShadow="lg"
        bgColor="white"
        zIndex={4}
        borderWidth={1}
        borderRadius={4}
        borderColor="deepBlue.200"
        overflow="hidden"
        position="relative"
      >
        <Map
          mapType={selectedMapType}
          setMapType={setSelectedMapType}
          topic={topic}
          isLoading={isLoading}
          subTopics={subTopics}
          parentTopic={parentTopic}
          options={{
            mode: 'mini',
            pxWidth,
            pxHeight,
            showLearningMaterialsTotalCount: true,
            showTotalSubTopicsCount: true,
          }}
          onSelectTopic={(n) => routerPushToPage(TopicPageInfo(n))}
        />

        <IconButton
          position="absolute"
          variant="ghost"
          _active={{}}
          _focus={{}}
          color="white"
          fontSize="1.3em"
          isRound
          size="xs"
          onClick={() => onOpen()}
          bottom={2}
          right={2}
          opacity={0.8}
          _hover={{ opacity: 1 }}
          aria-label="expand minimap"
          icon={<CgArrowsExpandRight />}
        />

        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalBody justifyContent="stretch" alignItems="stretch" p={8}>
              <SubTopicsMapModalContent
                parentTopic={parentTopic}
                topic={topic}
                subTopics={subTopics}
                selectedMapType={selectedMapType}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Stack>
  );
};

const SubTopicsMapModalContent: React.FC<{
  subTopics: MapTopicDataFragment[];
  topic: MapTopicDataFragment;
  parentTopic?: TopicLinkDataFragment;
  selectedMapType: MapType;
}> = ({ selectedMapType, subTopics, topic, parentTopic }) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalContainerSize = useElementSize(modalContainerRef);

  return (
    <Box ref={modalContainerRef} bgColor="white" zIndex={4} mb={5}>
      {modalContainerSize && (
        <ExploreMap
          options={{
            direction: 'column',
            mapPxHeight: (modalContainerSize.width * 3) / 5,
            mapPxWidth: modalContainerSize.width,
          }}
          selectedMapType={selectedMapType}
          selectedTopicId={topic._id}
        />
      )}
    </Box>
  );
};
