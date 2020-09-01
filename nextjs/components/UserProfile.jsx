import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Tag, Avatar, Menu, Dropdown } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';

@inject('environment')
@observer
class UserProfile extends React.Component {
    get menu() {
        const { i18n, user } = this.props;

        return (
            <Menu>
                <Menu.Item disabled={true}>
                    <Tag icon={<UserOutlined style={NoMarginStyle} />} color='blue' style={TagStyle}>{user.username}</Tag>
                </Menu.Item>
                <Menu.Item disabled={true}>
                    <Tag icon={<MailOutlined style={NoMarginStyle} />} color='magenta' style={TagStyle}>{user.email}</Tag>
                </Menu.Item>
                <Menu.Item>
                    <UserOutlined />
                    {i18n.t('user')} {i18n.t('page')}
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        const { environment, user, style } = this.props;

        return (
            <Dropdown overlay={this.menu} trigger={environment.size === 'small' ? 'click' : 'hover'}>
                <Avatar shape="square" src={user.thumbnail} style={{ ...AvatarStyle, ...(style || {}) }} />
            </Dropdown>
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

export default withTranslation('UserProfile')(UserProfile);