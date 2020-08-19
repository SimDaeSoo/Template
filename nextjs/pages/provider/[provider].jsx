import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import { getInitializeAuthData } from '../../stores/Auth';

@inject('auth')
@observer
class Provider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<></>);
  }
}

export async function getServerSideProps(context) {
  const auth = await getInitializeAuthData(context);

  if (auth.jwt && auth.user) {
    context.res.writeHead(303, { Location: '/' });
    context.res.end();
  }

  return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('Provider')(Provider);