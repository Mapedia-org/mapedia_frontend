import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';

const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (email: string): boolean => {
  return emailRegexp.test(String(email).toLowerCase());
};

export const NewsletterSignup: React.FC<{}> = () => {
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [email, setEmail] = useState('');

  const responsiveBtnInputSize = useBreakpointValue({
    base: 'lg',
    sm: 'xl',
  });

  const emailIsValid = useMemo(() => {
    return validateEmail(email);
  }, [email]);

  const send = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://assets.mailerlite.com/jsonp/17966/forms/51820238011893460/subscribe', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(this.response);
        if (data.success) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      }
    };
    xhr.send(`fields[email]=${encodeURIComponent(email)}&ml-submit=1&anticsrf=true`);
  };
  return (
    // <Flex>
    <Center
      borderColor="teal.600"
      boxShadow="md"
      borderWidth={6}
      mt={20}
      mb={10}
      bgColor="white"
      borderRadius={40}
      pt={{ base: '30px', md: '50px', lg: '60px' }}
      pb={{ base: '50px', md: '70px', lg: '80px' }}
      px={{ base: '40px', md: '100px', lg: '135px' }}
    >
      <iframe
        name="hiddenFrame"
        style={{
          position: 'absolute',
          top: '-1px',
          left: '-1px',
          width: '1px',
          height: '1px',
        }}
      ></iframe>

      <Stack flexDirection="column" alignItems="stretch" spacing={{ base: 4, sm: 8, md: 10 }}>
        <Center>
          <Heading size="2xl" color="gray.800" textAlign="center">
            Follow our{' '}
            <Text as="span" color="teal.600">
              Newsletter
            </Text>
          </Heading>
        </Center>
        <Text
          color="gray.600"
          textAlign={{ base: 'center', sm: 'left' }}
          fontSize={{ base: '16px', sm: '17px', md: '18px' }}
          fontWeight={600}
        >
          Stay up to date with the development and future launch of Mapedia, and be part of the early members of the
          community
        </Text>
        {!status && (
          <Flex
            as="form"
            direction={{ base: 'column', sm: 'row' }}
            alignItems="stretch"
            justifyContent="space-between"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              aria-label="email"
              type="email"
              size={responsiveBtnInputSize} //{{ base: "lg", sm: "xl" }}
              w={{ sm: '64%' }}
              borderColor="teal.500"
              borderWidth={2}
              _hover={{
                borderColor: 'teal.600',
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outline"
              placeholder="your@email.com"
              bgColor="white"
              isInvalid={!!email && !emailIsValid}
              mb={{ base: 3, sm: 0 }}
            />

            <Button
              colorScheme="teal"
              type="submit"
              borderColor="teal"
              size={responsiveBtnInputSize} //{{ base: "lg", sm: "xl" }}
              w={{ sm: '34%' }}
              minW="100px"
              onClick={() => send()}
              disabled={!email || !emailIsValid}
            >
              Subscribe
            </Button>
          </Flex>
        )}
        {status === 'success' && (
          <Alert status="success">
            <AlertIcon />
            <Text as="span">
              <Text as="span" fontWeight={600}>
                Subscribed!
              </Text>{' '}
              Please confirm your email address by clicking on the link we sent to{' '}
              <Text as="span" fontWeight={600}>
                {email}
              </Text>
            </Text>
          </Alert>
        )}
        {status === 'error' && (
          <Alert status="error">
            <AlertIcon />
            Oops! Something went wrong, please try again.
          </Alert>
        )}
      </Stack>
    </Center>
  );
};
