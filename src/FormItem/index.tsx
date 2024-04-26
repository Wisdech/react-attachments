/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { Button, Form, FormItemProps as FormProps, Modal } from 'antd';
import { AttachmentsProps, Media } from '../_types';
import React, { useState } from 'react';
import useWindowSize from './hooks/useWindowSize';
import Attachments from '../Viewer';

type SelectProps = Pick<AttachmentsProps, 'service' | 'endpoint'>
type FormItemProps = SelectProps & FormProps
type SelectModalProps = SelectProps & {
  value?: Media['id'][];
  onChange?: (value?: Media['id'][]) => void;
}

export const SelectModal: React.FC<SelectModalProps> = ({ service, endpoint, value, onChange }) => {
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
      <Button onClick={showModal}>{selected.length === 0 ? '选择附件' : `已选${selected.length}个附件`}</Button>
      <Modal
        title="选择附件"
        width={width - 64}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 0, paddingBottom: 0 }}
        styles={{ content: { maxHeight: height - 20, top: 10, overflowY: 'scroll', overflowX: 'hidden' } }}
      >
        <Attachments
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

const FormItem: React.FC<FormItemProps> = (props) => {

  const { endpoint, service, ...formProps } = props;

  return (
    <Form.Item {...formProps}>
      <SelectModal {...{ endpoint, service }} />
    </Form.Item>
  );
};

export default FormItem;