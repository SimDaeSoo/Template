import React from 'react';
import Router from 'next/router';
import { Button } from 'antd';

class RoutingButton extends React.Component {
    login = (link) => {
        Router.push(link);
    }

    render() {
        const { label, link, style, type } = this.props;

        return (
            <Button type={type} onClick={() => { this.login(link) }} style={style || {}}>
                {label}
            </Button>
        );
    }
}

export default RoutingButton;