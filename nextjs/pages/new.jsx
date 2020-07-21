import React from 'react';
import Router from 'next/router';
import { observer, inject } from 'mobx-react';
import { withTranslation } from "react-i18next";
import { Button, Select, Tag } from 'antd';
import AuthWrapper from '../wrapper/authWrapper';

@inject('environment', 'auth')
@observer
class New extends React.Component {
    constructor(props) {
        super(props);
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

                    <Button type='primary' onClick={() => { this.linkTo('/connect/google') }}>
                        {i18n.t('login')}
                    </Button>

                    <Select value={environment.language} onChange={this.changeLanguage.bind(this)}>
                        <Select.Option value="ko">Korean</Select.Option>
                        <Select.Option value="en">English</Select.Option>
                    </Select>
                    <Tag color='blue'>{auth.user.email}</Tag>
                    <Tag color='magenta'>{auth.user.username}</Tag>
                </div>
            </AuthWrapper>
        );
    }
}

export default withTranslation()(New);