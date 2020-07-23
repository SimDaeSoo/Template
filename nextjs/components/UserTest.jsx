import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Tag } from 'antd';
import { withTranslation } from "react-i18next";

@inject('auth')
@observer
class UserTest extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { auth, i18n, test } = this.props;

        return (
            <div>
                <Button type='primary'>
                    {i18n.t('login')}
                </Button>
                {
                    test &&
                    <div>{test}</div>
                }
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

export default withTranslation('UserTest')(UserTest);