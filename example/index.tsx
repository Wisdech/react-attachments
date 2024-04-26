import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AttachmentsViewer } from '../dist';
import { PageContainer } from '@ant-design/pro-components';
import { App } from 'antd';

import '../dist/attachments.esm.css';

const Example = () => {
  return (
    <App>
      <PageContainer>
        <AttachmentsViewer
          endpoint="http://127.0.0.1:8000/api/common/media"
          contentHeight={400}
        />
      </PageContainer>
    </App>
  );
};


ReactDOM.render(<Example />, document.getElementById('root'));
