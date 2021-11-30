import { Icon, IconProps } from '@chakra-ui/icons';

export const DirectionSignIcon = (
  props: Omit<IconProps, 'css'> // ts bug with emotion, checkout https://github.com/emotion-js/emotion/issues/1640
) => (
  <Icon viewBox="0 0 128.000000 128.000000" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
      <path
        d="M592 1264 c-17 -12 -22 -25 -22 -59 l0 -44 -137 -3 -138 -3 -3 -152
-3 -153 141 0 140 0 0 -60 0 -60 -137 0 -138 0 -78 -71 c-43 -39 -77 -77 -75
-83 2 -7 36 -42 76 -79 l73 -66 137 -3 137 -3 3 -198 2 -197 -251 0 c-196 0
-250 -3 -247 -12 4 -10 126 -13 568 -13 442 0 564 3 568 13 3 9 -52 12 -252
12 l-256 0 0 200 0 199 148 3 147 3 3 125 c4 186 18 170 -153 170 l-145 0 0
60 0 60 144 0 144 0 76 71 c42 39 76 76 76 83 0 7 -36 44 -81 84 l-80 72 -140
0 -139 0 0 40 c0 68 -55 101 -108 64z m66 -26 c7 -7 12 -27 12 -45 0 -31 -2
-33 -35 -33 -33 0 -35 2 -35 33 0 33 15 57 35 57 6 0 16 -5 23 -12z m385 -177
c34 -33 60 -61 57 -63 -3 -2 -33 -29 -67 -61 l-62 -57 -325 0 -326 0 0 120 0
120 331 0 331 0 61 -59z m-373 -271 l0 -60 -35 0 -35 0 0 60 0 60 35 0 35 0 0
-60z m290 -210 l0 -120 -327 0 -328 1 -65 59 c-35 32 -62 60 -60 62 3 2 33 29
67 61 l62 57 325 0 326 0 0 -120z m-295 -350 l0 -195 -32 -3 -33 -3 0 201 0
201 33 -3 32 -3 0 -195z"
      />
    </g>
  </Icon>
);

// <svg
//   version="1.0"
//   xmlns="http://www.w3.org/2000/svg"
//   width="128.000000pt"
//   height="128.000000pt"
//   viewBox="0 0 128.000000 128.000000"
//   preserveAspectRatio="xMidYMid meet"
// ></svg>;
