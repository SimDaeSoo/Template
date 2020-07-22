import React from 'react';
import Router from 'next/router';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Button, Select, Tag } from 'antd';
import AuthWrapper from '../wrapper/AuthWrapper';

@inject('environment', 'auth')
@observer
class New extends React.Component {
    constructor(props) {
        super(props);
    }

    login() {
        Router.push('/connect/google');
    }

    logout() {
        const { auth } = this.props;
        auth.jwt = '';
        auth.user = {};
        sessionStorage.removeItem('jwt');
    }

    linkTo(url) {
        Router.push(url);
    }

    changeLanguage(language) {
        const { environment } = this.props;
        environment.setLanguage(language);
    }

    render() {
        const { environment, auth, i18n } = this.props;

        return (
            <AuthWrapper>
                <div>
                    <Button type='primary' onClick={() => { this.linkTo(`/${environment.queryString}`) }}>
                        Home Page
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
                </div>
            </AuthWrapper>
        );
    }
}

const _New = withTranslation('New')(New);
_New.getInitialProps = async (context) => {
    return { test: 'fetched data' };
}
export default _New;