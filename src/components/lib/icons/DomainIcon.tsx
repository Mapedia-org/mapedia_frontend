import { Icon, IconProps } from '@chakra-ui/icons';

export const DomainIcon = (
  props: Omit<IconProps, 'css'> // ts bug with emotion, checkout https://github.com/emotion-js/emotion/issues/1640
) => (
  <Icon viewBox="0 0 100 100" {...props}>
    <switch>
      <foreignObject requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/" x="0" y="0" width="1" height="1" />
      <g fill="currentColor">
        <path d="M90,61.4c-0.1-1-0.7-1.9-1.7-2.3L66.7,48.2c4.2-8.6,7.4-16.8,7.4-21.7c0-13.2-10.8-24-24-24c-13.2,0-24,10.8-24,24     c0,5.4,3.9,14.8,8.7,24.4l-14.2,2.4c-1,0.2-1.8,0.8-2.3,1.7l-7.9,17.4c-0.7,1.4-0.1,3.2,1.3,3.9l37.7,20.7c0.5,0.2,1,0.4,1.5,0.4     c0.2,0,0.4,0,0.6-0.1l32.2-6.6c0.9-0.2,1.7-0.8,2.1-1.6c0.4-0.8,0.4-1.8,0.1-2.6l-6.4-14.3l9.6-8.3C89.7,63.4,90.1,62.4,90,61.4z      M50,8.6c9.9,0,17.9,8,17.9,17.9c0,5.4-6.1,19.2-16.3,36.9c-0.5,0.8-1.3,0.9-1.6,0.9s-1.1-0.1-1.6-0.9     C38.2,45.7,32.1,31.9,32.1,26.5C32.1,16.6,40.1,8.6,50,8.6z M73.7,69.2c-1,0.9-1.3,2.3-0.8,3.5l5.8,12.9l-27.4,5.6L17,72.4     L23.1,59l14.5-2.5c1.8,3.4,3.7,6.8,5.5,9.9c1.4,2.5,4,4,6.9,4c2.9,0,5.4-1.5,6.9-4c2.3-4,4.8-8.4,7.1-12.8l17.6,8.8L73.7,69.2z" />
        <path d="M61.6,26.5c0-6.4-5.2-11.6-11.6-11.6s-11.6,5.2-11.6,11.6S43.6,38.1,50,38.1S61.6,32.9,61.6,26.5z M44.5,26.5     c0-3,2.5-5.5,5.5-5.5c3,0,5.5,2.5,5.5,5.5S53,32,50,32C47,32,44.5,29.6,44.5,26.5z" />
      </g>
    </switch>
  </Icon>
);