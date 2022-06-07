import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { createContext, useCallback, useContext, useState } from 'react';
import { ResourceUrlDataFragment } from './ResourceUrlLink.generated';

const ResourceViewerModalContext = createContext<{
  openResourceViewerModal: (resource: ResourceUrlDataFragment) => void;
  onClose: () => void;
  isOpen: boolean;
}>({
  openResourceViewerModal: () => null,
  onClose: () => null,
  isOpen: false,
});

export const ResourceViewerModalProvider: React.FC<{}> = ({ children }) => {
  const modalDisclosure = useDisclosure({ defaultIsOpen: false });
  const { isOpen, onOpen, onClose } = modalDisclosure;
  const [resource, setResource] = useState<ResourceUrlDataFragment>();
  const openResourceViewerModal = useCallback(
    (resource: ResourceUrlDataFragment) => {
      setResource(resource);
      onOpen();
    },
    [onOpen, setResource]
  );
  return (
    <>
      <ResourceViewerModalContext.Provider
        value={{
          openResourceViewerModal,
          isOpen,
          onClose,
        }}
      >
        {children}
      </ResourceViewerModalContext.Provider>
      {resource && <ResourceViewerModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} resource={resource} />}
    </>
  );
};

export const useResourceViewerModal = () => {
  return useContext(ResourceViewerModalContext);
};

export const ResourceViewerModal: React.FC<{
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  resource: ResourceUrlDataFragment;
}> = ({ isOpen, onClose, resource }) => {
  // const [showLogin, setShowLogin] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      size="full"
    >
      <ModalOverlay>
        <ModalContent>
          {/* <ModalHeader>{showLogin ? 'Login' : 'Register'}</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <iframe width="100%" height="auto" src={resource.url} sandbox="allow-scripts"></iframe>
            {/* {resource._id} */}
            {/* {showLogin ? (
                <>
                  <LoginForm onSuccessfulLogin={onClose} />
                  <Divider my={4}></Divider>
                  <Box pb={4} textAlign="center">
                    <Text fontSize="l">
                      No account yet ?{' '}
                      <Link color="blue.400" onClick={() => setShowLogin(false)}>
                        Register
                      </Link>
                    </Text>
                  </Box>
                </>
              ) : (
                <>
                  <RegisterForm onSuccess={onClose} />
                  <Divider my={4}></Divider>
                  <Box pb={4} textAlign="center">
                    <Text fontSize="l">
                      Already have an account ?{' '}
                      <Link color="blue.400" onClick={() => setShowLogin(true)}>
                        Login
                      </Link>
                    </Text>
                  </Box>
                </>
              )} */}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
