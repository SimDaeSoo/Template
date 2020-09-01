import React from 'react';
import { withRouter } from 'next/router'
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Layout, Menu, Tag, Tooltip } from 'antd';
import { FileTextOutlined, UserOutlined, MailOutlined, EnvironmentOutlined, MessageFilled, LinkOutlined } from '@ant-design/icons';

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
        const { i18n, onCollapse, collapsed } = this.props;

        return (
            <Layout.Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={onCollapse}
                collapsed={collapsed}
                style={SHADOW_STYLE}
                width='240px'
            >
                <div style={{ position: 'absolute', top: 0, height: '334px', backgroundColor: '#181818' }}>
                    <div style={{ width: '240px', height: '238px', padding: '2px 2px 0px 2px' }}>
                        <div style={{ position: 'relative', width: '236px', height: '236px', borderRadius: '4px', overflow: 'hidden' }}>
                            <img src='https://lh3.googleusercontent.com/a-/AOh14GhgMFeQX8lS_L_UYkLGDljRBOl_YA3FJyJNU2i38Q' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', width: '100%', bottom: 0, left: 0, padding: 2 }}>
                                <Tag color='blue' icon={<UserOutlined />} style={{ maxWidth: '100%', marginRight: 0 }}>심대수(빅딜)</Tag>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '240px', height: '94px', padding: '1px 2px 2px 2px', overflow: 'hidden', display: 'inline-block' }}>
                        <Tag icon={<EnvironmentOutlined />} style={{ width: '100%', marginRight: 0 }}>SmartStudy</Tag>
                        <Tag icon={<MailOutlined />} style={{ width: '100%', marginRight: 0 }}>tlaeotn123@gmail.com</Tag>
                        <Tooltip title={`https://github.com/SimDaeSoo`}>
                            <Tag icon={<LinkOutlined />} style={{ width: '100%', marginRight: 0 }}>https://github.com/SimDaeSoo</Tag>
                        </Tooltip>
                        <Tag icon={<MessageFilled />} style={{ width: '100%', marginRight: 0 }}>"Hello World?"</Tag>
                    </div>
                </div>

                <Menu mode="inline" selectedKeys={[this.pathname]}>
                    <Menu.Item key="/" icon={<FileTextOutlined />} onClick={() => this.linkTo('/')}>
                        {i18n.t('home')} {i18n.t('page')}
                    </Menu.Item>
                    <Menu.Item key="/new" icon={<FileTextOutlined />} onClick={() => this.linkTo('/new')}>
                        {i18n.t('new')} {i18n.t('page')}
                    </Menu.Item>
                    <Menu.Item key="/new2" icon={<FileTextOutlined />} onClick={() => this.linkTo('/new2')}>
                        {i18n.t('new')}2 {i18n.t('page')}
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        )
    }
}

const SHADOW_STYLE = {
    boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)',
    paddingTop: '334px'
};

export default withRouter(withTranslation('SiderLayout')(SiderLayout));