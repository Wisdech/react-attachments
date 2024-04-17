/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { App } from 'antd';

export default function useNotifications() {
  const { notification, message, modal } = App.useApp();

  return { notification, message, modal };
}
