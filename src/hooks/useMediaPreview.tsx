/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import React, { useState } from 'react';
import { Button, Col, Modal, Row, Space } from 'antd';
import { Media, MediaType, Service } from '../_types';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { ProDescriptions } from '@ant-design/pro-components';
import { manByte } from '@wisdech/components';
import useWindowSize from './useWindowSize';

export default function(service: Service) {

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

  const modalFooter = (
    <Space>
      <Button>新窗口打开</Button>
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
              editable={{
                onSave: (_, record) => {
                  return service.update(record);
                },
              }}
              layout="vertical"
              bordered column={2}
              dataSource={current}
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