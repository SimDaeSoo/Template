import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class DefaultLayout extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <Layout style={FULL_HEIGHT}>
                <Layout.Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                    }}
                    onCollapse={(collapsed, type) => {
                    }}
                >
                    <Menu mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            Menu Example
                        </Menu.Item>
                    </Menu>
                </Layout.Sider>
                <Layout style={FULL_HEIGHT}>
                    <Layout.Content style={FULL_HEIGHT}>
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>
        )
    }
}

const FULL_HEIGHT = { height: '100%' };

export default DefaultLayout;