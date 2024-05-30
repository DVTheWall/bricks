import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function backChevron(props) {
  return (
    <Svg
      {...props}
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8 1L2 7L8 13"
        stroke="#F36667"
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
}

export default backChevron;
