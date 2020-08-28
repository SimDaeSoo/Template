import React from 'react';
import Router from 'next/router';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Button, Select, Tag, Avatar, Menu, Dropdown } from 'antd';
import { ExportOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';

@inject('environment', 'auth')
@observer
class New extends HydrateComponent {

    login = () => {
        Router.push('/connect/google');
    }

    logout = () => {
        const { auth } = this.props;
        auth.logout();
    }

    goToHome = () => {
        const { environment } = this.props;
        Router.push(`/${environment.queryString}`);
    }

    changeLanguage = (language) => {
        const { environment } = this.props;
        environment.set('language', language);
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
        const { auth, i18n } = this.props;

        return (
            <div>
                <Button type='primary' onClick={this.goToHome}>
                    {i18n.t('home')} {i18n.t('page')}
                </Button>

                {
                    !auth.hasPermission &&
                    <Button type='primary' onClick={this.login}>
                        {i18n.t('login')}
                    </Button>
                }
                {
                    auth.hasPermission &&
                    <Dropdown overlay={this.menu}>
                        <a>
                            <Avatar src={auth.user.thumbnail} />
                        </a>
                    </Dropdown>
                }

                <Select value={i18n.language} onChange={this.changeLanguage}>
                    <Select.Option value="ko">{i18n.t('korean')}</Select.Option>
                    <Select.Option value="en">{i18n.t('english')}</Select.Option>
                </Select>
            </div>
        );
    }
}

export async function getServerSideProps(context) {
    const auth = await getInitializeAuthData(context, { routing: true });

    return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('New')(New);