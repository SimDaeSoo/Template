import Router from 'next/router';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Button, Select, Tag, Avatar, Menu, Dropdown } from 'antd';
import HydrateComponent from '../components/HydrateComponent';
import { getInitializeAuthData } from '../stores/Auth';

@inject('environment', 'auth')
@observer
class Home extends HydrateComponent {
    login = () => {
        Router.push('/connect/google');
    }

    logout = () => {
        const { auth } = this.props;
        auth.logout();
    }

    goToNew = () => {
        const { environment } = this.props;
        Router.push(`/new${environment.queryString}`);
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
                    <Tag color='blue' style={{ margin: 0 }}>{auth.user.username} {auth.user.email}</Tag>
                </Menu.Item>
                <Menu.Item onClick={this.logout} danger>
                    {i18n.t('logout')}
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        const { auth, i18n } = this.props;

        return (
            <div>
                <Button type='primary' onClick={this.goToNew}>
                    New Page
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
                    <Select.Option value="ko">Korean</Select.Option>
                    <Select.Option value="en">English</Select.Option>
                </Select>
            </div>
        );
    }
}

export async function getServerSideProps(context) {
    const auth = await getInitializeAuthData(context);

    return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('Home')(Home);