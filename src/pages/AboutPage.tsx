import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { ArticleReaderContainer } from '../components/articles/ArticleReader';
import { InternalLink } from '../components/navigation/InternalLink';
import { globalStyleVariables } from '../theme/theme';

interface ArticleMenuItem {
  menuTitle: string;
  key: string;
}

export const articlesMenuItems: ArticleMenuItem[] = [
  {
    menuTitle: 'Introduction',
    key: 'introduction',
  },
  {
    menuTitle: 'Why',
    key: 'why',
  },
  {
    menuTitle: 'Vision',
    key: 'vision',
  },
  {
    menuTitle: 'Approach',
    key: 'approach',
  },
  {
    menuTitle: 'Team',
    key: 'team',
  },
  {
    menuTitle: 'How to contribute',
    key: 'contributing',
  },
];

export const AboutPage: React.FC<{ pageKey: string }> = ({ pageKey: key }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const layout = useBreakpointValue({ base: 'mobile' as const, md: 'desktop' as const }, 'md');
  const Menu = (
    <Box>
      {articlesMenuItems.map((menu) => {
        return (
          <InternalLink
            routePath="/about/[key]"
            asHref={`/about/${menu.key}`}
            key={menu.key}
            _hover={{ textDecoration: 'none' }}
            _focus={{}}
          >
            <Box
              pt="2px"
              pb="3px"
              pl={globalStyleVariables.leftPadding}
              fontWeight="normal"
              color="grayFont.600"
              fontSize="md"
              _hover={{
                backgroundColor: 'gray.100',
                color: 'grayFont.800',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              {...(key === menu.key && { backgroundColor: 'gray.100', color: 'grayFont.800' })}
            >
              {menu.menuTitle}
            </Box>
          </InternalLink>
        );
      })}
    </Box>
  );
  return (
    <Box display="flex" flexDirection="row" alignItems="stretch" minH="100%" justifyContent="stretch">
      {layout === 'desktop' ? (
        <Box
          borderRightWidth={1}
          borderRightColor="gray.300"
          flexBasis="200px"
          flexShrink={0}
          backgroundColor="backgroundColor.1"
          pl={5}
          pt={5}
        >
          {Menu}
        </Box>
      ) : (
        <>
          <IconButton
            variant="ghost"
            _active={{}}
            _focus={{}}
            ml={2}
            my={4}
            aria-label="open menu"
            icon={<HamburgerIcon />}
            onClick={() => onOpen()}
          />
          <Drawer isOpen={isOpen} size="xs" placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>About section</DrawerHeader>
              <DrawerBody>{Menu}</DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
      <Box flexGrow={5}>{key && <ArticleReaderContainer articleKey={key} />}</Box>
    </Box>
  );
};
