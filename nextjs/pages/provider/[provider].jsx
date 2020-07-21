import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import Router from 'next/router';
import AuthWrapper from '../../wrapper/authWrapper';

@inject('environment', 'auth')
@observer
class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize() {
    if (process.browser) {
      Router.replace('/');
    }
  }

  render() {
    return (
      <AuthWrapper>
        <div></div>
      </AuthWrapper>
    );
  }
}

export default withTranslation()(Provider);