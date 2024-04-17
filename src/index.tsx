/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { ActionType, ListToolBar } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { Media, MediaType, Service, ViewProps } from './_types';
import useModeChange from './hooks/useModeChange';
import useMediaPreview from './hooks/useMediaPreview';
import useMediaUploader from './hooks/useMediaUploader';
import useMediaListview from './hooks/useMediaListview';
import { Button, Form, Modal, Space, TabsProps } from 'antd';
import ListView from './components/ListView';
import TableView from './components/TableView';
import _service from './_service';
import { useRowSelect } from './hooks/useComponents';
import { DangerLink } from '@wisdech/components';
import useNotifications from './hooks/useNotifications';
import useWindowSize from './hooks/useWindowSize';

import './index.css';

export interface AttachmentsProps {
  endpoint?: string;
  service?: Service;
  select?: boolean;
  syncSelected?: (items: Media[]) => void;
  contentHeight?: number;
}

export const AttachmentSelect: React.FC<AttachmentsProps> = ({ endpoint, service }) => {

  const { height, width } = useWindowSize();
  const [selected, setSelected] = useState<Media[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    console.log(selected);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalFooter = (
    <Space>
      <Button onClick={handleCancel}>取消</Button>
      <Button type="primary" onClick={handleOk}>确定</Button>
    </Space>
  );

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      <Form.Item>

      </Form.Item>
      <Button onClick={showModal}>选择附件</Button>
      <Modal
        title="选择附件"
        width={width - 64}
        open={isModalOpen}
        footer={modalFooter}
        onCancel={handleCancel}
        style={{ top: 0, paddingBottom: 0 }}
        styles={{ content: { height: height - 20, top: 10 } }}
      >
        <Attachments
          service={service}
          endpoint={endpoint}
          select syncSelected={setSelected}
          contentHeight={height - 20 - 224}
        />
      </Modal>
    </>
  );
};

export const Attachments: React.FC<AttachmentsProps> = (props) => {

  const { endpoint, service: cService, select, syncSelected, contentHeight } = props;
  const service = cService ?? _service(endpoint ?? '/api/attachments');

  const { message } = useNotifications();
  const ref = useRef<ActionType>(null);
  const { modal, showModal } = useMediaPreview(service, ref);
  const { listView, viewSwitcher } = useMediaListview();
  const { selectMode, selectSwitcher } = useModeChange();
  const { selected, rowSelection } = useRowSelect();
  const [fileType, setFileType] = useState<string>();
  const [fileName, setFileName] = useState<string>();
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
    rowSelectActions: select ? [] : [
      <DangerLink
        key="destroy" title="批量删除"
        description="确认删除文件？删除后无法恢复" text="批量删除"
        onClick={handleBatchDestroy}
      />,
    ],
  };

  useEffect(() => {
    const medias: Media[] = [];
    syncSelected && selected.forEach(s => {
      service.show(s as string)
        .then(res => {
          res?.data?.data && medias.push(res?.data?.data);
        });
    });
    syncSelected?.(medias);
  }, [selected]);

  return (
    <>
      {dragger}
      <ListToolBar
        menu={{ items: menuItems(), activeKey: fileType, onChange: handleMenuChange, type: 'tab' }}
        search={{ placeholder: '搜索文件', onSearch: setFileName, style: { width: 300 } }}
        actions={[uploadSwitcher, viewSwitcher, (!select) && selectSwitcher]}
      />
      <div style={{ maxHeight: contentHeight, overflowY: 'scroll', overflowX: 'hidden' }}>
        {listView ? <TableView {...viewProps} /> : <ListView {...viewProps} />}
      </div>
      {modal}
    </>
  );
};
