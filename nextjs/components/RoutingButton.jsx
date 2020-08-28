import React from 'react';
import Router from 'next/router';
import { Button } from 'antd';


class RoutingButton extends React.Component {
    login = (link) => {
        Router.push(link);
    }

    render() {
        const { label, link, style } = this.props;

        return (
            <Button type='primary' onClick={() => { this.login(link) }} style={style || {}}>
                {label}
            </Button>
        );
    }
}

export default RoutingButton;