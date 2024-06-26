/*
 * Copyright (c) 2024 Beijing Wisdech Co., Ltd., All rights reserved.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { Media, MediaViewComponent } from '../../_types';
import { PaginationProps, WisList } from '@wisdech/components';
import React, { CSSProperties } from 'react';
import { ProListProps } from '@ant-design/pro-components';
import { Typography } from 'antd';
import cover from './Preview';
import { responseHelper } from '../../_service';
import { WisListProps } from '@wisdech/components/src/components/WisList';

const ListView: MediaViewComponent = (props, ref) => {

  const {
    scrollY, uploading,
    rowSelection, rowSelectActions,
    onShowPreview, request, params,
  } = props;

  const styles: Record<string, CSSProperties> = {
    card: {
      width: '100%', textAlign: 'center',
      backgroundColor: 'rgb(229 231 235)',
    },
    item: {
      height: 128, padding: 8,
      background: 'transparent',
      borderBottomWidth: 1,
      borderColor: 'rgb(209 213 219)',
    },
    title: {
      fontSize: 12, lineHeight: 1,
      paddingBlock: 8,
      paddingInline: 16,
    },
  };

  const metas: ProListProps['metas'] = {
    content: {
      render: (_, item: Media) => (
        <div style={styles.card}>
          <div style={styles.item}>
            {cover(item)}
          </div>
          <Typography.Text ellipsis={true} style={styles.title}>
            {item.name}
          </Typography.Text>
        </div>
      ),
    },
  };

  const tableRender: WisListProps<Media>['tableRender'] = (_1, _2, domList) => (
    <div>
      {domList.alert}
      <div style={{ height: scrollY, overflowY: 'scroll', overflowX: 'hidden' }}>
        {domList.table}
      </div>
    </div>
  );

  return (
    <WisList<Media>
      className="wis-card-list"
      grid={{ column: 6 }}
      tableRender={tableRender}
      metas={metas}
      actionRef={ref}
      loading={uploading}
      rowSelection={rowSelection}
      actions={rowSelectActions}
      itemCardProps={{
        bordered: false,
        bodyStyle: { padding: 0 },
      }}
      onItem={(record: Media) => ({
        onClick: () => onShowPreview(record),
      })}
      toolBarRender={false}
      params={params}
      pagination={{ pageSize: 24, defaultPageSize: 24, size: 'small' }}
      request={async (params: PaginationProps) =>
        responseHelper(request(params))
      }
    />
  );
};

export default React.forwardRef(ListView);