import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Tag, Avatar, Menu, Dropdown, Button } from 'antd';
import { ExportOutlined, MailOutlined, UserOutlined, SettingOutlined, LinkOutlined, MessageFilled, LockOutlined, HomeOutlined } from '@ant-design/icons';

@inject('auth', 'environment')
@observer
class MyProfile extends React.Component {
    logout = () => {
        const { auth } = this.props;
        auth.logout();
    }

    get menu() {
        const { auth, i18n } = this.props;

        return (
            <Menu>
                <Menu.Item disabled={true}>
                    <Tag icon={<UserOutlined style={NoMarginStyle} />} style={TagStyle}>{auth.user.username}</Tag>
                    <Tag icon={<LockOutlined style={NoMarginStyle} />} style={TagStyle}>{auth.user.role.name}</Tag>
                </Menu.Item>
                <Menu.Item disabled={true}>
                    <Tag icon={<MailOutlined style={NoMarginStyle} />} style={TagStyle}>{auth.user.email}</Tag>
                </Menu.Item>
                <Menu.Item disabled={true}>
                    <Tag icon={<LinkOutlined style={NoMarginStyle} />} style={TagStyle}>{auth.user.link}</Tag>
                </Menu.Item>
                <Menu.Item disabled={true}>
                    <Tag icon={<MessageFilled style={NoMarginStyle} />} color='blue' style={TagStyle}>{auth.user.message}</Tag>
                </Menu.Item>
                <Menu.Item>
                    <HomeOutlined />
                    {i18n.t('my')} {i18n.t('home')} {i18n.t('page')}
                </Menu.Item>
                <Menu.Item>
                    <SettingOutlined />
                    {i18n.t('settings')}
                </Menu.Item>
                <Menu.Item onClick={this.logout}>
                    <ExportOutlined />
                    {i18n.t('logout')}
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        const { auth, environment, style, showName } = this.props;

        return (
            <>
                {
                    !showName &&
                    <Dropdown overlay={this.menu} trigger={environment.size === 'small' ? 'click' : 'hover'}>
                        <a>
                            <Avatar shape="square" src={auth.user.thumbnail} style={{ ...AvatarStyle, ...(style || {}) }} />
                        </a>
                    </Dropdown>
                }
                {
                    showName &&
                    <Dropdown overlay={this.menu} trigger={environment.size === 'small' ? 'click' : 'hover'}>
                        <Button icon={<UserOutlined style={{ marginRight: '4px' }} />} style={{ position: 'relative', verticalAlign: 'bottom', paddingLeft: '42px', marginRight: '2px', ...(style || {}) }}>
                            <Avatar shape="square" src={auth.user.thumbnail} style={{ ...AvatarStyle, position: 'absolute', left: '-3px', top: '-1px' }} />
                            {auth.user.username}
                        </Button>
                    </Dropdown>
                }
            </>
        );
    }
}

const TagStyle = {
    margin: '2px'
};

const NoMarginStyle = {
    margin: 0
};

const AvatarStyle = {
    verticalAlign: 'bottom',
    margin: '0 2px',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '4px',
    backgroundColor: 'rgba(0,0,0,0.3)'
};

export default withTranslation('MyProfile')(MyProfile);