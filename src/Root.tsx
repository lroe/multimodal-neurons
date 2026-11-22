import React from 'react';
import {Composition} from 'remotion';
import {Video, DURATION_SECONDS} from './Video';
import {H, W} from './theme';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="CLIP"
        component={Video}
        durationInFrames={Math.ceil(DURATION_SECONDS * 30)}
        fps={30}
        width={W}
        height={H}
      />
    </>
  );
};
