import { Heading, HeadingProps, LinkProps, Text, TextProps } from '@chakra-ui/layout';
import { Tooltip, useBreakpointValue } from '@chakra-ui/react';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { TopicPageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';

export const PageTitle: React.FC<HeadingProps> = ({ children, ...props }) => {
  const fontSize = useBreakpointValue({ base: '28px', sm: '40px', md: '52px' }) || '52px';
  return (
    <Heading color="gray.800" fontSize={fontSize} {...props}>
      {children}
    </Heading>
  );
};

export const TopicPageSectionHeader: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading color="gray.800" fontSize="24px" fontWeight={600} {...props}>
      {children}
    </Heading>
  );
};

export const FormTitle: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading color="gray.800" fontSize="4xl" fontWeight={400} {...props}>
      {children}
    </Heading>
  );
};

export const FormFieldLabelStyleProps: Pick<TextProps, 'fontSize' | 'fontWeight' | 'color'> = {
  fontSize: 'xl',
  fontWeight: 800,
  color: 'gray.700',
};

export const FormFieldLabel: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text {...FormFieldLabelStyleProps} {...props}>
      {children}
    </Text>
  );
};

export const FormFieldHelperTextStyleProps: Pick<TextProps, 'fontSize' | 'fontWeight' | 'color' | 'letterSpacing'> = {
  fontSize: 'md',
  letterSpacing: '0.3px',
  fontWeight: 600,
  color: 'gray.500',
};

export const FormFieldHelperText: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text {...FormFieldHelperTextStyleProps} {...props}>
      {children}
    </Text>
  );
};

// Topics

export const TopicLinkStyleProps: {
  [key in 'topicName' | 'contextName']: Pick<LinkProps, 'color' | 'fontWeight'>;
} = {
  topicName: {
    fontWeight: 700,
    color: 'gray.700',
  },
  contextName: { fontWeight: 700, color: 'gray.500' },
};

export const TopicDescriptionStyleProps: Pick<TextProps, 'fontSize' | 'color' | 'fontWeight'> = {
  fontWeight: 500,
  color: 'gray.700',
  fontSize: '15px',
};

export const EditLinkStyleProps: Pick<LinkProps, 'color' | 'fontSize'> = {
  color: 'blue.500',
  fontSize: 'sm',
};

export const ShowedInTopicLinkStyleProps = (
  size: 'sm' | 'md'
): { [key in 'topicName' | 'contextName']: Pick<LinkProps, 'color' | 'fontSize' | 'fontWeight' | 'lineHeight'> } => ({
  topicName: {
    color: 'gray.600',
    fontSize: { sm: '14px', md: '17px' }[size],
    fontWeight: 800,
  },
  contextName: {
    color: 'gray.500',
    fontWeight: 800,
    fontSize: { sm: '12px', md: '15px' }[size],
  },
});

export const ShowedInTopicLink: React.FC<{ topic: TopicLinkDataFragment; size?: 'sm' | 'md' }> = ({
  topic,
  size = 'md',
}) => {
  return (
    <Tooltip label={`${topic.name}${topic.context ? ' (' + topic.context + ')' : ''}`} openDelay={1000}>
      <PageLink
        pageInfo={TopicPageInfo(topic)}
        {...ShowedInTopicLinkStyleProps(size).topicName}
        transition="opacity ease-in 0.2s"
        opacity={0.8}
        _hover={{ opacity: 1 }}
      >
        {topic.name}{' '}
        {topic.context && (
          <Text as="span" {...ShowedInTopicLinkStyleProps(size).contextName} transition="color ease-in 0.2s">
            ({topic.context})
          </Text>
        )}
      </PageLink>
    </Tooltip>
  );
};

// Learning materials
const LearningMaterialDescriptionSizesMapping = {
  xs: {
    fontSize: '13px',
  },
  sm: {
    fontSize: '15px',
  },
  md: {
    fontSize: '17px',
  },
};
export const LearningMaterialDescriptionStyleProps = (
  size: 'xs' | 'sm' | 'md' = 'md'
): Pick<TextProps, 'fontWeight' | 'color' | 'fontSize' | 'whiteSpace' | 'letterSpacing'> => ({
  fontWeight: 400,
  color: 'gray.600',
  fontSize: LearningMaterialDescriptionSizesMapping[size].fontSize,
  whiteSpace: 'pre-wrap',
  letterSpacing: '-0.015em',
});

// Users

export const UserDisplayName: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text {...props} {...UserDisplayNameStyleProps}>
      {children}
    </Text>
  );
};

export const UserDisplayNameStyleProps: Pick<TextProps, 'color' | 'fontWeight'> = {
  color: 'gray.800',
  fontWeight: 500,
};

export const UserKeyLinkStyleProps: Pick<LinkProps, 'color' | 'fontWeight' | '_focus'> = {
  color: 'blue.600',
  fontWeight: 600,
  _focus: {},
};

// e.g. Recommended By, Shared By, Created By...
export const SocialWidgetsLabelStyleProps = (
  size: 'xs' | 'sm' | 'md' | 'lg'
): Pick<TextProps, 'color' | 'fontWeight' | 'fontSize'> => ({
  color: 'gray.500',
  fontWeight: 600,
  fontSize: { xs: '10px', sm: '13px', md: '14px', lg: 'md' }[size],
});
