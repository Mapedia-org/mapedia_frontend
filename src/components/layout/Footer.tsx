import { Flex, Link, Stack, Text } from '@chakra-ui/layout';
import { FaDiscord } from '@react-icons/all-files/fa/FaDiscord';
import { FaDiscourse } from '@react-icons/all-files/fa/FaDiscourse';
import { RiGithubFill } from '@react-icons/all-files/ri/RiGithubFill';
import { RiTwitterLine } from '@react-icons/all-files/ri/RiTwitterLine';
import { env } from '../../env';

export const Footer: React.FC<{}> = () => {
  return (
    <Flex direction="column" alignItems="stretch" overflowX="hidden" flexShrink={0}>
      <Flex
        bgColor="teal.600"
        w="100%"
        px={{ base: '2%', md: '5%', lg: '8%' }}
        pt={8}
        pb={8}
        justifyContent="space-between"
        color="white"
      >
        <Flex alignItems="center" w="35%" mr={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: 'sm', sm: 'md', md: 'lg' }} fontWeight={600}>
            © {new Date().getFullYear()} Mapedia.org
          </Text>
        </Flex>

        <Flex direction="row" alignItems="stretch" justifyContent="space-between" w="65%">
          <Flex justifyContent="center" flexGrow={1} fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}>
            <Stack spacing={2} mr={3}>
              <Link href={env.DISCORD_INVITE_LINK} _hover={{}} fontWeight={500} isExternal>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FaDiscord />
                  <Text>Discord</Text>
                </Stack>
              </Link>
              <Link href="https://github.com/Mapedia-org" _hover={{}} fontWeight={500} isExternal>
                <Stack direction="row" spacing={1} alignItems="center">
                  <RiGithubFill />
                  <Text>Github</Text>
                </Stack>
              </Link>
              <Link href="https://twitter.com/Mapedia_org" _hover={{}} fontWeight={500} isExternal>
                <Stack direction="row" spacing={1} alignItems="center">
                  <RiTwitterLine />
                  <Text>Twitter</Text>
                </Stack>
              </Link>
              <Link href={env.DISCOURSE_FORUM_URL} _hover={{}} fontWeight={500} isExternal>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FaDiscourse />
                  <Text>Forum</Text>
                </Stack>
              </Link>
            </Stack>
          </Flex>
          <Stack direction="row" spacing={{ base: 2, sm: 5, md: 12 }} fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}>
            <Stack direction="column" spacing={2} alignItems="center">
              <Link href="/about" isExternal>
                About
              </Link>
              <Link href="mailto:info@mapedia.org">Contact</Link>
              <Link href="https://forms.gle/uiRKX8qMrCP9SV3W9" isExternal>
                Feedback
              </Link>
            </Stack>
            <Stack direction="column" spacing={2} alignItems="center" textAlign="center">
              <Link href="https://discord.gg/TVqaaVqeMU" isExternal>
                Report a bug
              </Link>
              <Link href="https://discord.gg/TVqaaVqeMU" isExternal>
                Suggest a feature
              </Link>
              <Link href="/about/contributing" isExternal>
                Contribute
              </Link>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};
