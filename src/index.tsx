/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { ActionType, ListToolBar } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { Media, MediaType, Service, ViewProps } from './_types';
import useModeChange from './hooks/useModeChange';
import useMediaPreview from './hooks/useMediaPreview';
import useMediaUploader from './hooks/useMediaUploader';
import useMediaListview from './hooks/useMediaListview';
import { TabsProps } from 'antd';
import ListView from './components/ListView';
import TableView from './components/TableView';
import _service from './_service';
import { useRowSelect } from './hooks/useComponents';
import './index.css';

export interface AttachmentsProps {
  endpoint?: string;
  service?: Service;
}

const AttachmentsPage: React.FC<AttachmentsProps> = ({ endpoint, service: cService }) => {

  const service = cService ?? _service(endpoint ?? '/api/attachments');

  const ref = useRef<ActionType>(null);
  const { modal, showModal } = useMediaPreview(service);
  const { listView, viewSwitcher } = useMediaListview();
  const { selectMode, selectSwitcher } = useModeChange();
  const { rowSelection } = useRowSelect();
  const [fileType, setFileType] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const { dragger, uploadSwitcher, uploading } = useMediaUploader(service, ref);

  const handleShowPreview = (item: Media) => {
    !selectMode && showModal(item);
  };

  const menuItems = (): TabsProps['items'] => {
    let items = [];
    items.push({ key: '', label: '全部' });
    for (let key in MediaType) {
      items.push({ key: key, label: MediaType[key as keyof typeof MediaType] });
    }
    return items;
  };

  const handleMenuChange = (key?: React.Key) => {
    setFileType(key as string);
  };

  const viewProps: ViewProps & { ref: React.RefObject<ActionType> } = {
    ref, uploading,
    request: service.index,
    onShowPreview: handleShowPreview,
    params: { type: fileType, name: fileName },
    rowSelection: selectMode && { alwaysShowAlert: true, ...rowSelection },
  };

  return (
    <>
      {dragger}
      <ListToolBar
        menu={{ items: menuItems(), activeKey: fileType, onChange: handleMenuChange, type: 'tab' }}
        search={{ placeholder: '搜索文件', onSearch: setFileName, style: { width: 300 } }}
        actions={[uploadSwitcher, viewSwitcher, selectSwitcher]}
      />
      {listView ? <TableView {...viewProps} /> : <ListView {...viewProps} />}
      {modal}
    </>
  );
};

export default AttachmentsPage;
