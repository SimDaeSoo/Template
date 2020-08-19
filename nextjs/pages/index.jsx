import React from 'react';
import Router from 'next/router';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Button, Select, Tag } from 'antd';
import { getInitializeAuthData } from '../stores/Auth';

@inject('environment', 'auth')
@observer
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

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
                    <Button type='danger' onClick={this.logout}>
                        {i18n.t('logout')}
                    </Button>
                }

                <Select value={i18n.language} onChange={this.changeLanguage}>
                    <Select.Option value="ko">Korean</Select.Option>
                    <Select.Option value="en">English</Select.Option>
                </Select>
                {
                    auth.hasPermission &&
                    <>
                        <Tag color='blue'>{auth.user.email}</Tag>
                        <Tag color='magenta'>{auth.user.username}</Tag>
                    </>
                }
            </div>
        );
    }
}

export async function getServerSideProps(context) {
    const auth = await getInitializeAuthData(context);

    return { props: { initializeData: { auth, environment: { query: context.query } } } };
}

export default withTranslation('Home')(Home);