/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { Button, Modal } from 'antd';
import { AttachmentsProps, Media } from '../_types';
import React, { useState } from 'react';
import useWindowSize from './hooks/useWindowSize';
import { AttachmentsViewer } from '../Viewer';

type SelectProps = Pick<AttachmentsProps, 'service' | 'endpoint'>
type SelectModalProps = SelectProps & {
  value?: Media['id'][];
  onChange?: (value?: Media['id'][]) => void;
  block?: boolean
}

export const AttachmentsSelect: React.FC<SelectModalProps> = ({ service, endpoint, value, onChange, block }) => {

  const { height, width } = useWindowSize();
  const [selected, setSelected] = useState<Media['id'][]>(value ?? []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onChange?.(selected.length === 0 ? undefined : selected);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button {...(block && { className: 'w-full' })} onClick={showModal}>
        {selected.length === 0 ? '选择附件' : `已选${selected.length}个附件`}
      </Button>
      <Modal
        title="选择附件"
        width={width - 64}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 0, paddingBottom: 0 }}
        styles={{ content: { maxHeight: height - 20, top: 10, overflowY: 'scroll', overflowX: 'hidden' } }}
      >
        <AttachmentsViewer
          selectMode
          service={service}
          endpoint={endpoint}
          initialSelected={value}
          onSelectChange={setSelected}
          contentHeight={height - 20 - 264}
        />
      </Modal>
    </>
  );
};

export const countValidator = (max?: number, min?: number) => (_: any, value: string[]) => {
  if (max !== undefined && min !== undefined) {
    if (value.length >= min && value.length <= max) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } else if (max === undefined && min !== undefined) {
    if (value.length >= min) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } else if (min === undefined && max !== undefined) {
    if (value.length <= max) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }
  return Promise.reject();
};

export const countMessage = (max?: number, min?: number) => {
  if (max !== undefined && min !== undefined) {
    return `请选择${min}至${max}个附件`;
  } else if (max === undefined && min !== undefined) {
    return `请最少选择${min}个附件`;
  } else if (min === undefined && max !== undefined) {
    return `请最多选择${min}个附件`;
  }
  return '';
};