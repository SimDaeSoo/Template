import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Tag, Avatar, Menu, Dropdown } from 'antd';
import { ExportOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

@inject('auth')
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
                    <Tag icon={<UserOutlined style={{ margin: 0 }} />} color='blue' style={{ margin: '2px' }}>{auth.user.username}</Tag>
                    <Tag color='geekblue' style={{ margin: '2px' }}>{auth.user.role.name}</Tag>
                </Menu.Item>
                <Menu.Item disabled={true}>
                    <Tag icon={<MailOutlined style={{ margin: 0 }} />} color='magenta' style={{ margin: '2px' }}>{auth.user.email}</Tag>
                </Menu.Item>
                <Menu.Item onClick={this.logout}>
                    <ExportOutlined />
                    {i18n.t('logout')}
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        const { auth, style } = this.props;

        return (
            <Dropdown overlay={this.menu}>
                <Avatar shape="square" src={auth.user.thumbnail} style={{ ...AvatarStyle, ...(style || {}) }} />
            </Dropdown>
        );
    }
}

const AvatarStyle = { verticalAlign: 'bottom', margin: '0 2px' };

export default withTranslation('MyProfile')(MyProfile);