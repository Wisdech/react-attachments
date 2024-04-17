/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { useEffect, useState } from 'react';

export default function useWindowSize() {
  const [state, setState] = useState({ width: 0, height: 0 });

  const resizeUpdate = () => {
    const newState = {
      width: document?.documentElement?.clientWidth,
      height: document?.documentElement?.clientHeight,
    };

    setState(newState);
  };

  useEffect(() => {
    resizeUpdate();
    window.addEventListener('resize', resizeUpdate);

    return () => {
      window.removeEventListener('resize', resizeUpdate);
    };
  }, []);

  return state;
}
