import React from 'react';

class HydrateComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static getDerivedStateFromProps(props) {
        const { hydrate } = props;
        hydrate();
        return null;
    }
}

export default HydrateComponent;