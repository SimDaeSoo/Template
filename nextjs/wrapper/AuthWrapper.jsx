import React from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';

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
    return auth.jwt ? auth.jwt : (sessionStorage.getItem('jwt') || '');
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
      sessionStorage.setItem('jwt', jwt);
    } catch (e) {
      auth.user = {};
      auth.jwt = '';
      sessionStorage.removeItem('jwt');
    }
  }

  render() {
    const { children } = this.props;
    return (<>{children}</>);
  }
}

export default AuthWrapper;