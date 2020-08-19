import React from 'react';

class HydrateComponent extends React.Component {
    state = {};
    static getDerivedStateFromProps(props) {
        const { hydrate } = props;
        hydrate();
        return null;
    }
}

export default HydrateComponent;