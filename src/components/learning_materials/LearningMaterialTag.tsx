import { Text } from '@chakra-ui/react';

export const LearningMaterialTag: React.FC<{
  tagName: String;
  size?: 'sm' | 'md';
}> = ({ tagName, size = 'md' }) => {
  return <LearningMaterialTagBase size={size}>{tagName}</LearningMaterialTagBase>;
};

const sizesMapping = {
  sm: {
    fontSize: '12px',
    fontWeight: 500,
    borderRadius: '14px',
    pt: '1px',
    pb: '2px',
    px: '6px',
  },
  md: {
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '14px',
    pt: '2px',
    pb: '4px',
    px: '8px',
  },
};
export const LearningMaterialTagBase: React.FC<{
  isSelected?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
}> = ({ isSelected, size = 'md', onClick, children }) => {
  return (
    <Text
      {...sizesMapping[size]}
      letterSpacing="0.03em"
      {...(isSelected ? { color: 'white', bgColor: 'gray.600' } : { color: 'gray.600', bgColor: 'gray.100' })}
      {...(onClick && {
        onClick,
        _hover: {
          cursor: 'pointer',
        },
      })}
    >
      {children}
    </Text>
  );
};
