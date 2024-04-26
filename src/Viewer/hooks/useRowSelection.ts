/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */


import React, { useState } from 'react';
import { TableRowSelection } from 'antd/es/table/interface';

export function useRowSelection<T>(initialValue: React.Key[] = []) {
  const [selected, setSelected] = useState<React.Key[]>(initialValue);

  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys: selected,
    onChange: setSelected,
  };

  return {
    rowSelection,
    selected,
  };
}