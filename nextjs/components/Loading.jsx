import React from 'react';
import { withTranslation } from "react-i18next";
import { Spin } from 'antd';

class Loading extends React.Component {
  render() {
    const { i18n } = this.props;
    return (
      <div style={LoadingStyle}>
        <div style={LoadingTextStyle}>
          <Spin size="large" tip={`${i18n.t('loading')}...`} />
        </div>
      </div>
    )
  }
}

const LoadingTextStyle = {
  margin: 'auto',
  fontSize: '2em'
};

const LoadingStyle = {
  width: '100%',
  height: '100%',
  display: 'flex'
}

export default withTranslation('Loading')(Loading);