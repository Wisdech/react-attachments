/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import React, { useState } from 'react';
import { Radio, RadioGroupProps } from 'antd';

export default function() {

  const [selectMode, setSelectMode] = useState(false);

  const handleModeEdit: RadioGroupProps['onChange'] = (e) => {
    setSelectMode(e.target.value as boolean);
  };

  const selectSwitcher = (
    <Radio.Group onChange={handleModeEdit} defaultValue={false}>
      <Radio.Button value={false}>媒体预览</Radio.Button>
      <Radio.Button value={true}>批量操作</Radio.Button>
    </Radio.Group>
  );

  return { selectSwitcher, selectMode };

}