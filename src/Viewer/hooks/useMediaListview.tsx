/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import React, { useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

export default function() {

  const [listView, setListView] = useState(false);

  const handleViewChange = (e: RadioChangeEvent) => {
    setListView(e.target.value as boolean);
  };

  const viewSwitcher = (
    <Radio.Group onChange={handleViewChange} defaultValue={false}>
      <Radio.Button value={false}><AppstoreOutlined /></Radio.Button>
      <Radio.Button value={true}><UnorderedListOutlined /></Radio.Button>
    </Radio.Group>
  );

  return { listView, viewSwitcher };
}