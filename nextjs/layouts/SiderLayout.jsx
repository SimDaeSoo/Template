import React from 'react';
import { withRouter } from 'next/router'
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Layout, Menu } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

@inject('environment', 'auth')
@observer
class SiderLayout extends React.Component {
    get pathname() {
        const { router } = this.props;
        const { pathname } = router;
        return pathname;
    }

    linkTo = (path) => {
        const { router, environment } = this.props;
        router.push(`${path}${environment.queryString}`);
    }

    render() {
        const { i18n } = this.props;

        return (
            <Layout.Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => { }}
                onCollapse={(collapsed, type) => { }}
                style={SHADOW_STYLE}
                width='220px'
            >
                <Menu mode="inline" selectedKeys={[this.pathname]}>
                    <Menu.Item key="/" icon={<FileTextOutlined />} onClick={() => this.linkTo('/')}>
                        {i18n.t('home')} {i18n.t('page')}
                    </Menu.Item>
                    <Menu.Item key="/new" icon={<FileTextOutlined />} onClick={() => this.linkTo('/new')}>
                        {i18n.t('new')} {i18n.t('page')}
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        )
    }
}

const SHADOW_STYLE = {
    boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)'
};

export default withRouter(withTranslation('SiderLayout')(SiderLayout));