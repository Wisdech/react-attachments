/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import React from 'react';
import { Media, MediaType, MediaViewComponent } from '../_types';
import { manByte, PaginationProps, WisTable } from '@wisdech/components';
import { ProColumns } from '@ant-design/pro-table/lib';
import { Space } from 'antd';
import { responseHelper } from '../_service';

const TableView: MediaViewComponent = (props, ref) => {

  const {
    uploading,
    rowSelection, rowSelectActions,
    onShowPreview, request, params,
  } = props;

  const columns: ProColumns<Media>[] = [
    { title: '文件名', dataIndex: 'name' },
    { title: '上传人', dataIndex: ['user', 'name'] },
    {
      title: '上传时间', dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: '文件大小', dataIndex: 'size',
      render: (_, current) =>
        manByte(current?.size),
    },
    {
      title: '文件类型', dataIndex: 'file_type',
      render: (_, current) =>
        MediaType[current?.file_type ?? ''],
    },
    {
      title: '操作',
      key: 'action',
      render: (_, entity) => (
        <Space>
          <a onClick={() => onShowPreview(entity)}>预览</a>
        </Space>
      ),
    },

  ];

  return (
    <WisTable<Media>
      search={false}
      columns={columns}
      actionRef={ref}
      loading={uploading}
      rowSelection={rowSelection}
      actions={rowSelectActions}
      toolBarRender={false}
      params={params}
      request={(params: PaginationProps) =>
        responseHelper(request(params))
      }
    />
  );
};


export default React.forwardRef(TableView);