import React from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import { setCookie, getCookie } from '../utils';

// TODO : 정리해야한다.
@inject('auth')
@observer
class AuthWrapper extends React.Component {
  constructor(props) {
    super(props);
    if (process.browser) {
      this.checkAuth(this.jwt);
    }
  }

  get jwt() {
    const { auth } = this.props;
    return auth.jwt ? auth.jwt : (getCookie('jwt', document.cookie) || '');
  }

  async checkAuth(jwt) {
    const { auth } = this.props;

    try {
      if (!jwt) throw ('error');
      const headers = { Authorization: `bearer ${jwt}` };
      const response = await axios.get(`/api/users/me`, { headers });
      const user = response.data;
      auth.user = user;
      auth.jwt = jwt;
      setCookie('jwt', jwt);
    } catch (e) {
      auth.user = {};
      auth.jwt = '';
      setCookie('jwt', '', 0);
    }
  }

  render() {
    const { children } = this.props;
    return (<>{children}</>);
  }
}

export default AuthWrapper;