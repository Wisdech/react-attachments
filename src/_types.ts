/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { BaseEntity, BaseUser, CommonResult, PaginationResult, Props, UuidEntity } from '@wisdech/components';
import { RcFile } from 'antd/es/upload';
import { ActionType, ProListProps } from '@ant-design/pro-components';
import React from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type MediaViewComponent = React.ForwardRefRenderFunction<ActionType, ViewProps>

export interface ViewProps {
  uploading: boolean;
  rowSelection: ProListProps['rowSelection'];
  onShowPreview: (item: Media) => void;
  params: Props;
  request: (params: Props) => Promise<AxiosResponse<PaginationResult<Media>>>;
}

export type OtherAction = Promise<AxiosResponse<CommonResult<Media>>>
export type IndexAction = Promise<AxiosResponse<PaginationResult<Media>>>

export interface Service {
  index: (params: Props) => IndexAction;
  store: (file: any, options?: AxiosRequestConfig) => OtherAction;
  update: (media: Media) => OtherAction;
  destroy: (media: Media) => OtherAction;
}

export const MediaType: Record<Media['file_type'], string> = {
  pdf: 'PDF',
  image: '图片',
  document: '文档',
  slide: '幻灯片',
  sheet: '表格',
  compress: '压缩包',
  video: '视频',
  audio: '音频',
  app: '软件包',
  cad: 'CAD',
  model: '3D模型',
  unknown: '其他',
};

export interface Media extends UuidEntity {
  name: string;
  extension?: string;
  file_type: 'image' | 'document' | 'slide' | 'sheet'
    | 'compress' | 'video' | 'audio' | 'pdf' | 'unknown'
    | 'cad' | 'model' | 'app';
  mime_type: string;
  size: number;
  path: string;
  link: string;
  user_id: string;
  user?: BaseUser;
  share?: MediaShare[];
  file?: RcFile;
}


export interface MediaShare extends BaseEntity {
  media_id: string;
  media?: Media;
  user_id: string;
  user?: BaseUser;
  access?: ('w' | 'r' | 'x')[];
}