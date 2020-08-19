import React from 'react';

class HydrateComponent extends React.Component {
    constructor(props) {
        super(props);
        const { hydrate } = this.props;
        hydrate();
    }
}

export default HydrateComponent;