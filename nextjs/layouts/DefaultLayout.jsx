import React from 'react';
import { Layout } from 'antd';
import SiderLayout from './SiderLayout';
import HeaderLayout from './HeaderLayout';

class DefaultLayout extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <Layout style={FULL_HEIGHT}>
                <SiderLayout />
                <Layout style={FULL_HEIGHT}>
                    <HeaderLayout />
                    <Layout.Content style={CONTENT_STYLE}>
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>
        )
    }
}

const FULL_HEIGHT = {
    height: '100%'
};

const CONTENT_STYLE = {
    height: '100%',
    marginTop: '32px',
    overflowY: 'auto'
};

export default DefaultLayout;