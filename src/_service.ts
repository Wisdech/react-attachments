/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { IndexAction, Media, OtherAction, Service } from './_types';
import { CommonResult, PaginationResult, Props } from '@wisdech/components';
import axios, { AxiosRequestConfig } from 'axios';

export default function(endpoint: string): Service {

  const request = axios.create({
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true,
    baseURL: endpoint,
  });

  function index(params: Props): IndexAction {
    return request.get<PaginationResult<Media>>('', { params });
  }

  function store(file: any, options?: AxiosRequestConfig): OtherAction {
    const formData = new FormData();
    formData.append('file', file);
    return request.post<CommonResult<Media>>(
      '', formData,
      { headers: { 'Content-Type': ' multipart/form-data' }, ...options },
    );
  }

  function show(item?: Media | Media['id']): OtherAction {
    if (typeof item != 'object') {
      return request.get<CommonResult<Media>>(`${item}`);
    } else {
      return request.get<CommonResult<Media>>(`${item?.id}`);
    }
  }

  function update(item?: Media): OtherAction {
    return request.put<CommonResult<Media>>(`${item?.id}`, item);
  }

  function destroy(item?: Media | Media['id']): OtherAction {
    if (typeof item != 'object') {
      return request.delete<CommonResult<Media>>(`${item}`);
    } else {
      return request.delete<CommonResult<Media>>(`${item?.id}`);
    }
  }

  function batchDestroy(ids?: Media['id'][]): OtherAction {
    return request.delete<CommonResult<Media>>('batch', { params: { ids: ids } });
  }

  return { index, store, show, update, destroy, batchDestroy };

}

export async function responseHelper(request: IndexAction) {
  const resp = await request;
  return {
    success: resp.data.success,
    data: resp.data.data?.data,
    total: resp.data.data?.total,
  };
}