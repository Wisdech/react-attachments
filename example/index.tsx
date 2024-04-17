import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AttachmentsPage from '../dist';
import { PageContainer } from '@ant-design/pro-components';

import '../dist/attachments.esm.css'

const App = () => {
  return (
    <PageContainer>
      <AttachmentsPage endpoint="http://localhost:8000/api/common/media" />
    </PageContainer>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));
