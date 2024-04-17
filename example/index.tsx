import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Attachments, AttachmentSelect } from '../dist';
import { PageContainer } from '@ant-design/pro-components';

import '../dist/attachments.esm.css';

const App = () => {
  return (
    <PageContainer>
      <AttachmentSelect endpoint="http://localhost:8000/api/common/media" />
      <Attachments endpoint="http://localhost:8000/api/common/media" />
    </PageContainer>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));
