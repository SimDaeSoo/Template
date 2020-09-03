import React from 'react';
import { withRouter } from 'next/router'
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Layout, Menu, Tag, Tooltip } from 'antd';
import { FileTextOutlined, UserOutlined, MailOutlined, MessageFilled, LinkOutlined, SettingOutlined, FolderOutlined } from '@ant-design/icons';

const user = {
    id: 1,
    username: '심대수(빅딜)',
    email: 'tlaeotn123@naver.com',
    link: 'https://github.com/SimDaeSoo',
    message: '"Hello World?"'
}

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

                    <Menu.SubMenu key="sub1" icon={<FolderOutlined />} title="Navigation One">
                        <Menu.Item key="5">{i18n.t('new')} {i18n.t('page')}</Menu.Item>
                        <Menu.Item key="6">{i18n.t('new')} {i18n.t('page')}</Menu.Item>
                        <Menu.Item key="7">{i18n.t('new')} {i18n.t('page')}</Menu.Item>
                        <Menu.Item key="8">{i18n.t('new')} {i18n.t('page')}</Menu.Item>
                    </Menu.SubMenu>

                    {/* owner 일때 */}
                    <Menu.Item key="/settings" icon={<SettingOutlined />}>
                        {i18n.t('settings')}
                    </Menu.Item>
                </Menu>
                <div style={{ ...ProfileStyle, left: collapsed ? -240 : 0 }}>
                    <div style={ThumbnailWrapperStyle}>
                        <div style={ThumbnailStyle}>
                            <img src='https://lh3.googleusercontent.com/a-/AOh14GhgMFeQX8lS_L_UYkLGDljRBOl_YA3FJyJNU2i38Q' style={ThumbnailImageStyle} />
                        </div>
                    </div>
                    <div style={InfoStyle}>
                        <Tag icon={<UserOutlined />} style={InfoRowStyle}>{user.username}</Tag>
                        <Tag icon={<MailOutlined />} style={InfoRowStyle}>{user.email}</Tag>
                        <Tooltip title={user.link}>
                            <Tag icon={<LinkOutlined />} style={InfoRowStyle}>{user.link}</Tag>
                        </Tooltip>
                        <Tag color='blue' icon={<MessageFilled />} style={InfoRowStyle}>{user.message}</Tag>
                    </div>
                </div>
            </Layout.Sider >
        )
    }
}

const ProfileStyle = {
    position: 'absolute',
    top: 0,
    height: '328px',
    backgroundColor: '#181818',
    transition: '.2s all'
};

const ThumbnailWrapperStyle = {
    width: '240px',
    height: '236px',
    padding: '4px 4px 0px 4px'
};

const ThumbnailStyle = {
    position: 'relative',
    width: '232px',
    height: '232px',
    borderRadius: '4px',
    overflow: 'hidden'
};

const ThumbnailImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const InfoStyle = {
    width: '240px',
    height: '90px',
    padding: '1px 2px 2px 2px',
    overflow: 'hidden',
    display: 'inline-block'
};

const InfoRowStyle = {
    width: '100%',
    marginRight: 0,
    border: 'none',
    backgroundColor: 'inherit'
};

const SHADOW_STYLE = {
    boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)',
    paddingTop: '328px'
};

export default withRouter(withTranslation('SiderLayout')(SiderLayout));