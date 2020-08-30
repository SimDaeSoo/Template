import React from 'react';
import { withTranslation } from "react-i18next";
import { Tag, Avatar, Menu, Dropdown } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';

class UserProfile extends React.Component {
    get menu() {
        const { user } = this.props;

        return (
            <Menu>
                <Menu.Item disabled={true}>
                    <Tag icon={<UserOutlined style={NoMarginStyle} />} color='blue' style={TagStyle}>{user.username}</Tag>
                </Menu.Item>
                <Menu.Item disabled={true}>
                    <Tag icon={<MailOutlined style={NoMarginStyle} />} color='magenta' style={TagStyle}>{user.email}</Tag>
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        const { user, style } = this.props;

        return (
            <Dropdown overlay={this.menu}>
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
    margin: '0 2px'
};

export default withTranslation('UserProfile')(UserProfile);