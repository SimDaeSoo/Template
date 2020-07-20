import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import Router from 'next/router';

@inject('environmentStore', 'authStore')
@observer
class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize() {
    const { authStore } = this.props;
    if (authStore.jwt && process.browser) {
      sessionStorage.setItem('jwt', authStore.jwt);
      Router.replace('/');
    }
  }

  render() {
    return (<div></div>);
  }
}

export default withTranslation()(Provider);