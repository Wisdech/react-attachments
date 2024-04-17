/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { Form } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';

export function useRowSelect<T>() {
  const [selected, setSelected] = useState<React.Key[]>([]);

  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys: selected,
    onChange: setSelected,
  };

  return {
    rowSelection,
    selected,
  };
}

export function useFormReset<T = any>() {
  const [form] = Form.useForm<T>();

  useEffect(() => {
    form?.resetFields();
  }, []);

  return form;
}
