/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import React, { useEffect, useRef, useState } from 'react';
import _service from '../_service';
import { ActionType, ListToolBar } from '@ant-design/pro-components';
import useMediaPreview from './hooks/useMediaPreview';
import useMediaListview from './hooks/useMediaListview';
import useModeChange from './hooks/useModeChange';
import useMediaUploader from './hooks/useMediaUploader';
import { AttachmentsProps, Media, MediaType, ViewProps } from '../_types';
import { App, TabsProps } from 'antd';
import { DangerLink } from '@wisdech/components';
import TableView from './components/TableView';
import ListView from './components/ListView';
import { useRowSelection } from './hooks/useRowSelection';

export const AttachmentsViewer: React.FC<AttachmentsProps> = (props) => {

  const { endpoint, service: cService, selectMode: select, initialSelected, onSelectChange, contentHeight } = props;
  const service = cService ?? _service(endpoint ?? '/api/attachments');

  const { message } = App.useApp();
  const ref = useRef<ActionType>(null);
  const { modal, showModal } = useMediaPreview(service, ref);
  const { listView, viewSwitcher } = useMediaListview();
  const { selectMode, selectSwitcher } = useModeChange();
  const [fileType, setFileType] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const { selected, rowSelection } = useRowSelection(initialSelected);
  const { dragger, uploadSwitcher, uploading } = useMediaUploader(service, ref);

  const handleShowPreview = (item: Media) => {
    !selectMode && !select && showModal(item);
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

  const handleBatchDestroy = () => {
    service.batchDestroy(selected as string[])
      .then(() => {
        ref?.current?.reload();
        message.success('批量删除成功');
      });
  };

  const viewProps: ViewProps & { ref: React.RefObject<ActionType> } = {
    ref, uploading,
    request: service.index,
    onShowPreview: handleShowPreview,
    params: { type: fileType, name: fileName },
    rowSelection: (selectMode || select) && { alwaysShowAlert: true, ...rowSelection },
    scrollY: ((!!dragger) && contentHeight) ? (contentHeight - 128) : contentHeight,
    rowSelectActions: select ? [] : [
      <DangerLink
        key="destroy" title="批量删除"
        description="确认删除文件？删除后无法恢复" text="批量删除"
        onClick={handleBatchDestroy}
      />,
    ],
  };

  useEffect(() => {
    onSelectChange?.(selected as string[]);
  }, [selected]);

  return (
    <>
      {dragger}
      <ListToolBar
        menu={{ items: menuItems(), activeKey: fileType, onChange: handleMenuChange, type: 'tab' }}
        search={{ placeholder: '搜索文件', onSearch: setFileName, style: { width: 300 } }}
        actions={[uploadSwitcher, viewSwitcher, (!select) && selectSwitcher]}
      />
      {listView ? <TableView {...viewProps} /> : <ListView {...viewProps} />}
      {modal}
    </>
  );
};