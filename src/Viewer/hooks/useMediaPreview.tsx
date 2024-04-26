/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import React, { useState } from 'react';
import { Button, Col, Modal, Row, Space } from 'antd';
import { Media, MediaType, Service } from '../../_types';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { ActionType, ProDescriptions } from '@ant-design/pro-components';
import { DangerButton, manByte } from '@wisdech/components';
import useWindowSize from '../../FormItem/hooks/useWindowSize';

type RefType = React.RefObject<ActionType>
export default function(service: Service, ref?: RefType) {

  const { height, width } = useWindowSize();
  const [current, setCurrent] = useState<Media>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (data: Media) => {
    setCurrent(data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const media = {
    uri: current?.link ?? '',
    fileName: current?.name,
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.download = current?.name ?? 'file';
    a.href = current?.link ?? '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShow = async () => {
    const media = await service.show(current);
    setCurrent(media.data.data);
    return { data: media.data.data, success: media.data.success };
  };

  const handleUpdate = async (_: React.Key | React.Key[], record: Media) => {
    await service.update(record);
    await ref?.current?.reload();
  };

  const handleDestroy = () => {
    service.destroy(current)
      .then(() => {
        setIsModalOpen(false);
        ref?.current?.reload();
      });
  };

  const modalFooter = (
    <Space>
      <DangerButton
        title="删除文件" description="确认删除文件？删除后无法恢复"
        text="删除" onClick={handleDestroy}
      />
      <Button type="primary" onClick={handleDownload}>下载</Button>
    </Space>
  );

  const modal = (
    <>
      <Modal
        title="文件预览"
        footer={modalFooter}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={width - 64}
        className="wis-file-preview"
        style={{ top: 0, paddingBottom: 0 }}
        styles={{ content: { height: height - 20, top: 10 } }}
      >
        <Row gutter={16}>
          <Col span={16}>
            <DocViewer
              style={{ height: height - 132, overflow: 'hidden' }}
              config={{
                header: {
                  disableHeader: true,
                  disableFileName: true,
                  retainURLParams: true,
                },
              }}
              documents={[media]}
              pluginRenderers={DocViewerRenderers}
            />
          </Col>
          <Col span={8}>
            <ProDescriptions<Media>
              editable={{ onSave: handleUpdate }}
              layout="vertical"
              bordered column={2}
              request={handleShow}
              columns={[
                { title: '文件名', dataIndex: 'name', span: 2 },
                {
                  title: '上传人', dataIndex: ['user', 'name'], editable: false,
                },
                {
                  title: '上传时间', dataIndex: 'created_at',
                  valueType: 'dateTime', editable: false,
                },
                {
                  title: '文件大小', dataIndex: 'size',
                  render: (_, current) => manByte(current?.size),
                  editable: false,
                },
                {
                  title: '文件类型', dataIndex: 'file_type',
                  render: (_, current) => MediaType[current?.file_type ?? ''],
                  editable: false,
                },
              ]}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );

  return { showModal, modal };
}