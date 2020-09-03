import React from 'react';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import SiderLayout from './SiderLayout';
import HeaderLayout from './HeaderLayout';


@inject('environment')
@observer
class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { size: 'default', collapsed: false };
    }

    onCollapse = (collapsed, type) => {
        const { environment } = this.props;

        if (type === 'responsive' && collapsed) {
            environment.size = 'small';
            this.setState({ size: 'small', collapsed });
        } else if (type === 'responsive' && !collapsed) {
            environment.size = 'default';
            this.setState({ size: 'default', collapsed });
        } else {
            this.setState({ collapsed });
        }
    }

    render() {
        const { children } = this.props;
        const { size, collapsed } = this.state;

        return (
            <Layout style={FULL_HEIGHT}>
                <SiderLayout onCollapse={this.onCollapse} collapsed={collapsed} />
                {
                    (size === 'small' && !collapsed) &&
                    <div style={WrapperStyle} onClick={() => this.onCollapse(!this.collapsed)} />
                }
                <Layout style={FULL_HEIGHT}>
                    <HeaderLayout style={{ ...HeaderStyle, marginLeft: size === 'small' ? 0 : 240, width: size === 'small' ? '100%' : 'calc(100% - 240px)' }} />
                    <Layout.Content style={{ ...ContentStyle, marginLeft: size === 'small' ? 0 : 240 }}>
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

const WrapperStyle = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5
};

const ContentStyle = {
    height: 'calc(100% - 36px)',
    marginTop: '36px',
    transition: 'all 0.2s',
};

const HeaderStyle = {
    height: '36px',
    zIndex: 4,
    textAlign: 'right',
    backgroundColor: 'rgba(33,33,33,0.8)',
    position: 'fixed',
    padding: '2px',
    top: 0,
    left: 0,
    boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)'
};

export default DefaultLayout;