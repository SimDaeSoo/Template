import React from 'react';
import Router from 'next/router';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Button, Select, Tag } from 'antd';
import { initialize } from '../utils';
import UserTest from '../components/UserTest';

@inject('environment', 'auth')
@observer
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    login() {
        Router.push('/connect/google');
    }

    logout() {
        const { auth } = this.props;
        auth.logout();
    }

    linkTo(url) {
        Router.push(url);
    }

    changeLanguage(language) {
        const { environment } = this.props;
        environment.set('language', language);
    }

    render() {
        const { environment, auth, i18n } = this.props;

        return (
            <div>
                <Button type='primary' onClick={() => { this.linkTo(`/new${environment.queryString}`) }}>
                    New Page
                    </Button>

                {
                    !auth.hasPermission &&
                    <Button type='primary' onClick={this.login.bind(this)}>
                        {i18n.t('login')}
                    </Button>
                }
                {
                    auth.hasPermission &&
                    <Button type='danger' onClick={this.logout.bind(this)}>
                        {i18n.t('logout')}
                    </Button>
                }

                <Select value={environment.language} onChange={this.changeLanguage.bind(this)}>
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
                <UserTest test={'test'}></UserTest>
            </div>
        );
    }
}

export async function getServerSideProps(context) {
    const initializeData = await initialize(context);
    return { props: { initializeData } };
}

export default withTranslation('Home')(Home);