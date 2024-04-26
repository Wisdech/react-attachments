/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { InboxOutlined } from '@ant-design/icons';
import { App, Button, Upload, UploadProps } from 'antd';
import React, { useState } from 'react';
import { ActionType } from '@ant-design/pro-components';
import { Service } from '../../_types';
import { AxiosRequestConfig } from 'axios';

type RefType = React.RefObject<ActionType>
export default function(service: Service, ref?: RefType) {

  const { message } = App.useApp();
  const [upload, setUpload] = useState(false);
  const [uploading, setUploading] = useState(false);

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    customRequest: async (options) => {

      const axiosOption: AxiosRequestConfig = {
        onUploadProgress: (event) => {
          const percent = (event.loaded / (event?.total ?? 1)) * 100;
          options.onProgress?.({ percent: Math.round(percent) });
        },
      };

      const result = await service.store(options.file, axiosOption);
      if (result.data.success) {
        options.onSuccess?.(undefined);
      } else {
        options.onError?.({
          name: options.filename ?? '',
          status: result.data.error_code ?? 500,
          message: result.data.error_message ?? '上传错误',
        });
      }

    },
    onChange(info) {
      const { status, percent } = info.file;
      if (status !== 'uploading') {
        setUploading(false);
      } else {
        setUploading(true);
        message.open({
          content: `${info.file.name} 上传 ${percent}%`,
          key: 'upload', type: 'info', duration: 0,
        });
      }

      if (status === 'done') {
        ref?.current?.reload();
        message.open({
          content: `${info.file.name} 上传成功`,
          key: 'upload', type: 'success', duration: 3,
        });
      } else if (status === 'error') {
        message.open({
          content: `${info.file.name} 上传失败`,
          key: 'upload', type: 'error', duration: 3,
        });
      }
    },
  };

  const handleChangeState = () => {
    setUpload(!upload);
  };

  const dragger = upload && (
    <Upload.Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
    </Upload.Dragger>
  );

  const uploadSwitcher = (
    <Button type="primary" onClick={handleChangeState}>
      {upload ? '关闭上传' : '上传'}
    </Button>
  );

  return { dragger, uploadSwitcher, uploading };
}