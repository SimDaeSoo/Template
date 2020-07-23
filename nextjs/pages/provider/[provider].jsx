import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { initialize } from '../../utils';

@inject('environment', 'auth')
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
  const initializeData = await initialize(context);

  context.res.writeHead(303, { Location: '/' });
  context.res.end();

  return { props: { initializeData } };
}

export default withTranslation('Provider')(Provider);