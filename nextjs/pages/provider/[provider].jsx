import React from 'react';

class Provider extends React.Component {
  constructor(props) {
    super(props);
    const { jwt } = props;
    console.log(jwt);
  }

  render() {
    return (<div></div>);
  }
}

export default Provider;